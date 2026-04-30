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
      { text: "Resources", link: "/resources" },
    ],

    sidebar: [
      {
        text: "Get Started",
        items: [
          { text: "Overview", link: "/overview" },
          { text: "Accessing Montandon", link: "/get-started" },
          { text: "Data Examples", link: "/data-examples" },
          { text: "Resources", link: "/resources" },
        ],
      },
      {
        text: "Get Involved",
        items: [{ text: "Contribute", link: "/get-involved" }],
      },
      ,
    ],
  },
});
