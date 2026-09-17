#!/usr/bin/env node
// Queries production Montandon for the earliest/latest record per data source
// and regenerates docs/methodology/data-coverage.md + a JSON sidecar.
//
// Requires MONTANDON_TOKEN and MONTANDON_BASE_URL in the environment.

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, "..");
// Kept outside docs/ (the VitePress content root) so it isn't built/served as
// a page and doesn't collide with data-coverage.md on extensionless routing.
const JSON_PATH = path.join(REPO_ROOT, "scripts", "data-coverage-state.json");
const MD_PATH = path.join(REPO_ROOT, "docs", "methodology", "data-coverage.md");

const BASE_URL = process.env.MONTANDON_BASE_URL;
const TOKEN = process.env.MONTANDON_TOKEN;

if (!BASE_URL || !TOKEN) {
  console.error("MONTANDON_BASE_URL and MONTANDON_TOKEN must be set.");
  process.exit(1);
}

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

const COLLECTION_SUFFIX = /-(events|hazards|impacts)$/;

async function fetchJson(url, options, retries = 3, backoffMs = 1500) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        ...options,
        headers: { Authorization: `Bearer ${TOKEN}`, ...options?.headers },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      if (attempt === retries) throw err;
      await new Promise((r) => setTimeout(r, backoffMs * attempt));
    }
  }
}

async function listCollections() {
  const data = await fetchJson(`${BASE_URL}/collections?limit=200`);
  return data.collections.map((c) => c.id);
}

async function probeDatetime(collectionId, direction) {
  const body = {
    collections: [collectionId],
    limit: 1,
    sortby: [{ field: "properties.datetime", direction }],
  };
  const data = await fetchJson(`${BASE_URL}/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return data.features?.[0]?.properties?.datetime ?? null;
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
      return `| ${link} | ${dateOnly(s.earliest)} | ${dateOnly(s.latest)}${staleNote} |`;
    });

  return `# Data Coverage

Earliest and latest record currently available per data source in
production Montandon, refreshed daily.

| Source | Earliest | Latest |
|--------|----------|--------|
${rows.join("\n")}

> **Note on DesInventar:** its date range above includes known bad upstream
> dates (e.g. a record dated \`0001-01-01\` and one dated \`2310-09-23\`) —
> published as-is, not filtered out here. Tracked in
> [IFRCGo/montandon-etl#453](https://github.com/IFRCGo/montandon-etl/issues/453).

_Generated ${new Date().toISOString()}._
`;
}

async function main() {
  const previous = await loadPrevious();
  const collectionIds = await listCollections();

  const sources = {};
  for (const collectionId of collectionIds) {
    const sourceId = collectionId.replace(COLLECTION_SUFFIX, "");
    sources[sourceId] ??= { earliest: null, latest: null, stale: false };

    try {
      const [earliest, latest] = await Promise.all([
        probeDatetime(collectionId, "asc"),
        probeDatetime(collectionId, "desc"),
      ]);
      if (earliest && (!sources[sourceId].earliest || earliest < sources[sourceId].earliest)) {
        sources[sourceId].earliest = earliest;
      }
      if (latest && (!sources[sourceId].latest || latest > sources[sourceId].latest)) {
        sources[sourceId].latest = latest;
      }
    } catch (err) {
      console.warn(`Failed to probe ${collectionId} after retries: ${err.message}`);
    }
  }

  // Fall back to the previous run's value for any source we got nothing for.
  for (const [sourceId, prev] of Object.entries(previous.sources ?? {})) {
    const current = sources[sourceId];
    if (current && current.earliest === null && current.latest === null) {
      sources[sourceId] = { ...prev, stale: true };
    }
  }

  const output = { generatedAt: new Date().toISOString(), sources };
  await writeFile(JSON_PATH, JSON.stringify(output, null, 2) + "\n");
  await writeFile(MD_PATH, renderMarkdown(sources));
}

main();
