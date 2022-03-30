import { computed, defineComponent, h } from "vue";
import { RouterLink, useRoute } from "vue-router";

import DropdownTransition from "@theme-weasel/components/transitions/DropTransition.vue";
import SidebarLinks from "@theme-weasel/modules/sidebar/components/SidebarLinks";
import { renderIcon } from "@theme-weasel/modules/sidebar/composables";
import { isActiveSidebarItem } from "@theme-weasel/modules/sidebar/utils";

import type { PropType, VNode } from "vue";
import type { ResolvedWeaselThemeSidebarGroupItem } from "../../../../typings";

import "../styles/sidebar-group.scss";

export default defineComponent({
  name: "SidebarGroup",

  props: {
    config: {
      type: Object as PropType<ResolvedWeaselThemeSidebarGroupItem>,
      required: true,
    },
    open: { type: Boolean, required: true },
  },

  emits: ["toggle"],

  setup(props, { emit }) {
    const route = useRoute();
    const active = computed(() => isActiveSidebarItem(route, props.config));

    const exact = computed(() =>
      isActiveSidebarItem(route, props.config, true)
    );

    return (): VNode[] => {
      const { collapsable, children = [], icon, link, text } = props.config;

      return [
        h("section", { class: "sidebar-group" }, [
          h(
            collapsable ? "button" : "p",
            {
              class: [
                "sidebar-heading",
                {
                  clickable: collapsable || link,
                  exact: exact.value,
                  active: active.value,
                },
              ],
              ...(collapsable
                ? {
                    onClick: () => emit("toggle"),
                    onKeydown: (event: KeyboardEvent): void => {
                      if (event.key === "Enter") emit("toggle");
                    },
                  }
                : {}),
            },
            [
              // icon
              renderIcon(icon),
              // title
              link
                ? h(RouterLink, { to: link, class: "title" }, () => text)
                : h("span", { class: "title" }, text),
              // arrow
              collapsable
                ? h("span", { class: ["arrow", props.open ? "down" : "right"] })
                : null,
            ]
          ),
          h(DropdownTransition, () =>
            props.open || !collapsable
              ? h(SidebarLinks, { config: children })
              : null
          ),
        ]),
      ];
    };
  },
});
