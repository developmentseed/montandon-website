# Data Coverage

Item counts and earliest/latest record currently available per data source in
production Montandon, refreshed daily.

| Source | Items | Earliest | Latest |
|--------|-------|----------|--------|
| [DesInventar](./data-sources.md#desinventar) | 1,151,274 | 0001-01-01 | 2310-09-23 |
| [EM-DAT](./data-sources.md#em-dat) | 103,458 | 1950-01-01 | 2026-09-07 |
| [GDACS](./data-sources.md#gdacs) | 576,558 | 1900-01-01 | 2026-09-26 |
| [GFD](./data-sources.md#gfd) | 3,652 | 2000-02-17 | 2018-12-05 |
| [GLIDE](./data-sources.md#glide) | 12,112 | 1956-07-16 | 2026-09-21 |
| [IBTrACS](./data-sources.md#ibtracs) | 740,479 | 1842-10-25 | 2026-09-17 |
| [IDMC](./data-sources.md#idmc) | 48,760 | 2011-03-11 | 2025-12-31 |
| [IDU](./data-sources.md#idu) | 64,047 | 2011-01-01 | 2026-09-21 |
| [IFRC-DREF](./data-sources.md#ifrc-dref) | 3,882 | 1950-01-01 | 2026-08-26 |
| [PDC](./data-sources.md#pdc) | 10,892,686 | 2015-01-29 | 2026-09-25 |
| [USGS](./data-sources.md#usgs) | 7,894,928 | 1990-01-01 | 2026-09-14 |

> **Note on DesInventar:** its date range above includes known bad upstream
> dates (e.g. a record dated `0001-01-01` and one dated `2310-09-23`) —
> published as-is, not filtered out here. Tracked in
> [IFRCGo/montandon-etl#453](https://github.com/IFRCGo/montandon-etl/issues/453).

_Generated 2026-09-24._
