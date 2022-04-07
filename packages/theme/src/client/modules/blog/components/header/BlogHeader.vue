<template>
  <header class="header-container">
    <BannerNav :menu-logo="title" />
    <Banner :title="title" />
  </header>
</template>
<script lang="ts" setup>
import { useSiteLocaleData } from '@vuepress/client'
import Banner from './Banner.vue'
import BannerNav from './HeaderNav.vue'

const title = useSiteLocaleData().value.title
</script>
