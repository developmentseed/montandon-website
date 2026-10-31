# Get Involved

Montandon is an open-source project, and we welcome contributions from the community, whether you're a humanitarian, data scientist, developer, or just someone interested in disaster data.

Here are some ways you can get involved:

## Join the Montandon Working Group

...

## Add or correct a data source

The sources Montandon ingests — and the organization, license, contact and contributed roles shown on the [Data Sources](/methodology/data-sources) page — are maintained in the [`monty-stac-extension`](https://github.com/IFRCGo/monty-stac-extension) repository, not on this site. That repository generates the [source manifest](https://ifrcgo.org/monty-stac-extension/sources.json) this site reads, and its CI fails if the manifest drifts from the documented sources.

To propose a source, open a [**New source** issue](https://github.com/IFRCGo/monty-stac-extension/issues/new/choose). To document one yourself, follow the [contributing guide](https://github.com/IFRCGo/monty-stac-extension/blob/main/CONTRIBUTING.md#ways-to-contribute) — it walks through the [five-stage source analysis methodology](https://ifrcgo.org/monty-stac-extension/model/sources/METHODOLOGY/), the [source template](https://ifrcgo.org/monty-stac-extension/model/sources/SOURCE_TEMPLATE/) every source document follows, and registering the source in the manifest.

## Contribute to the code

- [`monty-stac-extension`](https://github.com/IFRCGo/monty-stac-extension) — the STAC extension, the [Monty data model](https://ifrcgo.org/monty-stac-extension/model/), and the [source analyses](https://ifrcgo.org/monty-stac-extension/model/sources/).
- [`pystac-monty`](https://github.com/IFRCGo/pystac-monty) — the Python library that transforms each source into Monty STAC items.
- [`montandon-etl`](https://github.com/IFRCGo/montandon-etl) — the pipeline that runs those transformers in production.

All contributions are subject to the project's [code of conduct](https://github.com/IFRCGo/monty-stac-extension/blob/main/CODE_OF_CONDUCT.md).
