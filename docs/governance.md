# Governance

[IFRC](https://www.ifrc.org/) is the founding sponsor; [Development Seed](https://developmentseed.org/) and [ToggleCorp](https://togglecorp.com/) are implementing partners. Learn more about them and our other partners on the [Partners](/partners) page.

## Program Steering Committee

A Program Steering Committee (PSC) will be established to provide governance and strategic oversight for the Montandon project. Details about the PSC structure, and membership will be shared here once finalized.

## How the data model and source list are governed

Montandon's schema, data model and the list of sources it ingests are developed in the open in [`monty-stac-extension`](https://github.com/IFRCGo/monty-stac-extension). Changes are raised as issues, reviewed by a maintainer before merge, and held to the repository's [contributing guide](https://github.com/IFRCGo/monty-stac-extension/blob/main/CONTRIBUTING.md) and [code of conduct](https://github.com/IFRCGo/monty-stac-extension/blob/main/CODE_OF_CONDUCT.md).

Admitting a source is a documented process rather than an editorial decision: it follows the [source analysis methodology](https://ifrcgo.org/monty-stac-extension/model/sources/METHODOLOGY/), and every mapping claim has to be grounded in a committed fixture. The resulting [source manifest](https://ifrcgo.org/monty-stac-extension/sources.json) is what the [Data Sources](/methodology/data-sources) page on this site is generated from, so what is published here and what the specification says cannot drift apart. See [Get Involved](/get-involved) to propose a source or a model change.
