<template>
  <RouterLink :to="{ siteBrandLink }" class="home-link">
    <img v-if="siteBrandLogo" :src="siteBrandLogo" :alt="siteBrandTitle" :class="[ 'logo', {light: Boolean(siteBrandLogoDark)} ]" />
    <img v-else-if="siteBrandLogoDark" :src="siteBrandLogoDark" :alt="siteBrandTitle" :class="[ 'logo', 'dark']" />
    <span v-else :class="['site-name', { 'hide-in-pad': siteBrandLogo }]">
      <slot>{{siteBrandTitle}}</slot>
    </span>
  </RouterLink>
</template>

<script lang="ts" setup>
import { useThemeLocaleData } from '@theme-weasel/composables';
import { useRouteLocale, useSiteLocaleData, withBase } from '@vuepress/client';
import { computed } from 'vue';
import { RouterLink } from 'vue-router'

const routeLocale = useRouteLocale();
const siteLocale = useSiteLocaleData();
const themeLocale = useThemeLocaleData();

const siteBrandLink = computed(
  () => themeLocale.value.home || routeLocale.value
);

const siteBrandTitle = computed(() => siteLocale.value.title);

const siteBrandLogo = computed(() =>
  themeLocale.value.logo ? withBase(themeLocale.value.logo) : null
);

const siteBrandLogoDark = computed(() =>
  themeLocale.value.logoDark ? withBase(themeLocale.value.logoDark) : null
);

</script>

<style lang="scss" scoped>

</style>
