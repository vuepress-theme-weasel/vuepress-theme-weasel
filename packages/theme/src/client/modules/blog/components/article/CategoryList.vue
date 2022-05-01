<template>
  <ul class="category-list-wrapper">
    <li v-for="({ category, path, items }, index) in categoryList" :key="'category-type' + index" :class="['category', `category${generateIndexfromHash(category, 9)}`, { active: path === route.path }]">
      <RouterLink :to="path">
      {{ category }}
      <span class="category-num">{{ items.length }}</span>
      </RouterLink>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { useCategoryMap } from '@theme-weasel/composables'
import { useRoute } from '@vuepress/client';
import { computed } from 'vue'
import { generateIndexfromHash } from '../../../../utils'

const categoryMap = useCategoryMap();
const route = useRoute();

const categoryList = computed(() =>
  Object.entries(categoryMap.value.map).map(([category, { path, items }]) => ({
    category,
    path,
    items
  }))
);

</script>
