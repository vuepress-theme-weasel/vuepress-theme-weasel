<template>
  <div class="home-page-container">
    <BlogHeader />
    <div class="content-container">
      <Navbar />
      <div class="blog-page-wrapper">
        <main class="blog-home">
          <Features />
          <MarkdownContent />
        </main>
        <BlogPanel />
      </div>
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

const frontmatter = usePageFrontmatter()
const features  = frontmatter.value.features || []
</script>
