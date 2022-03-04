<template>
  <Fragment v-if="author.length">
    <span class="author-info" :aria-label=" pageInfoLocale.value.author" v-bind="(hint ? { 'data-balloon-pos': 'down' } : {})">
    <AuthorIcon />
    <span>
      <Fragment v-for="(item, index) in author" :key="'author' + index">
        <a v-if="item.url" :href="item.url" class="author-item" target="_blank">{{item.name}}</a>
      <span v-else class="author-item">{{item.name}}</span>
      </Fragment>
    </span>
    <span property="author" :content="author.map(item => item.name).join(', ')"></span>
  </span>
  </Fragment>
</template>

<script lang="ts" setup>
import { AuthorIcon } from './Icons'
import { Fragment } from 'vue'
import type { PropType } from 'vue'
import type { AuthorInfo } from '@mr-huang/vuepress-shared'
import { useLocaleConfig } from '@mr-huang/vuepress-shared/lib/client'
import { articleInfoLocales } from "../define";

defineProps({
  author: {
    type: Array as PropType<AuthorInfo[]>,
    required: true,
  },

  hint: {
    type: Boolean,
    default: true,
  },
})

const pageInfoLocale = useLocaleConfig(articleInfoLocales)
</script>

<style lang='scss' scoped>

</style>
