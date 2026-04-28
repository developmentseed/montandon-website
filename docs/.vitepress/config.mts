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
        icon: "github",
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
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6h4"/><path d="M2 10h4"/><path d="M2 14h4"/><path d="M2 18h4"/><rect width="16" height="20" x="4" y="2" rx="2" fill="none"/><path d="M9.5 8h5"/><path d="M9.5 12H16"/><path d="M9.5 16H14"/></svg>',
        },
        ariaLabel: "Montandon Notebooks",
        link: "https://ifrcgo.org/montandon-notebooks/",
      },
    ],
  },
});
