<template>
  <div>

  </div>
</template>

<script lang="ts" setup>
import { useBlogPageType, useBlogFrontmatter } from '../../../../../lib/client'

const pageType = useBlogPageType('slide')
const category = useBlogFrontmatter('category')
console.log(pageType)
console.log(category)
</script>

<style lang="scss" scoped>

</style>
