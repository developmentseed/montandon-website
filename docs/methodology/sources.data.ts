// Build-time data loader for the Data Sources page.
//
// The source list is authoritative in IFRCGo/monty-stac-extension, which
// generates `sources.json` from `docs/model/sources/sources.yml` and fails its
// own CI if the manifest drifts from the docs nav or the shipped example
// collections. This site consumes that published artifact instead of keeping a
// parallel hand-maintained list.
//
// The fetch happens at build time only: no client-side request, no CORS
// surface, no runtime dependency on ifrcgo.org.
//
// See: https://github.com/developmentseed/montandon-website/issues/18

const MANIFEST_URL = "https://ifrcgo.org/monty-stac-extension/sources.json";

/**
 * Manifest id -> anchor of this page's hand-written prose section, in the order
 * the sections appear below the Overview table.
 *
 * Six ids do not match the heading they belong to (`emdat` -> `#em-dat`,
 * `ifrcevent` -> `#ifrc-dref`, ...), and the headings are load-bearing: they are
 * the anchors external links already point at. So the mapping is owned here
 * rather than derived, and an unmapped id fails the build (see `load`) so a
 * newly published source cannot silently render a dead link.
 *
 * Declaration order is the display order of the Overview table.
 */
const ANCHORS: Record<string, string> = {
  desinventar: "desinventar",
  emdat: "em-dat",
  gdacs: "gdacs",
  gfd: "gfd",
  glide: "glide",
  ibtracs: "ibtracs",
  "idmc-gidd": "idmc",
  "idmc-idu": "idu",
  ifrcevent: "ifrc-dref",
  pdc: "pdc",
  usgs: "usgs",
  charter: "disaster-charter",
  cems: "copernicus-ems",
};

/**
 * Integration state -> badge. `production` is the default and carries no badge;
 * anything else says plainly how far along the source is.
 */
const BADGES: Record<string, string | null> = {
  production: null, // orchestrated in IFRCGo/montandon-etl
  etl: "Integration in progress", // transformer exists in pystac-monty
  templates: "Planned", // mapping specified only
  analysis: "Planned", // researched only
};

/** A record as published in sources.json. */
interface ManifestSource {
  id: string;
  name: string;
  org: string | null;
  org_type: string | null;
  url: string | null;
  contact: string | null;
  license: string | null;
  status: string;
  types: string[];
  collections: string[];
  doc: string | null;
  etl: string | null;
}

/** A link, or plain text when there is nothing to link to. */
export interface Fact {
  text: string;
  href?: string;
}

export interface Source {
  id: string;
  name: string;
  /** Anchor of this source's prose section on the Data Sources page. */
  anchor: string;
  org: string;
  /**
   * Closed vocabulary, display-ready upstream ("International Organization",
   * "Academic / Research", ...) — printed verbatim, never remapped here.
   */
  orgType: string;
  url: string | null;
  /** Monty roles this source feeds, e.g. "event, hazard, impact". */
  contributes: string;
  types: string[];
  collections: string[];
  /**
   * `null` is a positive statement, verified upstream in 2026-07: the source
   * publishes no identifiable reuse license. It is not "unknown".
   */
  license: Fact;
  contact: Fact | null;
  doc: string | null;
  etl: string | null;
  status: string;
  badge: string | null;
}

export interface SourcesData {
  sources: Source[];
  /** Number of documented sources — the count quoted in the page intro. */
  count: number;
}

const isUrl = (value: string) => /^https?:\/\//.test(value);

/** Fetch the manifest, retrying transient failures a couple of times. */
async function fetchManifest(): Promise<ManifestSource[]> {
  const attempts = 3;
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await fetch(MANIFEST_URL);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }
      const body = (await response.json()) as { sources?: ManifestSource[] };
      if (!Array.isArray(body.sources)) {
        throw new Error("no `sources` array in the response");
      }
      return body.sources;
    } catch (error) {
      lastError = error;
      if (attempt < attempts) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 2000));
      }
    }
  }

  // Deliberately fatal: there is no committed fallback copy of the manifest,
  // because a stale copy would silently re-introduce the drift this loader
  // exists to remove. A failed build leaves the last deploy serving, and is
  // re-runnable from the Actions tab.
  throw new Error(
    `Could not fetch the Monty source manifest from ${MANIFEST_URL} ` +
      `after ${attempts} attempts: ${lastError}`,
  );
}

/** Shape one manifest record for rendering, failing loudly on anything unmapped. */
function toSource(raw: ManifestSource): Source {
  const anchor = ANCHORS[raw.id];
  if (!anchor) {
    throw new Error(
      `Source "${raw.id}" is published in ${MANIFEST_URL} but has no prose ` +
        `section on the Data Sources page. Add a "## ..." section to ` +
        `docs/methodology/data-sources.md and map "${raw.id}" to its anchor ` +
        `in ANCHORS (docs/methodology/sources.data.ts).`,
    );
  }

  if (!(raw.status in BADGES)) {
    throw new Error(
      `Source "${raw.id}" has unrecognised status "${raw.status}". Add it to ` +
        `BADGES in docs/methodology/sources.data.ts.`,
    );
  }

  const license: Fact = raw.license
    ? isUrl(raw.license)
      ? { text: "Terms of use", href: raw.license }
      : { text: raw.license }
    : { text: "Not stated by the source" };

  // An email address for most sources; IFRC DREF publishes only a contact form.
  const contact: Fact | null = raw.contact
    ? isUrl(raw.contact)
      ? { text: "Contact form", href: raw.contact }
      : { text: raw.contact, href: `mailto:${raw.contact}` }
    : null;

  return {
    id: raw.id,
    name: raw.name,
    anchor,
    org: raw.org ?? "",
    orgType: raw.org_type ?? "",
    url: raw.url,
    contributes: raw.types.join(", "),
    types: raw.types,
    collections: raw.collections,
    license,
    contact,
    doc: raw.doc,
    etl: raw.etl,
    status: raw.status,
    badge: BADGES[raw.status],
  };
}

// Populated by VitePress from `load()` below; typed here for consumers.
export declare const data: SourcesData;

export default {
  async load(): Promise<SourcesData> {
    const manifest = await fetchManifest();

    // `undocumented` = has example collections but no source analysis yet.
    // Internal bookkeeping upstream; not something to put on a public page.
    const documented = manifest.filter((s) => s.status !== "undocumented");

    const sources = documented.map(toSource);

    // The reverse check: a prose section whose source is gone from the manifest
    // would sit on the page describing something Montandon no longer ingests.
    const published = new Set(sources.map((s) => s.id));
    const orphaned = Object.keys(ANCHORS).filter((id) => !published.has(id));
    if (orphaned.length > 0) {
      throw new Error(
        `${orphaned.join(", ")} ${orphaned.length === 1 ? "is" : "are"} mapped ` +
          `in ANCHORS (docs/methodology/sources.data.ts) but no longer ` +
          `documented in ${MANIFEST_URL}. Remove the mapping and the matching ` +
          `prose section from docs/methodology/data-sources.md.`,
      );
    }

    // Declaration order of ANCHORS, so the table reads as a table of contents
    // for the sections below it.
    const order = Object.keys(ANCHORS);
    sources.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));

    return { sources, count: sources.length };
  },
};
