<template>
  <ul class="tag-list-wrapper">
    <li v-for="({ name, path }, index) in tagList" :class="[
      'tag',
      `tag${index % 9}`,
      { active: isActive(name) }
    ]">
      <RouterLink :to="path">
        <div class="tag-name">{{ name }}</div>
      </RouterLink>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { BlogFrontmatterOptions } from '@mr-huang/vuepress-plugin-blog'
import { usePageFrontmatter } from '@vuepress/client'
import { computed } from 'vue';
import { RouterLink } from 'vue-router'
import { useTagMap } from '@theme-weasel/composables'

const frontmatter = usePageFrontmatter<BlogFrontmatterOptions>()
const tagMap = useTagMap()
const tagList = computed(() =>
  Object.keys(tagMap.value.map).map((tag) => ({
    name: tag,
    path: tagMap.value.map[tag].path,
  }))
)
const isActive = (name: string): boolean => name === frontmatter.value.key

</script>

<style lang="scss" scoped src="../../styles/tag-list.scss"></style>
