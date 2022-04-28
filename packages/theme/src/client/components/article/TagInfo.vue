<template>
  <span v-if="tag.length" :aria-label="pageInfoLocale.tag" v-bind="hint !== false ? { 'data-balloon-pos': 'down' } : {}">
    <TagIcon />
    <ul class="tags-wrapper">
      <li v-for="({ name, path }, index) in tag" :class="['tag', `tag${index % 9}`, { clickable: path }]" @click="navigate(path)">
        <span :role="path ? 'navigation' : ''">{{ name }}</span>
      </li>
    </ul>
  </span>
</template>

<script lang="ts" setup>
import { useLocaleConfig } from '@mr-huang/vuepress-shared/lib/client'
import { useRoute, useRouter } from 'vue-router'
import { TagIcon } from './Icons'
import { articleInfoLocales } from '../../define'

import type { PropType } from 'vue'
import type { ArticleTag } from '@mr-huang/vuepress-shared'

defineProps({
  tag: {
    type: Array as PropType<ArticleTag[]>,
    default: () => []
  },

  hint: {
    type: Boolean,
    default: true
  }
})

const route = useRoute()
const router = useRouter()

const pageInfoLocale = useLocaleConfig(articleInfoLocales)

 const navigate = (path = ''): void => {
  if (path && route.path !== path) void router.push(path)
}
</script>

<style lang="scss" scoped src="../../styles/article/tag.scss"></style>
