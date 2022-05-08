<template>
  <div class="project-page">
    <ProjectHome v-if="isHome" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { usePageFrontmatter } from '../composables';
import { ProjectHome } from '@theme-weasel/modules/project/components'

const frontmatter = usePageFrontmatter()
const isHome = computed(() => frontmatter.value.home)

</script>

<style lang="scss" scoped>

</style>
