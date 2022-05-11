<template>
  <nav class="nav-links" v-if="navbarConfig.length">
    <div class="nav-item hide-in-mobile" v-for="(config, index) in navbarConfig" :key="'navbar' + index">
      <template v-if="'children' in config">
        <DropdownLink :config="config" />
      </template>
      <AutoLink v-else :config="config" />
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { useNavbarConfig } from "../composables";
import DropdownLink from "./DropdownLink.vue";
import { AutoLink } from "@theme-weasel/components";

const navbarConfig = useNavbarConfig();

</script>

<style lang="scss" scoped>

</style>
