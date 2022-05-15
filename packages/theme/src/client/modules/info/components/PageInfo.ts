import { defineComponent, resolveComponent, h } from "vue";

import { usePure } from "@theme-weasel/composables";

import AuthorInfo from "@theme-weasel/modules/info/components/AuthorInfo";
import CategoryInfo from "@theme-weasel/modules/info/components/CategoryInfo";
import DateInfo from "@theme-weasel/modules/info/components/DateInfo";
import PageViewInfo from "@theme-weasel/modules/info/components/PageViewInfo";
import ReadingTimeInfo from "@theme-weasel/modules/info/components/ReadingTimeInfo";
import TagInfo from "@theme-weasel/modules/info/components/TagInfo";
import OriginalInfo from "@theme-weasel/modules/info/components/OriginalMark";
import WordInfo from "@theme-weasel/modules/info/components/WordInfo";

import type {
  AuthorInfo as AuthorInfoType,
  DateInfo as DateInfoType,
} from "@mr-huang/vuepress-shared";
import type { PropType, VNode } from "vue";
// import type { ReadingTime } from "vuepress-plugin-reading-time2";
import type { PageCategory, PageTag, PageInfo, ReadingTime } from "../../../../typings";

import "balloon-css/balloon.css";
import "../styles/page-info.scss";

export interface PageInfoProps {
  /**
   * Authors of article
   *
   * 文章作者
   */
  author?: AuthorInfoType[];

  /**
   * Categories of article
   *
   * 文章分类
   */
  category?: PageCategory[];

  /**
   * Tags of article
   *
   * 文章标签
   */
  tag?: PageTag[];

  /**
   * Writing Date
   *
   * 写作日期
   */
  date?: DateInfoType | null;

  /**
   * Whether the aricle is orginal
   *
   * 文章是否原创
   */
  isOriginal?: boolean | null;

  /**
   * Whether enable pageview
   *
   * If the value is a string, it will use as search id
   *
   * 是否启用访问量
   *
   * 如果值为字符串，会用做查询 id
   */
  pageview?: string | boolean;

  /**
   * ReadingTime info
   *
   * 阅读时间
   */
  readingTime?: ReadingTime;
}

export default defineComponent({
  name: "PageInfo",

  components: {
    AuthorInfo,
    CategoryInfo,
    DateInfo,
    OriginalInfo,
    PageViewInfo,
    ReadingTimeInfo,
    TagInfo,
    WordInfo,
  },

  props: {
    items: {
      type: [Array, Boolean] as PropType<PageInfo[] | false>,
      default: (): PageInfo[] => [
        "Author",
        "Original",
        "Date",
        "Category",
        "Tag",
        "ReadingTime",
      ],
    },

    config: {
      type: Object as PropType<PageInfoProps>,
      required: true,
    },
  },

  setup(props) {
    const pure = usePure();

    return (): VNode | null =>
      props.items
        ? h(
            "div",
            { class: "page-info" },
            props.items.map((item) =>
              h(resolveComponent(`${item}Info`), {
                ...props.config,
                pure: pure.value,
              })
            )
          )
        : null;
  },
});
