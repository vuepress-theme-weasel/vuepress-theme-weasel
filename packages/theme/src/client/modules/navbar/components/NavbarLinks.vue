<template>
  <nav class="nav-links" v-if="navbarConfig.length">
    <div class="nav-item hide-in-mobile" v-for="(config, index) in navbarConfig" :key="'navbar' + index">
      
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { useNavbarConfig } from "../composables";

const navbarConfig = useNavbarConfig();

</script>

<style lang="scss" scoped>

</style>
