<template>
  <div class="weasel-features">
    <Item v-for="(item, index) in features" :title="item.title" :details="item.details" :key="'feature' + index" />
  </div>
</template>

<script lang="ts" setup>
import { usePageFrontmatter } from '@theme-weasel/composables'
import Item from './Item.vue'

const frontmatter = usePageFrontmatter()
const features  = frontmatter.value.features || []
</script>
