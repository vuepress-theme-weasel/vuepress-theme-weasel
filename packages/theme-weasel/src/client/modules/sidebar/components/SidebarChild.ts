import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import {
  renderChildren,
  renderItem,
} from "@theme-weasel/modules/sidebar/composables";
import { isActiveSidebarItem } from "@theme-weasel/modules/sidebar/utils";

import type { PropType, VNode } from "vue";
import type {
  ResolvedWeaselThemeSidebarHeaderItem,
  ResolvedWeaselThemeSidebarPageItem,
} from "../../../../typings";

import "../styles/sidebar-child.scss";

export default defineComponent({
  name: "SidebarChild",

  props: {
    config: {
      type: Object as PropType<
        ResolvedWeaselThemeSidebarPageItem | ResolvedWeaselThemeSidebarHeaderItem
      >,
      required: true,
    },
  },

  setup(props) {
    const route = useRoute();

    return (): (VNode | null)[] => [
      renderItem(props.config, {
        class: [
          "sidebar-link",
          `sidebar-${props.config.type}`,
          {
            active: isActiveSidebarItem(route, props.config, true),
          },
        ],
        exact: true,
      }),
      renderChildren(props.config.children),
    ];
  },
});
