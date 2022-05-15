import { defineComponent, h } from "vue";

import { EditIcon, AutoLink } from "@theme-weasel/components";
import { useThemeLocaleData } from "@theme-weasel/composables";
import {
  useContributors,
  useEditLink,
  useUpdateTime,
} from "@theme-weasel/modules/info/composables";

import type { VNode } from "vue";

import "../styles/page-meta.scss";

export default defineComponent({
  name: "PageMeta",

  setup() {
    const themeLocale = useThemeLocaleData();
    const editLink = useEditLink();
    const updateTime = useUpdateTime();
    const contributors = useContributors();

    return (): VNode => {
      const { metaLocales } = themeLocale.value;

      return h("footer", { class: "page-meta" }, [
        editLink.value
          ? h(
              "div",
              { class: "meta-item edit-link" },
              h(
                AutoLink,
                { class: "label", config: editLink.value },
                { before: () => h(EditIcon) }
              )
            )
          : null,
        updateTime.value
          ? h("div", { class: "meta-item update-time" }, [
              h("span", { class: "label" }, `${metaLocales.lastUpdated}: `),
              h("span", { class: "info" }, updateTime.value),
            ])
          : null,
        contributors.value && contributors.value.length
          ? h("div", { class: "meta-item contributors" }, [
              h("span", { class: "label" }, `${metaLocales.contributors}: `),
              contributors.value.map(({ email, name }, index) => [
                h(
                  "span",
                  { class: "contributor", title: `email: ${email}` },
                  name
                ),
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                index !== contributors.value!.length - 1 ? "," : "",
              ]),
            ])
          : null,
      ]);
    };
  },
});
