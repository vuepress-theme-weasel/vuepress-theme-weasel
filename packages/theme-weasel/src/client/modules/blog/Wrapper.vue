<template>
  <div :class="containerClassName">
    <slot></slot>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { usePageFrontmatter } from '../../composables'
import { Footer } from './components'

const frontmatter = usePageFrontmatter()
const isHome = frontmatter.value.home
const containerClassName = computed(() => {
  return {
    'blog-home-container': isHome && frontmatter.value.blog
  }
})

</script>
