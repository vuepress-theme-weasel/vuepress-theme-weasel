<template>
  <div class="feature-container">
    <div class="features">
      <Item v-for="(feature, index) in features" :feature="feature" :key="'feature' + index" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePageFrontmatter } from '@theme-weasel/composables'
import { isArray } from '@vuepress/shared';
import { computed } from 'vue';
import Item from './item.vue';

const frontmatter = usePageFrontmatter()
const features = computed(() => {
  if (isArray(frontmatter.value.features))
    return frontmatter.value.features;
  return []
})

console.log(features)
</script>

<style lang="scss" scoped>

</style>
