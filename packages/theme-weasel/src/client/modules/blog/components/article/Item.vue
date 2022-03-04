<template>
  <article class="article" vocab="https://schema.org" typeof="Article">
    <StickyIcon />
    <header class="title">
      <RouterLink :to="path">
        <LockIcon />
        <SlideIcon v-if="info.type === 'slide'"/>
        <span property="headline">{{ info.title }}</span>
        <meta v-if="info.cover" property="image" :content="withBase(info.cover)"/>
      </RouterLink>
      <div class="excerpt" v-html="info.excerpt" />
      <hr class="hr" />
      
    </header>
  </article>
</template>

<script lang="ts" setup>
import {
  LockIcon,
  SlideIcon,
  StickyIcon,
} from '../icons'
import { PropType } from 'vue'
import { ArticleInfo } from '../../../../../typings'
import { RouterLink } from 'vue-router'
import { withBase } from '@vuepress/client'
defineProps({
  info: {
    type: Object as PropType<ArticleInfo>,
    required: true,
  },
  path: { type: String, required: true }
})

</script>
