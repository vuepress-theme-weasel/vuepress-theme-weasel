import { generateIndexfromHash } from "@theme-weasel/utils";
import { defineComponent, h } from "vue";
import { useRoute, useRouter } from "vue-router";

import { TagIcon } from "@theme-weasel/modules/info/components/icons";
import { useMetaLocale } from "@theme-weasel/modules/info/composables";

import type { PropType, VNode } from "vue";
import type { PageTag } from "../../../../typings";

import "../styles/tag.scss";

export default defineComponent({
  name: "TagInfo",

  props: {
    tag: {
      type: Array as PropType<PageTag[]>,
      default: () => [],
    },

    pure: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const metaLocale = useMetaLocale();

    const navigate = (path = ""): void => {
      if (path && route.path !== path) void router.push(path);
    };

    return (): VNode | null =>
      props.tag.length
        ? h(
            "span",
            {
              "aria-label": `${metaLocale.value.tag}${props.pure ? "" : "🏷"}`,
              ...(props.pure ? {} : { "data-balloon-pos": "down" }),
            },
            [
              h(TagIcon),
              h(
                "ul",
                { class: "tags-wrapper" },
                props.tag.map(({ name, path }) =>
                  h(
                    "li",
                    {
                      class: [
                        "tag",
                        {
                          // TODO: magic number 9 is tricky here
                          [`tag${generateIndexfromHash(name, 9)}`]: !props.pure,
                          clickable: path,
                        },
                      ],
                      role: path ? "navigation" : "",
                      onClick: () => navigate(path),
                    },
                    name
                  )
                )
              ),
              h("meta", {
                property: "keywords",
                content: props.tag.map(({ name }) => name).join(","),
              }),
            ]
          )
        : null;
  },
});
