<template>
  <div id='article-list' class='article-wrapper'>
    <DropTransition
      v-for="({ info, path }, index) in currentArticles"
      :key="'article-list' + index"
      :delay="index * 0.04"
    >
      <ArticleItem :key="path" :info="info" :path="path" />
    </DropTransition>
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType, ref } from 'vue'
import type { ArticleInfo } from '../../../../../typings'
import { useBlogOptions } from '../../composables'
import { DropTransition } from '@theme-weasel/components'
import ArticleItem from './Item.vue'
const props = defineProps({
  items: {
    type: Array as PropType<{ path: string; info: ArticleInfo }[]>,
    default: () => []
  },
  currentPage: {
    type: Number,
    default: 1
  }
})
const blogOptions = useBlogOptions()

const articlePerPage = computed(() => blogOptions.value.articlePerPage)
console.log(articlePerPage)
const currentArticles = computed(() =>
  props.items.slice(
    (props.currentPage - 1) * articlePerPage.value!,
    props.currentPage * articlePerPage.value!
  )
)
</script>
