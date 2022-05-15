import { useLocaleConfig } from "@mr-huang/vuepress-shared/lib/client";
import { computed, defineComponent, h } from "vue";

import { WordIcon } from "@theme-weasel/modules/info/components/icons";
import { useMetaLocale } from "@theme-weasel/modules/info/composables";
import { readingTimeLocales } from "@theme-weasel/modules/info/utils";

// import type { ReadingTime } from "vuepress-plugin-reading-time2";
import type { PropType, VNode } from "vue";
import { ReadingTime } from "../../../../typings";

export default defineComponent({
  name: "ReadTimeInfo",

  props: {
    readingTime: {
      type: Object as PropType<ReadingTime | null>,
      default: () => null,
    },

    pure: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const metaLocale = useMetaLocale();
    // @ts-ignore
    const readingTimeLocale = useLocaleConfig(readingTimeLocales);

    const words = computed(() => props.readingTime?.words.toString());

    const wordText = computed(() =>
      // @ts-ignore
      readingTimeLocale.value.word.replace("$word", words.value || "")
    );

    return (): VNode | null =>
      words.value
        ? h(
            "span",
            {
              class: "words-info",
              "aria-label": `${metaLocale.value.words}${
                props.pure ? "" : "🔠"
              }`,
              ...(props.pure ? {} : { "data-balloon-pos": "down" }),
            },
            [
              h(WordIcon),
              h("span", wordText.value),
              h("meta", {
                property: "wordCount",
                content: words.value,
              }),
            ]
          )
        : null;
  },
});
