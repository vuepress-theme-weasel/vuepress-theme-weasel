<template>
  <ClientOnly>
    <ThemeColorVue v-if="enableThemeColor" />
    <AppearanceModeVue v-if="enableDarkmode" />
    <ToggleFullScreenButtonVue v-if="enableFullScreen" />
    <PureButtonVue v-if="enablePure" />
  </ClientOnly>
</template>

<script lang="ts" setup>
import { ClientOnly } from "@vuepress/client";
import { useThemeData, usePure } from '@theme-weasel/composables'
import { computed } from 'vue'
import ThemeColorVue from "./ThemeColor.vue";
import AppearanceModeVue from "./AppearanceMode.vue";
import ToggleFullScreenButtonVue from "./ToggleFullScreenButton.vue";
import PureButtonVue from "./PureButton.vue";

const themeData = useThemeData();
const pure = usePure();

const enableDarkmode = computed(
  () =>
    themeData.value.darkmode !== "disable" &&
    themeData.value.darkmode !== "force-dark"
);

const enableThemeColor = computed(
  () => !pure.value && Boolean(themeData.value.themeColor)
);

const enableFullScreen = computed(
  () => !pure.value && themeData.value.fullscreen
);

const enablePure = computed(() => !pure.value && themeData.value.pure)
</script>

<style lang="scss" scoped>

</style>
