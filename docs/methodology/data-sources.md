# Data Sources

Montandon integrates data from 11 authoritative sources covering natural hazard events, population impacts, and operational disaster responses. Each source contributes different layers of information to the common data model.

## Overview

| Source | Organization | Type | Contributes |
|--------|-------------|------|-------------|
| [DesInventar](#desinventar) | UN Office for Disaster Risk Reduction | International Organization | event, impact |
| [EM-DAT](#em-dat) | Centre for Research on the Epidemiology of Disasters (CRED) | Academic / Research | event, hazard, impact |
| [GDACS](#gdacs) | European Commission – Joint Research Centre | Regional Intergovernmental | event, hazard |
| [GFD](#gfd) | Cloud to Street / Floodbase | Private | event, hazard, impact |
| [GLIDE](#glide) | Asian Disaster Reduction Center | Regional Intergovernmental | event, hazard |
| [IBTrACS](#ibtracs) | NOAA | National Government | event, hazard |
| [IDMC](#idmc) | Internal Displacement Monitoring Centre | International NGO | event |
| [IDU](#idu) | Internal Displacement Monitoring Centre | International NGO | event |
| [IFRC-DREF](#ifrc-dref) | International Federation of Red Cross and Red Crescent Societies | International Organization | event, impact |
| [PDC](#pdc) | Pacific Disaster Center | International Organization | event, hazard, impact |
| [USGS](#usgs) | United States Geological Survey | National Government | event, hazard |

---

## DesInventar

[Desinventar](https://www.desinventar.net/) is a conceptual and methodological tool for generating national disaster databases, providing access to disaster effects information at various scales. It is maintained by the United Nations Office for Disaster Risk Reduction (UNDRR).

- **Organization:** UN Office for Disaster Risk Reduction (UNDRR)
- **Contributes:** event, impact
- **Source URL:** <https://www.desinventar.net>
- **Contact:** <desinventar@un.org>

## EM-DAT

EM-DAT is a global database on natural and technological disasters, containing essential core data on the occurrence and effects of more than 22,000 disasters worldwide from 1900 to present. The database is compiled from UN agencies, NGOs, insurance companies, research institutes, and press agencies. It is maintained by the Centre for Research on the Epidemiology of Disasters (CRED) at Université catholique de Louvain (UCLouvain), Belgium.

- **Organization:** Centre for Research on the Epidemiology of Disasters (CRED), UCLouvain
- **Contributes:** event, hazard, impact
- **Source URL:** <https://www.emdat.be>

## GDACS

GDACS is a cooperation framework between the United Nations, the European Commission, and disaster managers worldwide to improve alerts, information exchange, and coordination in the first phase after major sudden-onset disasters.

- **Organization:** European Commission – Joint Research Centre (JRC)
- **Contributes:** event, hazard
- **Source URL:** <https://www.gdacs.org>
- **Contact:** <coordination@gdacs.org>

## GFD

The Global Flood Database (GFD) combines multiple years of satellite-based flood data to create the first comprehensive global resource for flood risk management and mitigation.

- **Organization:** Cloud to Street / Floodbase
- **Contributes:** event, hazard, impact
- **License:** Unknown
- **Source URL:** <https://global-flood-database.cloudtostreet.ai>
- **Contact:** <support@floodbase.com>

## GLIDE

GLIDE (GLobal IDEntifier Number) is a globally common unique ID code for disasters and emergencies. It provides a standard identifier assigned to each disaster event, enabling cross-database linkage across multiple information systems.

- **Organization:** Asian Disaster Reduction Center (ADRC)
- **Contributes:** event, hazard
- **Source URL:** <https://glidenumber.net>
- **Contact:** <gliderep@adrc.asia>

## IBTrACS

The International Best Track Archive for Climate Stewardship (IBTrACS) is a global database of tropical cyclone best track data, providing a centralized repository of position and intensity information from multiple meteorological agencies worldwide. It is maintained by the National Oceanic and Atmospheric Administration (NOAA).

- **Organization:** National Oceanic and Atmospheric Administration (NOAA)
- **Contributes:** event, hazard
- **Source URL:** <https://www.ncei.noaa.gov/products/international-best-track-archive>

## IDMC

The Internal Displacement Monitoring Centre (IDMC) maintains the Global Internal Displacement Database (GIDD), which provides comprehensive information on global internal displacement events from 2008 onwards. Only disaster-related displacement events are included in Montandon.

- **Organization:** Internal Displacement Monitoring Centre (IDMC)
- **Contributes:** event
- **Source URL:** <https://www.internal-displacement.org/database>
- **Contact:** <info@idmc.ch>

## IDU

The Internal Displacement Updates (IDU) dataset tracks the number of people internally displaced due to disaster or conflict. IDU provides more frequent, event-level displacement updates compared to IDMC's annual GIDD. Only disaster-type events are included in Montandon.

- **Organization:** Internal Displacement Monitoring Centre (IDMC)
- **Contributes:** event
- **Source URL:** <https://www.internal-displacement.org/internal-displacement-updates>
- **Contact:** <info@idmc.ch>

## IFRC-DREF

The IFRC Disaster Relief Emergency Fund (DREF) provides immediate financial support to National Red Cross and Red Crescent Societies for early action and response to disasters and crises. DREF records capture event-level and impact data for activations globally.

- **Organization:** International Federation of Red Cross and Red Crescent Societies (IFRC)
- **Contributes:** event, impact
- **Source URL:** <https://www.ifrc.org>

## PDC

The Pacific Disaster Center (PDC) tracks a wide range of natural and human-made hazards — including tropical cyclones, earthquakes, floods, landslides, wildfires, drought, and volcanic eruptions — to support disaster preparedness, response, and risk reduction efforts.

- **Organization:** Pacific Disaster Center
- **Contributes:** event, hazard, impact
- **License:** Unknown
- **Source URL:** <https://www.pdc.org>
- **Contact:** <info@pdc.org>

## USGS

The United States Geological Survey (USGS) Earthquake Hazards Program provides comprehensive earthquake data through a public API, offering real-time and historical earthquake information globally with the most complete coverage for the United States.

- **Organization:** United States Geological Survey (USGS)
- **Contributes:** event, hazard
- **License:** Public Domain
- **Source URL:** <https://earthquake.usgs.gov>
- **Contact:** <earthquakeinfo@usgs.gov>
