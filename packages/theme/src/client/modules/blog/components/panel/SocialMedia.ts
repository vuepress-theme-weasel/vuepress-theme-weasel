import { computed, defineComponent, h } from "vue";
import { usePageFrontmatter } from "@vuepress/client";
import { icons } from "@temp/theme-weasel/socialMedia";
import { usePure } from "@theme-weasel/composables";
import { useBlogOptions } from "@theme-weasel/modules/blog/composables";

import type { VNode } from "vue";
import type { ThemeNormalPageFrontmatter } from "../../../../../typings";

export default defineComponent({
  name: "SocialMedia",

  setup() {
    const frontmatter = usePageFrontmatter<ThemeNormalPageFrontmatter>();
    const blogOptions = useBlogOptions();
    const isPure = usePure();

    const mediaLinks = computed(() => {
      const { socialMedia } = frontmatter.value;

      const config = socialMedia === false ? false : blogOptions.value.medias || false;

      if (config)
        return Object.entries(config).map(([media, url]) => ({
          name: media,
          icon: icons[media],
          url: url as string,
        }));

      return [];
    });

    return (): VNode | null =>
      mediaLinks.value.length
        ? h(
            "div",
            { class: "social-media-wrapper" },
            mediaLinks.value.map(({ name, icon, url }) =>
              h("a", {
                class: "social-media",
                href: url,
                rel: "noopener noreferrer",
                target: "_blank",
                "aria-label": name,
                ...(isPure.value ? {} : { "data-balloon-pos": "up" }),
                innerHTML: icon,
              })
            )
          )
        : null;
  },
});
