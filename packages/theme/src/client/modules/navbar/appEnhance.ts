import { App } from "vue";

import Navbar from "./components/Navbar.vue";

import './styles/index.scss';

export const clientEnhance = (app: App) => {
  app.component("Navbar", Navbar);
}
