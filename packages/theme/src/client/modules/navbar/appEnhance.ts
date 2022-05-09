import { defineClientAppEnhance } from "@vuepress/client";

import Navbar from "./components/Navbar.vue";

import './styles/index.scss';

export default defineClientAppEnhance(({ app }) => {
  app.component("Navbar", Navbar);
});
