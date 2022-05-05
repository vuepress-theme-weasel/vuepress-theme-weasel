<template>
  <div
    class="article-item-image-wrapper"
    :style="{
      width: '100%',
      height: '200px',
      maxHeight: '200px',
      backgroundImage: `url(\'${url}\')`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundSize: 'contain'
    }"
  >
    <!-- <img class="article-item-image" :src="url" :alt="title" /> -->
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
  max-height: 180px;
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
  .article-item-image {
    height: 100%;
    width: 100%;
    max-height: 180px;
    object-fit: cover;
  }
}
</style>
