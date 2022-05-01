<template>
  <ul class="tag-list-wrapper">
    <li v-for="({ name, path }, index) in tagList" :key="'tag-type' + index" class="article-type" :class="['tag', `tag${generateIndexfromHash(name, 9)}`, { active: isActive() }]">
      <RouterLink :to="path">{{ name }}</RouterLink>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { BlogPluginFrontmatter } from "@mr-huang/vuepress-plugin-blog";
import { usePageFrontmatter } from '@vuepress/client'
import { useTagMap } from '@theme-weasel/composables'
import { computed } from 'vue'
import { generateIndexfromHash } from '../../../../utils'

const frontmatter = usePageFrontmatter<BlogPluginFrontmatter>()
const tagMap = useTagMap();

const tagList = computed(() =>
  Object.entries(tagMap.value.map).map(([name, { path }]) => ({
    name,
    path,
  }))
);

const isActive = (name: string): boolean => name === frontmatter.value.blog?.name
</script>
