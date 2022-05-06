<template>
  <ul id="themecolor-picker">
    <li>
      <span class="theme-color" @click="setThemeColor()"></span>
    </li>
    <li v-for="([color, value], index) in Object.entries(props.themeColor)" :key="'theme-color' + index">
      <span :style="{ background: value }" @click="setThemeColor(color)"></span>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { PropType, computed, onMounted } from 'vue'
import { useThemeData } from '@theme-weasel/composables'

const props = defineProps({
  themeColor: {
    type: Object as PropType<Record<string, string>>,
    default: () => ({}),
  }
})

const themeData = useThemeData();

const themeColor = computed(() => {
  const { themeColor } = themeData.value;

  return themeColor === false ? null : themeColor;
});

const setThemeColor = (theme = ""): void => {
  if (themeColor.value) {
    const classes = document.documentElement.classList;
    const themes = Object.keys(themeColor.value).map(
      (color) => `theme-${color}`
    );

    if (!theme) {
      localStorage.removeItem("theme");
      classes.remove(...themes);

      return;
    }

    classes.remove(
      ...themes.filter((themeclass) => themeclass !== `theme-${theme}`)
    );

    classes.add(`theme-${theme}`);
    localStorage.setItem("theme", theme);
  }
};

onMounted(() => {
  const theme = localStorage.getItem("theme");

  if (theme) setThemeColor(theme);
});
</script>

<style lang="scss" scoped>

</style>
