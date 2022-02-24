<template>
  <div :class="containerClassName">
    <slot></slot>
    <h1>footer</h1>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { usePageFrontmatter } from '../../composables'

const frontmatter = usePageFrontmatter()
const isHome = frontmatter.value.home
const containerClassName = computed(() => {
  return {
    'blog-home-container': isHome && frontmatter.value.blog
  }
})

</script>
