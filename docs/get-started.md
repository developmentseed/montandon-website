# Getting Started

This page provides an overview of the data available in the Montandon database, including how to access and use it for analysis and research.

## Get authorization token from IFRC GO

Due to the licensing restrictions of some of the data sources, you will need to obtain an authorization token from IFRC GO to access the Montandon API.

### Create an account on IFRC GO

1. Go to the [IFRC GO website](https://ifrcgo.org/).
2. Click on the "Register" button in the top right corner.
3. Fill in the required information and create your account.

### Request API access

Once your account has been created and approved, you can request access to the Montandon API by following these steps:

1. [Log in](https://go.ifrc.org/login) to your IFRC GO account.
2. Click on the "[Account](https://go.ifrc.org/account/details)" page.
3. In the Account Details tab, scroll down to the "External Connections" section.
4. In the section titled "Montandon - Global Crisis Data Bank", click the "Generate new token" button.
5. Copy the generated token and keep it in a secure place, as you will need it to access the Montandon API.

## Accessing the Montandon API

With your authorization token, you can now access the [Montandon API](https://montandon-eoapi.ifrc.org/stac) to retrieve disaster data for analysis and research. The API provides endpoints for querying and retrieving data on natural hazards, impacts, and operational responses.

### Exploring with stac-map.

The easiest way to explore the data is with [stac-map](https://www.developmentseed.org/stac-map/), a web-based tool for visualizing and exploring SpatioTemporal Asset Catalogs (STAC). You can use stac-map to browse collections stored in the Montandon STAC catalog.

1. Go to the [stac-map website](https://www.developmentseed.org/stac-map/).
2. In the "Catalog URL" field, enter the URL of the Montandon STAC catalog: `https://montandon-eoapi.ifrc.org/stac`
3. In the top right corner, click on the "Settings" icon (gear symbol).
4. In the "Access tokens" section, add the Montandon API token you obtained from IFRC GO.
5. Exit the settings menu, and you should now be able to explore the Montandon data in stac-map.
