import { defineClientAppEnhance } from "@vuepress/client";

import Sidebar from "./components/Sidebar.vue";

export default defineClientAppEnhance(({ app }) => {
  app.component("Sidebar", Sidebar);
});
