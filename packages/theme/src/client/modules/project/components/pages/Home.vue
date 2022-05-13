<template>
  <main class="home project" id="main-content">
    <HomeHero />
    <div class="home-container">
      <div class="home-content">
        <HomeFeature />
        <MarkdownContent />
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import HomeHero from '../hero/HomeHero.vue';
import { HomeFeature } from '../feature'
import { MarkdownContent } from '@theme-weasel/components'

</script>

<style lang="scss" scoped>
.home-container {
  display: flex;
  justify-content: center;
}
.home-content {
  max-width: 1160px;
}
</style>
