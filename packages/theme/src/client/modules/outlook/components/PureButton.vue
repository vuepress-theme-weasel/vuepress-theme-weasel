<template>
  <div class="fullscreen-wrapper">
    <label class="full-screen-title" for="full-screen-switch">{{ pureLocale }}</label>
    <button class="full-screen" id="full-screen-switch" :aria-pressed="status" @click="toggle()">
      <PureOnIcon v-if="!status" />
      <PureOffIcon v-else />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useThemeLocaleData } from '@theme-weasel/composables'
import { computed } from 'vue'
import { usePureMode } from '../composables';
import {
  PureOnIcon,
  PureOffIcon,
} from './icons'

const themeLocale = useThemeLocaleData();
const { status } = usePureMode()

const toggle = () => {
  status.value = !status.value
}

const pureLocale = computed(
  () => themeLocale.value.outlookLocales!.pure
);
</script>

