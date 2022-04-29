<template>
  <div class="article-info" v-if="config">
    <template v-for="(item, index) in config" :key="'component' + index">
      <component v-if="item" :is="`${item}Info`" v-bind="componentProp(item)" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { ArticleInfo } from '../../../typings'
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
    type: [Array, Boolean] as PropType<AuthorInfoType[] | false>,
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
    type: [Object, Boolean] as PropType<DateInfoType | null | false>,
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

<style lang="scss" src="../../styles/article/article-info.scss"></style>
