import { defineClientAppSetup } from "@vuepress/client";

import { setupDarkMode, setupPureMode } from "./composables";

export default defineClientAppSetup(() => {
  setupDarkMode()
  setupPureMode()
});
