<template>
  <CommonWrapper class='body-container'>
    <BlogHome v-if="isHome && isBlog"/>
  </CommonWrapper>
</template>

<script lang="ts" setup>
import { Fragment } from 'vue'
import { BlogHome, CommonWrapper } from '../components'
import { usePageData } from '@vuepress/client'
import { usePageFrontmatter } from '../composables'

const page = usePageData()
const frontmatter = usePageFrontmatter()

const isHome = frontmatter.value.home
const isProject = frontmatter.value.project
const isBlog = frontmatter.value.blog

</script>
