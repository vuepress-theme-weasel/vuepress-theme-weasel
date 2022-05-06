<template>
  <div class="fullscreen-wrapper">
    <label class="full-screen-title" for="full-screen-switch">{{ pureLocale }}</label>
    <button class="full-screen" id="full-screen-switch" :aria-pressed="isPure" @click="toggle()">
      <PureOnIcon v-if="!isPure" />
      <PureOffIcon v-else />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useThemeLocaleData } from '@theme-weasel/composables'
import { computed, ref } from 'vue'
import {
  PureOnIcon,
  PureOffIcon,
} from './icons'

const themeLocale = useThemeLocaleData();
const isPure = ref(false)

const toggle = () => {
  isPure.value = !isPure.value
}

const pureLocale = computed(
  () => themeLocale.value.outlookLocales!.pure
);
</script>

