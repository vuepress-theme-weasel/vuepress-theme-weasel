<template>
  <div class="home-page-container">
    <BlogHeader />
    <div class="content-container">
      <Navbar />
      <div class="blog-page-wrapper">
        <main class="blog-home blog-body-container">
          <DropTransition :delay="0.16">
            <ArticleContent />
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
import { BlogHeader } from '../../header'
import { Navbar } from '../../navbar'
import { usePageFrontmatter } from '@theme-weasel/composables'
import { BlogPanel } from '../../blogInfo'
import { DropTransition } from '@theme-weasel/components'
import { ArticleContent } from '../../article'
import { useArticles } from '../../../composables'

const frontmatter = usePageFrontmatter()


</script>
