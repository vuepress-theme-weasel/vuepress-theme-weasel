<template>
  <aside class="blog-info-wrapper">
    <DropTransition>
      <BlogCard />
    </DropTransition>
    <DropTransition :delay="0.04">
      <CategoryCard />
    </DropTransition>
    <DropTransition :delay="0.06">
      <List />
    </DropTransition>
  </aside>
</template>

<script lang="ts" setup>
import { DropTransition } from '@theme-weasel/components'
import BlogCard from './BlogCard.vue'
import List from './List.vue'
import CategoryCard from './CategoryCard.vue'
</script>
