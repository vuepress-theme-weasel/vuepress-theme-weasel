<template>
  <div class="theme-weasel-content" :class="{custom}">
    <Content />
  </div>
</template>

<script lang="ts" setup>
import { Content } from "@vuepress/client"

defineProps({
  custom: {
    type: Boolean,
    default: false
  }
})
</script>
