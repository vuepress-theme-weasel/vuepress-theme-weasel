<template>
  <header class="['navbar', {
    'auto-hide': autoHide,
    'hide-icon': !themeLocale.navbarIcon,
  }]"
  ref="navbar"
  >
    <ToggleFullScreenButton @toggle="sidebarToggle" />
    <NavbarBrand ref="siteBrand">
      <slot name="left"></slot>
    </NavbarBrand>
    <NavbarLinks :style="linksWrapperStyle" />
    <NavActions :showScreen="showScreen" @toggleScreen="() => { showScreen = !showScreen; }">
      <slot name="before" slot="before"></slot>
      <slot name="after" slot="after"></slot>
    </NavActions>
  </header>
  <NavScreen
    :active="showScreen"
    @close="() => { showScreen = false }"
  >
    <slot name="screenTop" slot="before"></slot>
    <slot name="screenBottom" slot="after"></slot>
  </NavScreen>
</template>

<script lang="ts" setup>
import { useMobile, useThemeLocaleData } from '@theme-weasel/composables';
import { computed, ref } from 'vue';
import ToggleFullScreenButton from './ToggleFullScreenButton.vue';
import NavbarBrand from './NavbarBrand.vue';
import NavbarLinks from './NavbarLinks.vue';
import NavActions from './NavActions.vue';
import NavScreen from './NavScreen.vue';

const emit = defineEmits(['toggle-sidebar'])

const themeLocale = useThemeLocaleData();

const isMobile = useMobile();
const showScreen = ref(false);

const navbar = ref<HTMLElement>();
const siteBrand = ref<HTMLElement>();

const linksWrapperMaxWidth = ref(0);
const linksWrapperStyle = computed(() => {
  if (!linksWrapperMaxWidth.value) return {};

  return {
    "max-width": `${linksWrapperMaxWidth.value}px`,
  };
});

const autoHide = computed(() => {
  const { navbarAutoHide } = themeLocale.value;

  return (
    navbarAutoHide !== "none" &&
    (navbarAutoHide === "always" || isMobile.value)
  );
});

const sidebarToggle = () => {
  if (showScreen.value) showScreen.value = false;
  emit("toggle-sidebar");
}
</script>

<style lang="scss" scoped>

</style>
