<template>
  <BlogWrapper class='blog-body-container'>
    <BlogHome v-if="isHome"/>
  </BlogWrapper>
</template>

<script lang="ts" setup>
import { BlogHome } from '../components'
import { usePageData } from '@vuepress/client'
import { usePageFrontmatter } from '../../../composables'

const page = usePageData()
const frontmatter = usePageFrontmatter()
const isHome = frontmatter.value.home

console.log('isHome', isHome)

</script>
