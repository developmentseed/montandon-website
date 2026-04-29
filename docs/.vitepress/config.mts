import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Montandon",
  description: "Montandon: Global Crisis Data Bank",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Get Started", link: "/get-started" },
      { text: "Get Involved", link: "/get-involved" },
    ],

    sidebar: [
      {
        text: "Get Started",
        items: [
          { text: "Overview", link: "/overview" },
          { text: "Accessing Montandon", link: "/get-started" },
          { text: "Data Examples", link: "/data-examples" },
        ],
      },
      {
        text: "Get Involved",
        items: [{ text: "Contribute", link: "/get-involved" }],
      },
    ],

    socialLinks: [
      {
        icon: "github",
        ariaLabel: "Montandon STAC Extension",
        link: "https://github.com/IFRCGo/monty-stac-extension",
      },
      {
        icon: "python",
        ariaLabel: "Pystac Monty",
        link: "https://github.com/IFRCGo/pystac-monty",
      },
      {
        icon: "github",
        ariaLabel: "Montandon ETL",
        link: "https://github.com/IFRCGo/montandon-etl",
      },
      {
        icon: "github",
        ariaLabel: "Monty EOAPI",
        link: "https://github.com/IFRCGo/monty-eoapi",
      },
      {
        icon: "jupyter",
        ariaLabel: "Montandon Notebooks",
        link: "https://ifrcgo.org/montandon-notebooks/",
      },
    ],
  },
});
