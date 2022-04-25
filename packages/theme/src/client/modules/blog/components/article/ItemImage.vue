<template>
  <div class="article-item-image-wrapper">
    <img class="article-item-image" :src="url" :alt="title" />
    <CoverIcon class="image-icon" />
  </div>
</template>

<script lang="ts" setup>
import { CoverIcon } from '../icons'

defineProps({
  url: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.article-item-image-wrapper {
  text-align: center;
  position: relative;
  margin-bottom: 12px;
  height: 100%;
  width: 100%;
  .image-icon {
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 28px;
    height: 24px;
    background: var(--theme-color);
    padding: 4px;
    border-radius: 4px;
  }
}
</style>
