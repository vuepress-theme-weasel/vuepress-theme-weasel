<template>
  <span v-if="author" class="author-info" :aria-label="pageInfoLocale.author" v-bind="(hint ? { 'data-balloon-pos': 'down' } : {})">
    <AuthorIcon />
    <span v-for="(item, index) in author" :key="'author' + index">
      <a v-if="item.url" :href="item.url" class="author-item" target="_blank">{{item.name}}</a>
      <span v-else class="author-item">{{item.name}}</span>
    </span>
    <span property="author" :content="author.map(item => item.name).join(', ')"></span>
  </span>
</template>

<script lang="ts" setup>
import { AuthorIcon } from './Icons'
import { Fragment } from 'vue'
import type { PropType } from 'vue'
import type { AuthorInfo } from '@mr-huang/vuepress-shared'
import { useLocaleConfig } from '@mr-huang/vuepress-shared/lib/client'
import { articleInfoLocales } from "../define";

const props = defineProps({
  author: {
    type: [Array, Boolean] as PropType<AuthorInfo[] | false>,
    required: true,
  },

  hint: {
    type: Boolean,
    default: true,
  },
})
console.log(props)
const pageInfoLocale = useLocaleConfig(articleInfoLocales)
</script>

<style lang='scss' scoped>

</style>
