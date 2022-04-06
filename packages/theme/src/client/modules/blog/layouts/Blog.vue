<template>
  <BlogWrapper class='blog-body-container'>
    <BlogHome v-if="isHome"/>
    <NormalPage v-else />
  </BlogWrapper>
</template>

<script lang="ts" setup>
import { usePageFrontmatter } from '@theme-weasel/composables'

const frontmatter = usePageFrontmatter()
const isHome = frontmatter.value.home
</script>
