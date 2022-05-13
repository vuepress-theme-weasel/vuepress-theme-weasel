import { defineClientAppEnhance } from "@vuepress/client";

import Sidebar from "./components/Sidebar.vue";
import './styles/index.scss';
export default defineClientAppEnhance(({ app }) => {
  app.component("Sidebar", Sidebar);
});
