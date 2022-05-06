<template>
  <div class="fullscreen-wrapper" v-if="isSupported">
    <label class="full-screen-title" for="full-screen-switch">{{ fullscreenLocale }}</label>
    <button class="full-screen" id="full-screen-switch" :aria-pressed="isFullscreen" @click="toggle()">
      <CancelFullScreenIcon v-if="isFullscreen" />
      <EnterFullScreenIcon v-else />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useThemeLocaleData } from '@theme-weasel/composables'
import { useFullscreen } from "@vueuse/core";
import { computed } from 'vue'
import {
  CancelFullScreenIcon,
  EnterFullScreenIcon,
} from './icons'

const themeLocale = useThemeLocaleData();
const { isSupported, isFullscreen, toggle } = useFullscreen();

const fullscreenLocale = computed(
  () => themeLocale.value.outlookLocales.fullscreen
);
</script>

