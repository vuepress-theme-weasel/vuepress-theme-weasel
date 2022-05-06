<template>
  <button id="appearance-switch" @click="toggleDarkMode">
    <AutoIcon :style="{ display: status === 'auto' ? 'block' : 'none' }" />
    <DarkIcon :style="{ display: status === 'dark' ? 'block' : 'none' }" />
    <LightIcon :style="{ display: status === 'light' ? 'block' : 'none' }" />
  </button>
</template>

<script lang="ts" setup>
import { useThemeData } from '@theme-weasel/composables'
import { useDarkMode, DarkmodeStatus } from '../composables'
import {
  AutoIcon,
  DarkIcon,
  LightIcon,
} from './icons'
import { computed } from 'vue'

const themeData = useThemeData();
const { status } = useDarkMode();

const darkmode = computed(() => themeData.value.darkmode);

const toggleDarkMode = (): void => {
  if (darkmode.value === "auto-switch") {
    status.value = (
      { light: "dark", dark: "auto", auto: "light" } as Record<DarkmodeStatus, DarkmodeStatus>
    )[status.value];
  } else status.value = status.value === "light" ? "dark" : "light";
};
</script>

<style lang="scss" scoped>

</style>
