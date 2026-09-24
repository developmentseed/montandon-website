#!/usr/bin/env node
// Queries production Montandon's stats API for per-source item counts and
// earliest/latest record, and regenerates docs/methodology/data-coverage.md
// + a JSON sidecar.

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

// Display names for known sources; unmapped ids fall back to an uppercased id.
const SOURCE_NAMES = {
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

async function fetchSources() {
  const rows = await fetchJson(`${STATS_URL}/sources`);
  const sources = {};
  for (const row of rows) {
    sources[row.source] = {
      earliest: row.earliest,
      latest: row.latest,
      totalItems: row.total_items,
      stale: false,
    };
  }
  return sources;
}

async function loadPrevious() {
  try {
    return JSON.parse(await readFile(JSON_PATH, "utf-8"));
  } catch {
    return { sources: {} };
  }
}

// Just the date portion — the table doesn't need sub-day precision, and
// truncating avoids relying on Date parsing for edge cases like year 0001.
function dateOnly(isoDatetime) {
  return isoDatetime ? isoDatetime.split("T")[0] : "—";
}

function renderMarkdown(sources) {
  const rows = Object.entries(sources)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([id, s]) => {
      const name = SOURCE_NAMES[id] ?? id.toUpperCase();
      // Anchors match the headings in data-sources.md (e.g. "## EM-DAT" -> #em-dat).
      const link = `[${name}](./data-sources.md#${name.toLowerCase()})`;
      const staleNote = s.stale ? " *(stale — last successful check)*" : "";
      const items = s.totalItems != null ? s.totalItems.toLocaleString() : "—";
      return `| ${link} | ${items} | ${dateOnly(s.earliest)} | ${dateOnly(s.latest)}${staleNote} |`;
    });

  return `# Data Coverage

Item counts and earliest/latest record currently available per data source in
production Montandon, refreshed daily.

| Source | Items | Earliest | Latest |
|--------|-------|----------|--------|
${rows.join("\n")}

> **Note on DesInventar:** its date range above includes known bad upstream
> dates (e.g. a record dated \`0001-01-01\` and one dated \`2310-09-23\`) —
> published as-is, not filtered out here. Tracked in
> [IFRCGo/montandon-etl#453](https://github.com/IFRCGo/montandon-etl/issues/453).

_Generated ${dateOnly(new Date().toISOString())}._
`;
}

async function main() {
  const previous = await loadPrevious();

  let sources;
  try {
    sources = await fetchSources();
  } catch (err) {
    console.warn(
      `Failed to fetch /stats/sources after retries: ${err instanceof Error ? err.message : String(err)}`,
    );
    sources = Object.fromEntries(
      Object.entries(previous.sources ?? {}).map(([id, prev]) => [id, { ...prev, stale: true }]),
    );
  }

  const output = { generatedAt: new Date().toISOString(), sources };
  await writeFile(JSON_PATH, JSON.stringify(output, null, 2) + "\n");
  await writeFile(MD_PATH, renderMarkdown(sources));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
