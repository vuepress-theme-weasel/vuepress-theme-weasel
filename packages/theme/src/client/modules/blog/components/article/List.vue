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
  }
})
const blogOptions = useBlogOptions()
const currentPage = ref(1)

const articlePerPage = computed(() => blogOptions.value.articlePerPage)
console.log(blogOptions)
const currentArticles = computed(() =>
  props.items.slice(
    (currentPage.value - 1) * articlePerPage.value!,
    currentPage.value * articlePerPage.value!
  )
)
</script>
