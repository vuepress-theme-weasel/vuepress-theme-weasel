<template>
  <div v-if="enableDarkmode || enableFullScreen || enableThemeColor" class="nav-item hide-in-mobile">
    <AppearanceSwitchVue v-if="enableDarkmode && !enableFullScreen && !enableThemeColor" />
    <ToggleFullScreenButtonVue v-else-if="enableFullScreen && !enableDarkmode && !enableThemeColor" />
    <button v-else :class="['outlook-button', { open: open.value }]" tabindex="-1" aria-hidden="true">
      <OutlookIcon />
      <div class="outlook-dropdown">
        <OutlookSettingsVue />
      </div>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useFullscreen } from "@vueuse/core";
import { useThemeData, usePure } from '@theme-weasel/composables'
import { useRoute } from "vue-router";
import { ref, computed, watch } from "vue";
import AppearanceSwitchVue from "./AppearanceSwitch.vue";
import ToggleFullScreenButtonVue from "./ToggleFullScreenButton.vue";
import OutlookSettingsVue from "./OutlookSettings.vue";
import { OutlookIcon } from './icons'

const { isSupported } = useFullscreen()
const themeData = useThemeData()
const pure = usePure()
const route = useRoute()
const open = ref(false)

 const enableDarkmode = computed(
  () =>
    themeData.value.darkmode !== "disable" &&
    themeData.value.darkmode !== "force-dark"
);

const enableThemeColor = computed(
  () => !pure.value && Boolean(themeData.value.themeColor)
);

const enableFullScreen = computed(
  () => !pure.value && themeData.value.fullscreen && isSupported
);

watch(
  () => route.path,
  () => {
    open.value = false;
  }
);

</script>

<style lang="scss" scoped>

</style>
