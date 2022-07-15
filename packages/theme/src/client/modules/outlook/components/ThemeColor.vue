<template>
  <div class="themecolor-wrapper">
    <label class="themecolor-title" for="theme-color-picker">{{ locale }}</label>
    <ThemeColorPickerVue :themeColor="themeColor" />
  </div>
</template>

<script lang="ts" setup>
import { useThemeData, useThemeLocaleData } from '@theme-weasel/composables'
import { computed } from 'vue'
import ThemeColorPickerVue from './ThemeColorPicker.vue';

const themeData = useThemeData();
const themeLocale = useThemeLocaleData();

const locale = computed(() => themeLocale.value.outlookLocales.themeColor);

const themeColor = computed(() => {
  const { themeColor } = themeData.value;

  return themeColor === false ? null : themeColor;
});

</script>

<style lang="scss" scoped>

</style>
