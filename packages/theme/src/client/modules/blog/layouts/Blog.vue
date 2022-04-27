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
import { computed } from 'vue';

const frontmatter = usePageFrontmatter()
const isHome = computed(() => frontmatter.value.home)
</script>
