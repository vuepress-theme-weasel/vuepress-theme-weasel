<template>
  <article class="article" vocab="https://schema.org" typeof="Article">
    <StickyIcon v-if="info.sticky" />
    <header class="title">
      <RouterLink :to="path">
        <!-- <LockIcon v-if="false" /> -->
        <SlideIcon v-if="info.type === 'slide'"/>
        <span property="headline">{{ info.title }}</span>
        <meta v-if="info.cover" property="image" :content="info.cover"/>
      </RouterLink>
    </header>
    <ItemImage v-if="info.cover" :url="info.cover" :title="info.title"/>
    <div class="excerpt" v-html="info.excerpt" />
    <RouterLink :to="path" class="article-read-more">阅读全文</RouterLink>
    <hr class="hr" />
    <!-- <component :is="ArticleInfo" v-bind="articleInfo" /> -->
    <ArticleInfo v-bind="articleInfo" />
  </article>
</template>

<script lang="ts" setup>
import {
  SlideIcon,
  StickyIcon,
} from '../icons'
import { PropType, toRef } from 'vue'
import { ArticleInfo as ArticleInfoType } from '../../../../../typings'
import { RouterLink } from 'vue-router'
import { withBase } from '@vuepress/client'
import { useArticleInfo } from '@theme-weasel/composables'
import ItemImage from './ItemImage.vue'

const props = defineProps({
  info: {
    type: Object as PropType<ArticleInfoType>,
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

<style lang="scss" src="../../styles/article-item.scss"></style>
