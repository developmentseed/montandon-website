#!/usr/bin/env node
// Queries production Montandon's stats API for overall totals and per-source
// counts by item type plus earliest/latest record, and regenerates
// docs/methodology/data-coverage.md + a JSON sidecar.

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, "..");
// Kept outside docs/ (the VitePress content root) so it isn't built/served as
// a page and doesn't collide with data-coverage.md on extensionless routing.
const JSON_PATH = path.join(REPO_ROOT, "scripts", "data-coverage-state.json");
const MD_PATH = path.join(REPO_ROOT, "docs", "methodology", "data-coverage.md");

// Not sensitive, no auth required — hardcoded default like the STAC URL was.
const STATS_URL = process.env.MONTANDON_STATS_URL ?? "https://montandon-eoapi.ifrc.org/stats";

// Where events, hazards, impacts and responses are defined.
const SPEC_URL = "https://github.com/IFRCGo/monty-stac-extension";

// Data older than this is flagged on the page (API refreshes nightly).
const STALE_AFTER_MS = 36 * 60 * 60 * 1000;

// Display names for known sources; unmapped ids fall back to an uppercased id.
const SOURCE_NAMES = {
  cems: "Copernicus EMS",
  desinventar: "DesInventar",
  emdat: "EM-DAT",
  gdacs: "GDACS",
  gfd: "GFD",
  glide: "GLIDE",
  ibtracs: "IBTrACS",
  "idmc-gidd": "IDMC",
  "idmc-idu": "IDU",
  ifrcevent: "IFRC-DREF",
  pdc: "PDC",
  usgs: "USGS",
};

async function fetchJson(url, retries = 3, backoffMs = 1500) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      if (attempt === retries) throw err;
      await new Promise((r) => setTimeout(r, backoffMs * attempt));
    }
  }
}

async function fetchSnapshot() {
  const [totals, rows] = await Promise.all([
    fetchJson(`${STATS_URL}`),
    fetchJson(`${STATS_URL}/sources`),
  ]);
  // Throwing here sends main() to the stale-data fallback instead of
  // overwriting the page with an empty or malformed table.
  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error("Unexpected /stats/sources response: expected a non-empty array");
  }
  const sources = {};
  for (const row of rows) {
    sources[row.source] = {
      events: row.events,
      hazards: row.hazards,
      impacts: row.impacts,
      response: row.response,
      earliest: row.earliest,
      latest: row.latest,
    };
  }
  return {
    // The API's own cache timestamp, so "data as of" is honest even if the
    // API itself has stopped refreshing.
    generatedAt: totals.generated_at,
    totals: {
      collections: totals.total_collections,
      events: totals.total_events,
      hazards: totals.total_hazard_items,
      impacts: totals.total_impact_items,
      response: totals.total_response_items,
    },
    sources,
  };
}

async function loadPrevious() {
  try {
    return JSON.parse(await readFile(JSON_PATH, "utf-8"));
  } catch {
    return null;
  }
}

// Just the date portion — the table doesn't need sub-day precision, and
// truncating avoids relying on Date parsing for edge cases like year 0001.
function dateOnly(isoDatetime) {
  return isoDatetime ? isoDatetime.split("T")[0] : "—";
}

const fmt = (n) => (n != null ? n.toLocaleString("en-US") : "—");

// VitePress heading anchors: lowercase, spaces -> hyphens.
const slug = (name) => name.toLowerCase().replace(/\s+/g, "-");

function renderMarkdown({ generatedAt, totals, sources }) {
  const rows = Object.entries(sources)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([id, s]) => {
      const name = SOURCE_NAMES[id] ?? id.toUpperCase();
      // Anchors match the headings in data-sources.md (e.g. "## EM-DAT" -> #em-dat).
      const link = `[${name}](./data-sources.md#${slug(name)})`;
      return `| ${link} | ${fmt(s.events)} | ${fmt(s.hazards)} | ${fmt(s.impacts)} | ${fmt(s.response)} | ${dateOnly(s.earliest)} | ${dateOnly(s.latest)} |`;
    });

  const summary = `Montandon currently holds ${fmt(totals.events)} [events](${SPEC_URL}#event), ${fmt(totals.hazards)} [hazard](${SPEC_URL}#hazard) items, ${fmt(totals.impacts)} [impact](${SPEC_URL}#impact) items and ${fmt(totals.response)} [response](${SPEC_URL}#response) items across ${fmt(totals.collections)} collections.`;

  const isStale = Date.now() - new Date(generatedAt).getTime() > STALE_AFTER_MS;
  const staleNote = isStale
    ? "\n> **Note:** this data is more than a day and a half old; a recent refresh may have failed.\n"
    : "";

  return `# Data Coverage

${summary}

Below are the items of each type per data source, with the earliest and latest record available.

| Source | Events | Hazards | Impacts | Response | Earliest | Latest |
|--------|--------|---------|---------|----------|----------|--------|
${rows.join("\n")}

> **Note on DesInventar:** the date range above includes known incorrect dates
> in the upstream data source. This issue is tracked in
> [IFRCGo/montandon-etl#453](https://github.com/IFRCGo/montandon-etl/issues/453).
${staleNote}
_Data as of ${dateOnly(generatedAt)}._
`;
}

async function main() {
  let snapshot;
  try {
    snapshot = await fetchSnapshot();
  } catch (err) {
    console.warn(
      `Failed to fetch stats after retries: ${err instanceof Error ? err.message : String(err)}`,
    );
    snapshot = await loadPrevious();
    if (!snapshot) throw new Error("No previous coverage state to fall back to");
  }

  await writeFile(JSON_PATH, JSON.stringify(snapshot, null, 2) + "\n");
  await writeFile(MD_PATH, renderMarkdown(snapshot));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
