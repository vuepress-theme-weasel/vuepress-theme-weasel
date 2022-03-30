import { defineClientAppSetup } from "@vuepress/client";

import { setupSidebarItems } from "@theme-weasel/modules/sidebar/composables";

export default defineClientAppSetup(() => {
  setupSidebarItems();
});
