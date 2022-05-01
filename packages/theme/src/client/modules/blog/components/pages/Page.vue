<template>
  <div class="home-page-container">
    <BlogHeader />
    <div class="content-container">
      <Navbar />
      <div class="blog-page-wrapper">
        <main class="blog-home">
          <DropTransition :delay="0.16">
            <ArticleContentPage v-if="pageType === 'articleContent'" />
            <ArticleType v-if="pageType === 'ArticleType'" :key="route.path" />
            <TagList v-if="pageType === 'TagList'" :key="route.path" />
          </DropTransition>
        </main>
        <DropTransition :delay="0.16">
          <BlogPanel />
        </DropTransition>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { BlogHeader, Navbar } from '../header'
import { DropTransition } from '@theme-weasel/components'
import { BlogPanel } from '../blogInfo'
import { usePageFrontmatter, useRoute } from '@vuepress/client';
import { BlogPluginFrontmatter } from '@mr-huang/vuepress-plugin-blog';
import { computed, watchEffect } from 'vue'
import ArticleContentPage from './ArticleContentPage.vue';
import { ArticleType, TagList } from '../../components'

const route = useRoute()
const frontmatter = usePageFrontmatter<BlogPluginFrontmatter>()

const pageType = computed<string>(() => {
  const { key } = frontmatter.value.blog || {}
  return key === 'category'
        ? 'CategoryList'
        : key === 'tag'
        ? 'TagList'
        : key === 'articleContent'
        ? 'articleContent'
        : key === 'timeline'
        ? ''
        : 'ArticleType'
})

watchEffect(() => {
  console.log(route.path)
})
console.log(pageType, frontmatter, '===============================')
</script>
