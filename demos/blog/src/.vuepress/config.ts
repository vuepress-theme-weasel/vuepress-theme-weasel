import { defineUserConfig } from "@vuepress/cli";
import { blogTheme } from "./theme";

const BASE = process.env.BASE as "/" | `/${string}/`;

export default defineUserConfig({
  base: BASE || "/",

  title: "Blog",
  description: "Blog plugin for VuePress2",

  theme: blogTheme({
    logo: "/logo.png",

    repo: "vuepress-theme-weasel/vuepress-theme-weasel/tree/main/demos/blog/",

    navbar: [
      "/",
      {
        text: "Article",
        link: "/article/",
      },
      {
        text: "Category",
        link: "/category/",
      },
      {
        text: "Tag",
        link: "/tag/",
      },
      {
        text: "Timeline",
        link: "/timeline/",
      },
    ],
  }),
});
