<template>
  <div :class="containerClassName">
    <slot></slot>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { usePageFrontmatter } from '@theme-weasel/composables'
import { Footer } from './'

const frontmatter = usePageFrontmatter()
const isHome = frontmatter.value.home
const containerClassName = computed(() => {
  return {
    'blog-home-container': isHome && frontmatter.value.layout === 'Blog'
  }
})

</script>
