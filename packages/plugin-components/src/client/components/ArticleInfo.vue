<template>
  <div class="article-info" v-if="config">
    <template v-for="(item, index) in config" :key="'component' + index">
      <component :is="`${item}Info`" v-bind="$props" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { ArticleInfo } from '../../typings'
import type {
  AuthorInfo as AuthorInfoType,
  DateInfo as DateInfoType,
} from '@mr-huang/vuepress-shared'
defineProps({
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
</script>

<style lang="scss" scoped>
</style>
