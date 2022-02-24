<template>
  <header class="header-container">
    <BannerNav :menu-logo="title" />
    <Banner :title="title" />
  </header>
</template>
<script lang="ts" setup>
import { useSiteData } from '@vuepress/client'
import Banner from './Banner.vue'
import BannerNav from './HeaderNav.vue'

const title = useSiteData().value.title
</script>
