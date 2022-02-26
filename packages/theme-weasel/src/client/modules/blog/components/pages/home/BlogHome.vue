<template>
  <div class="home-page-container">
    <BlogHeader />
    <div class="content-container">
      <Navbar />
      <Features />
      <MarkdownContent />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { BlogHeader } from '../../header'
import { Navbar } from '../../navbar'
import { Features } from '../../features'
import { usePageFrontmatter } from '@theme-weasel/composables'
import { MarkdownContent } from '@theme-weasel/components'

const frontmatter = usePageFrontmatter()
const features  = frontmatter.value.features || []
</script>
