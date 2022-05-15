import { useLocaleConfig } from "@mr-huang/vuepress-shared/lib/client";
import { computed, defineComponent, h } from "vue";

import { TimerIcon } from "@theme-weasel/modules/info/components/icons";
import { useMetaLocale } from "@theme-weasel/modules/info/composables";
import { readingTimeLocales } from "@theme-weasel/modules/info/utils";

// import type { ReadingTime } from "vuepress-plugin-reading-time2";
import type { PropType, VNode } from "vue";
import { ReadingTime } from "../../../../typings";

export default defineComponent({
  name: "ReadingTimeInfo",

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

    const readingTime = computed(() => {
      if (!props.readingTime) return null;

      const { minutes } = props.readingTime;

      return minutes < 1
        // @ts-ignore
        ? { text: readingTimeLocale.value.less1Minute, time: "PT1M" }
        : {
            // @ts-ignore
            text: readingTimeLocale.value.time.replace(
              "$time",
              Math.round(minutes).toString()
            ),
            time: `PT${Math.round(minutes)}M`,
          };
    });

    return (): VNode | null =>
      readingTime.value
        ? h(
            "span",
            {
              class: "reading-time-info",
              "aria-label": `${metaLocale.value.readingTime}${
                props.pure ? "" : "⌛"
              }`,
              ...(props.pure ? {} : { "data-balloon-pos": "down" }),
            },
            [
              h(TimerIcon),
              h("span", readingTime.value.text),
              h("meta", {
                property: "timeRequired",
                content: readingTime.value.time,
              }),
            ]
          )
        : null;
  },
});
