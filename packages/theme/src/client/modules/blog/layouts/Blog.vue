<template>
  <div class="page" :class="{'has-toc': enableToc}">
    <BlogWrapper class='blog-body-container'>
      <BlogHome v-if="isHome"/>
      <BlogPage v-else :key="route.path" />
    </BlogWrapper>
  </div>
</template>

<script lang="ts" setup>
import { usePageFrontmatter, useThemeLocaleData } from '@theme-weasel/composables'
import { computed } from 'vue';
import { useRoute } from 'vue-router'

const frontmatter = usePageFrontmatter()
const themeLocale = useThemeLocaleData()
const route = useRoute()

const isHome = computed(() => frontmatter.value.home)

const enableToc = computed(
  () =>
    frontmatter.value.toc ||
    (themeLocale.value.toc !== false && frontmatter.value.toc !== false)
);
</script>
