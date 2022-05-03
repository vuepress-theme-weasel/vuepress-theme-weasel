<template>
  <div class="page" :class="{'has-toc': enableToc}">
    <BlogWrapper class='blog-body-container'>
      <BlogHome v-if="isHome"/>
      <BlogPage v-else />
    </BlogWrapper>
  </div>
</template>

<script lang="ts" setup>
import { usePageFrontmatter, useThemeLocaleData } from '@theme-weasel/composables'
import { computed } from 'vue';

const frontmatter = usePageFrontmatter()
const themeLocale = useThemeLocaleData();

const isHome = computed(() => frontmatter.value.home)

const enableToc = computed(
  () =>
    frontmatter.value.toc ||
    (themeLocale.value.toc !== false && frontmatter.value.toc !== false)
);
</script>
