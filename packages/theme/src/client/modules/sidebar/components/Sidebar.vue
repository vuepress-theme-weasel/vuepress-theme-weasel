<template>
  <aside :class="['sidebar', { 'hide-icon': !themeLocale.sidebarIcon }]">
    <slot name="top"></slot>
    <slot>
      <SidebarLink :config="sidebarItems" />
    </slot>
    <slot name="bottom"></slot>
  </aside>
</template>

<script lang="ts" setup>
import { useThemeLocaleData } from '@theme-weasel/composables';
import { useSidebarItems } from '../composables';
import SidebarLink from './SidebarLink.vue';

const themeLocale = useThemeLocaleData()
const sidebarItems = useSidebarItems()

</script>

<style lang="scss" scoped>

</style>
