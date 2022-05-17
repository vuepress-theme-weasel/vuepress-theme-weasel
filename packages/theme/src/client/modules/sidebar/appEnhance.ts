import { App } from "vue";

import Sidebar from "./components/Sidebar.vue";

import './styles/index.scss';

export const clientEnhance = (app: App) => {
  app.component("Sidebar", Sidebar);
}
