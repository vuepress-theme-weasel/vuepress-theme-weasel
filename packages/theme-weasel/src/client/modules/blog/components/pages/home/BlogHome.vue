<template>
  <div class="home-page-container">
    <BlogHeader />
    <div class="content-container">
      <Navbar />
      <div class="blog-page-wrapper">
        <main class="blog-home">
          <DropTransition :delay="0.16">
            <Features />
          </DropTransition>
          <DropTransition :delay="0.24">
            <ArticleList :items="articles.items" />
          </DropTransition>
        </main>
        <DropTransition :delay="0.16">
          <BlogPanel />
        </DropTransition>
      </div>
      <DropTransition :delay="0.28">
        <MarkdownContent />
      </DropTransition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { BlogHeader } from '../../header'
import { Navbar } from '../../navbar'
import { Features } from '../../features'
import { usePageFrontmatter } from '@theme-weasel/composables'
import { MarkdownContent } from '@theme-weasel/components'
import { BlogPanel } from '../../blogInfo'
import { DropTransition } from '@theme-weasel/components'
import { ArticleList } from '../../article'
import { useArticles } from '../../../composables'

const frontmatter = usePageFrontmatter()
const features  = frontmatter.value.features || []

const articles = useArticles()

</script>
