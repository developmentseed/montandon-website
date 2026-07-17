# Problem

When disasters strike, humanitarian analysts scramble to create clarity from chaos. They need to understand the scale of the disaster, its impact on people and infrastructure, and how to respond effectively.

However, disaster data is often scattered across multiple sources, inconsistent in format, and difficult to access quickly.

# What is Montandon?

Montandon is the world’s largest disaster database. It brings an ever-growing collection of authoritative disaster [data sources](/methodology/data-sources) into a single, unified platform. It is designed to help analysts and decision-makers quickly access the information they need to respond to disasters effectively.

Using [open standards](https://stacspec.org/en) and a flexible-but-powerful [taxonomy](https://github.com/IFRCGo/monty-stac-extension), Montandon ensures that disaster data is interoperable, easily searchable, and ready for analysis.

## The Hypotheses

1. Data is more valuable when it is easily discoverable and accessible.
2. Data is more valuable when it is interoperable.
3. Data is more valuable when it is timely.
4. Data is more valuable when it is stored in modern formats.
5. Users can create better analyses and make better decisions when the conditions above are met.

## How it works

1. Authoritative datasets are identified and prioritized by the humanitarian community.
2. We work with these data providers to ensure that their datasets are accessible, interoperable, and up-to-date.
3. Data variables are mapped to the Montandon taxonomy.
4. We ingest these datasets into Montandon using the public mapped taxonomy and our developed [ETL pipelines](https://github.com/IFRCGo/montandon-etl).
5. Data is stored following the [STAC specification](https://stacspec.org/) and is made accessible via a single API.

## What Montandon Is Not

Montandon isn't a data provider. It doesn't create new data or replace existing datasets. Instead, it aggregates and standardizes data from authoritative sources to make it more useful for humanitarian analysis.

Montandon also isn't a replacement for existing disaster response tools. It is designed to complement these tools by providing a centralized, standardized source of disaster data that can be easily integrated into existing workflows.

Finally, Montandon isn't a repository of assets. Data is mapped into our taxonomy and stored in a way that makes it easy to access and analyze. We discard and do not serve assets such as .pdf or .csv files.
