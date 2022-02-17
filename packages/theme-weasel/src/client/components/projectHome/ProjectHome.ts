import { defineComponent, h } from "vue";
import { usePageFrontmatter } from "@vuepress/client";
import DropTransition from "../transitions/DropTransition";
import HomeFeatures from "./HomeFeatures";
import MarkdownContent from "../markdownContent";
import ProjectHero from "./ProjectWeasel";

import type { VNode } from "vue";
import type { ProjectHomePageFrontmatter } from "../../../types"

export default defineComponent({
  name: "ProjectHome",

  setup() {
    const frontmatter = usePageFrontmatter<ProjectHomePageFrontmatter>();

    return (): VNode =>
      h(
        "main",
        {
          class: "project-home",
          "aria-labelledby":
            frontmatter.value.heroText === null ? undefined : "main-title",
        },
        [
          h(ProjectHero),
          h(
            DropTransition,
            { delay: 0.16 },
            { default: () => h(HomeFeatures) }
          ),
          h(
            DropTransition,
            { delay: 0.24 },
            { default: () => h(MarkdownContent, {
              custom: true
            }) }
          ),
        ]
      );
  },
});
