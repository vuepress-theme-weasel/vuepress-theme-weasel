<template>
  <div class="appearance-wrapper">
    <label for="appearance-switch" class="appearance-title">{{ locale }}</label>
    <AppearanceSwitchVue />
  </div>
</template>

<script lang="ts" setup>
import { useThemeData, useThemeLocaleData } from '@theme-weasel/composables'
import { computed } from 'vue'
import AppearanceSwitchVue from './AppearanceSwitch.vue';

const themeData = useThemeData();
const themeLocale = useThemeLocaleData();

const locale = computed(() => themeLocale.value.outlookLocales.darkmode);

const darkmode = computed(() => themeData.value.darkmode);

const enable = computed(
  () => darkmode.value === "auto-switch" || darkmode.value === "switch"
);
</script>

<style lang="scss" scoped>

</style>
