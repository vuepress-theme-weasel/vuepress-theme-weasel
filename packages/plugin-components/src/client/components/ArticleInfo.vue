<template>
  <div class="article-info" v-if="config">
    <template v-for="(item, index) in config" :key="'component' + index">
      <component :is="resolveComponent(`${item}Info`)
" v-bind="componentProp(item)" />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AuthorInfo from './AuthorInfo.vue'
import CategoryInfo from './CategoryInfo.vue'
import DateInfo from './DateInfo.vue'
import TagInfo from './TagInfo.vue'
import OriginalInfo from './OriginalMark.vue'
import ReadingTimeInfo from './ReadingTimeInfo.vue'
export default defineComponent({
  components: {
    AuthorInfo,
    CategoryInfo,
    DateInfo,
    TagInfo,
    OriginalInfo,
    ReadingTimeInfo
  }
})
</script>

<script lang="ts" setup>
import { PropType, resolveComponent } from 'vue'
import { ArticleInfo } from '../../typings'
import type {
  AuthorInfo as AuthorInfoType,
  DateInfo as DateInfoType,
} from '@mr-huang/vuepress-shared'

const props = defineProps({
  config: {
    type: [Array, Boolean] as PropType<ArticleInfo[] | false>,
    default: (): ArticleInfo[] => [
      "Author",
      "Original",
      "PageView",
      "Date",
      "Category",
      "Tag",
      "ReadingTime",
    ],
  },

  hint: {
    type: Boolean,
    default: true,
  },

  author: {
    type: Array as PropType<AuthorInfoType[]>,
    default: () => [],
  },

  category: {
    type: Array as PropType<string[]>,
    default: () => [],
  },

  tag: {
    type: Array as PropType<string[]>,
    default: () => [],
  },

  date: {
    type: Object as PropType<DateInfoType | null>,
    default: null,
  },

  isOriginal: {
    type: Boolean,
    default: false,
  },

  pageview: {
    type: Boolean,
    default: false,
  }

  // readingTime: {
  //   type: Object as PropType<ReadingTime | null>,
  //   default: () => null,
  // }
})

const componentProp = (item: ArticleInfo): any => {
  const { author, hint, category, tag, isOriginal, date } = props
  if (item === 'Author') return { author, hint }
  if (item === 'Category') return { category, hint }
  if (item === 'Tag') return { tag, hint }
  if (item === 'Original') return { isOriginal }
  if (item === 'Date') return { date, hint }
}
</script>

<style lang="scss" scoped src="../styles/article-info.scss"></style>
