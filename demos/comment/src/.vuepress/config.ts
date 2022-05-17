import { defineUserConfig } from "@vuepress/cli";
import { commentPlugin } from "@mr-huang/vuepress-plugin-comment";
import { commentTheme } from "./theme";

const BASE = process.env.BASE as "/" | `/${string}/`;

export default defineUserConfig({
  base: BASE || "/",

  title: "Comment Plugin",
  description: "Comment Plugin for VuePress2",

  // we are using a custom theme adding this plugin
  theme: commentTheme({
    logo: "/logo.png",

    repo: "vuepress-theme-weasel/vuepress-theme-weasel/tree/main/demos/comment/",

    navbar: ["README.md", "test.md"],
  }),

  plugins: [
    commentPlugin({
      /**
       * Using giscus
       */
      type: "giscus",
      repo: "vuepress-theme-weasel/blog-comment",
      repoId: "R_kgDOHEoaBA",
      category: "Announcements",
      categoryId: "DIC_kwDOHEoaBM4COShW",

      /**
       * Using twikoo
       */
      // type: "twikoo",
      // envId: "https://twikoo.ccknbc.vercel.app",

      /**
       * Using Waline
       */
      // type: "waline",
      // serverURL: "https://vuepress-theme-hope-comment.vercel.app",
    }),
  ],
});
