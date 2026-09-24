# Data Sources

<script setup>
import { data } from './sources.data'
import SourcesTable from './SourcesTable.vue'
import SourceFacts from './SourceFacts.vue'
</script>

Montandon integrates data from {{ data.count }} authoritative sources covering natural hazard events, population impacts, operational disaster responses, and satellite-derived response products. Each source contributes different layers of information to the common data model.

The facts on this page — organization, type, license, contributed roles, collections — are generated at build time from the [Monty source manifest](https://ifrcgo.org/monty-stac-extension/sources.json), which is maintained in [`monty-stac-extension`](https://github.com/IFRCGo/monty-stac-extension) and is the single source of truth for what Montandon ingests. The descriptions are written here. To add or correct a source, [register it in the manifest](https://github.com/IFRCGo/monty-stac-extension/blob/main/CONTRIBUTING.md#ways-to-contribute) rather than editing this page.

## Overview

<SourcesTable />

---

## DesInventar {#desinventar}

[Desinventar](https://www.desinventar.net/) is a conceptual and methodological tool for generating national disaster databases, providing access to disaster effects information at various scales. It is maintained by the United Nations Office for Disaster Risk Reduction (UNDRR).

<SourceFacts id="desinventar" />

## EM-DAT {#em-dat}

EM-DAT is a global database on natural and technological disasters, containing essential core data on the occurrence and effects of more than 22,000 disasters worldwide from 1900 to present. The database is compiled from UN agencies, NGOs, insurance companies, research institutes, and press agencies. It is maintained by the Centre for Research on the Epidemiology of Disasters (CRED) at Université catholique de Louvain (UCLouvain), Belgium.

<SourceFacts id="emdat" />

## GDACS {#gdacs}

GDACS is a cooperation framework between the United Nations, the European Commission, and disaster managers worldwide to improve alerts, information exchange, and coordination in the first phase after major sudden-onset disasters.

<SourceFacts id="gdacs" />

## Global Flood Database (GFD) {#gfd}

The Global Flood Database (GFD) combines multiple years of satellite-based flood data to create the first comprehensive global resource for flood risk management and mitigation.

<SourceFacts id="gfd" />

## GLIDE {#glide}

GLIDE (GLobal IDEntifier Number) is a globally common unique ID code for disasters and emergencies. It provides a standard identifier assigned to each disaster event, enabling cross-database linkage across multiple information systems.

<SourceFacts id="glide" />

## IBTrACS {#ibtracs}

The International Best Track Archive for Climate Stewardship (IBTrACS) is a global database of tropical cyclone best track data, providing a centralized repository of position and intensity information from multiple meteorological agencies worldwide. It is maintained by the National Oceanic and Atmospheric Administration (NOAA).

<SourceFacts id="ibtracs" />

## IDMC — Global Internal Displacement Database (GIDD) {#idmc}

The Internal Displacement Monitoring Centre (IDMC) maintains the Global Internal Displacement Database (GIDD), which provides comprehensive information on global internal displacement events from 2008 onwards. Only disaster-related displacement events are included in Montandon.

<SourceFacts id="idmc-gidd" />

## IDMC — Internal Displacement Updates (IDU) {#idu}

The Internal Displacement Updates (IDU) dataset tracks the number of people internally displaced due to disaster or conflict. IDU provides more frequent, event-level displacement updates compared to IDMC's annual GIDD. Only disaster-type events are included in Montandon.

<SourceFacts id="idmc-idu" />

## IFRC DREF {#ifrc-dref}

The IFRC Disaster Relief Emergency Fund (DREF) provides immediate financial support to National Red Cross and Red Crescent Societies for early action and response to disasters and crises. DREF records capture the triggering event, its hazard classification, and the impact figures behind each activation globally.

<SourceFacts id="ifrcevent" />

## Pacific Disaster Center (PDC) {#pdc}

The Pacific Disaster Center (PDC) tracks a wide range of natural and human-made hazards — including tropical cyclones, earthquakes, floods, landslides, wildfires, drought, and volcanic eruptions — to support disaster preparedness, response, and risk reduction efforts.

<SourceFacts id="pdc" />

## USGS Earthquake Catalog {#usgs}

The United States Geological Survey (USGS) Earthquake Hazards Program provides comprehensive earthquake data through a public API, offering real-time and historical earthquake information globally with the most complete coverage for the United States.

<SourceFacts id="usgs" />

## International Charter on Space and Major Disasters {#disaster-charter}

The International Charter on Space and Major Disasters is a voluntary cooperation mechanism among space agencies — including ESA, JAXA, NASA and others — that mobilises satellite Earth observation assets in response to major disasters. When the Charter is activated by an authorised user, member agencies acquire and deliver satellite imagery and derived products (delineation maps, damage assessments) to support emergency response operations. Montandon ingests Charter Calls and Activations as events, derived satellite acquisitions as hazard records, and Value Added Products as response records.

<SourceFacts id="charter" />

## Copernicus Emergency Management Service — Rapid Mapping {#copernicus-ems}

The Copernicus Emergency Management Service (CEMS) Rapid Mapping component provides satellite-derived maps and analyses for emergency response within hours to days of a disaster trigger. Products include reference maps, delineation maps (flood extent, burn area), and grading maps (building damage). Each activation yields the triggering event, the delineated hazard footprint, the damage recorded in the grading products, and the mapping activity itself as a response record — making CEMS one of the few sources that contributes across all four Monty roles.

<SourceFacts id="cems" />
