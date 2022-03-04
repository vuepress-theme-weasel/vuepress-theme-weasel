<template>
  <span class="category-info" :aria-label="pageInfoLocale.category" v-bind="hint !== false ? { 'data-balloon-pos': 'down' } : {}">
    <CategoryIcon />
    <ul class="categories-wrapper">
      <li v-for="(item) in category" :key="item.name" :class="{ category: true, clickable: item.path}">
      <span :role="item.path ? 'navigation' : ''">{item.name}</span></li>
      <meta property="articleSection" :content="category.map((item: any) => item.name).join(' ,')" />
    </ul>
  </span>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { ArticleCategory } from '../../typings'
import { articleInfoLocales } from '../define'
import { CategoryIcon } from './Icons'
import { useLocaleConfig } from '@mr-huang/vuepress-shared/lib/client'
import { useRoute, useRouter } from 'vue-router'

defineProps({
  category: {
    type: Array as PropType<ArticleCategory[]>,
    required: true
  },
  hint: {
    type: Boolean,
    default: true
  }
})

const pageInfoLocale = useLocaleConfig(articleInfoLocales)
const route = useRoute()
const router = useRouter()

 const navigate = (path = ""): void => {
  if (path && route.path !== path) void router.push(path)
}
</script>

<style lang="scss" scoped>

</style>
