#!/usr/bin/env node
// Queries production Montandon's stats API for overall totals and per-source
// counts by item type plus earliest/latest record, and regenerates
// docs/methodology/data-coverage.md + a JSON sidecar.

import { readFile, writeFile } from "node:fs/promises";

// The JSON sidecar is kept outside docs/ (the VitePress content root) so it
// isn't built/served as a page. It holds the last good API responses and is
// the fallback when the API is unreachable.
const JSON_PATH = new URL("./data-coverage-state.json", import.meta.url);
const MD_PATH = new URL("../docs/methodology/data-coverage.md", import.meta.url);

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

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function fetchState() {
  const [stats, sources] = await Promise.all([
    fetchJson(STATS_URL),
    fetchJson(`${STATS_URL}/sources`),
  ]);
  // Throwing here sends main() to the stale-data fallback instead of
  // overwriting the page with an empty or malformed table.
  if (!Array.isArray(sources) || sources.length === 0) {
    throw new Error("Unexpected /stats/sources response: expected a non-empty array");
  }
  return { stats, sources };
}

// Just the date portion — the table doesn't need sub-day precision, and
// truncating avoids relying on Date parsing for edge cases like year 0001.
function dateOnly(isoDatetime) {
  return isoDatetime ? isoDatetime.split("T")[0] : "—";
}

const fmt = (n) => (n != null ? n.toLocaleString("en-US") : "—");

// VitePress heading anchors: lowercase, spaces -> hyphens.
const slug = (name) => name.toLowerCase().replace(/\s+/g, "-");

function renderMarkdown({ stats, sources }) {
  const rows = sources
    .toSorted((a, b) => a.source.localeCompare(b.source))
    .map((s) => {
      const name = SOURCE_NAMES[s.source] ?? s.source.toUpperCase();
      // Anchors match the headings in data-sources.md (e.g. "## EM-DAT" -> #em-dat).
      const link = `[${name}](./data-sources.md#${slug(name)})`;
      return `| ${link} | ${fmt(s.events)} | ${fmt(s.hazards)} | ${fmt(s.impacts)} | ${fmt(s.response)} | ${dateOnly(s.earliest)} | ${dateOnly(s.latest)} |`;
    });

  const summary = `Montandon currently holds ${fmt(stats.total_events)} [events](${SPEC_URL}#event), ${fmt(stats.total_hazard_items)} [hazard](${SPEC_URL}#hazard) items, ${fmt(stats.total_impact_items)} [impact](${SPEC_URL}#impact) items and ${fmt(stats.total_response_items)} [response](${SPEC_URL}#response) items across ${fmt(stats.total_collections)} collections.`;

  // generated_at is the API's own cache timestamp, so "data as of" stays honest
  // even if the API itself has stopped refreshing.
  // Negated "<=" so a missing or invalid timestamp (NaN) counts as stale.
  const isStale = !(Date.now() - new Date(stats.generated_at) <= STALE_AFTER_MS);
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
_Data as of ${dateOnly(stats.generated_at)}._
`;
}

async function main() {
  let state;
  try {
    state = await fetchState();
  } catch (err) {
    console.warn(`Failed to fetch stats, using last saved data: ${err.message}`);
    state = JSON.parse(await readFile(JSON_PATH, "utf-8"));
  }

  await writeFile(JSON_PATH, JSON.stringify(state, null, 2) + "\n");
  await writeFile(MD_PATH, renderMarkdown(state));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
