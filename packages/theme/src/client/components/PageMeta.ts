import { defineComponent, h, computed } from "vue";
import { AutoLink, EditIcon } from "@theme-weasel/components"
import {
  useContributors,
  useEditLink,
  useThemeLocaleData,
  useUpdateTime,
} from "@theme-weasel/composables";

import type { VNode } from "vue";

import "../styles/page-meta.scss"

export default defineComponent({
  name: "PageMeta",

  setup() {
    const themeLocale = useThemeLocaleData();
    const editLink = useEditLink();
    const updateTime = useUpdateTime();
    const contributors = useContributors();

    const contributorsSelf = computed(() => {
      const _cacheName: string[] = []
      return contributors.value?.map(item => ({ name: item.name.toLowerCase(), email: item.email })).filter(({ name }) => {
        if (_cacheName.includes(name)) {
          return false
        }
        _cacheName.push(name)
        return true
      })
    })

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
              h("span", { class: "label" }, `${metaLocales!.lastUpdated}: `),
              h("span", { class: "info" }, updateTime.value),
            ])
          : null,
        contributorsSelf.value && contributorsSelf.value.length
          ? h("div", { class: "meta-item contributors" }, [
              h("span", { class: "label" }, `${metaLocales!.contributors}: `),
              contributorsSelf.value.map(({ email, name }, index) => [
                h(
                  "span",
                  { class: "contributor", title: `email: ${email}` },
                  name
                ),
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                index !== contributorsSelf.value!.length - 1 ? "," : "",
              ]),
            ])
          : null,
      ]);
    };
  },
});
