<template>
  <nav class="nav-screen-links" v-if="navbarConfig.length">
    <div class="navbar-links-item" v-for="(config, index) in navbarConfig" :key="'navbar-links-item' + index ">
      <NavScreenDropdown v-if="'children' in config" :config="config" />
      <AutoLink v-else :config="config" />
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { useNavbarConfig } from '../composables'
import NavScreenDropdown from './NavScreenDropdown.vue';
const navbarConfig = useNavbarConfig();

</script>

<style lang="scss" scoped>

</style>
