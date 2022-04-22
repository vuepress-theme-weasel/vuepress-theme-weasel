<template>
  <div class="page">
    <BlogWrapper class='blog-body-container'>
      <BlogHome v-if="isHome"/>
      <BlogPage v-else />
    </BlogWrapper>
  </div>
</template>

<script lang="ts" setup>
import { usePageFrontmatter } from '@theme-weasel/composables'

const frontmatter = usePageFrontmatter()
const isHome = frontmatter.value.home
</script>
