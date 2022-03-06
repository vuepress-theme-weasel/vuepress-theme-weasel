<template>
  <article class="article" vocab="https://schema.org" typeof="Article">
    <StickyIcon v-if="info.sticky" />
    <header class="title">
      <RouterLink :to="path">
        <!-- <LockIcon v-if="false" /> -->
        <SlideIcon v-if="info.type === 'slide'"/>
        <span property="headline">{{ info.title }}</span>
        <meta v-if="info.cover" property="image" :content="withBase(info.cover)"/>
      </RouterLink>
      <div class="excerpt" v-html="info.excerpt" />
      <hr class="hr" />
      <component is="ArticleInfo" v-bind="articleInfo" />
    </header>
  </article>
</template>

<script lang="ts" setup>
import {
  LockIcon,
  SlideIcon,
  StickyIcon,
} from '../icons'
import { computed, PropType, toRef } from 'vue'
import { ArticleInfo } from '../../../../../typings'
import { RouterLink } from 'vue-router'
import { withBase } from '@vuepress/client'
import { useArticleInfo } from '../../composables'


const props = defineProps({
  info: {
    type: Object as PropType<ArticleInfo>,
    required: true,
  },
  path: { type: String, required: true }
})
 const info = toRef(props, 'info');
// const { getPathEncryptStatus } = usePathEncrypt()

// const isEncrypted = computed(() => getPathEncryptStatus(props.path))

const articleInfo = useArticleInfo(info)

// const isEncrypted = computed(() => getPathEncryptStatus(props.path))
</script>

<style lang="scss" scoped src="../../styles/article-item.scss"></style>
