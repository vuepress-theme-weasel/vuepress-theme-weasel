<template>
  <div class="project-page">
    <div :class="[
      'theme-container',
      {
        'no-navbar': !enableNavbar,
        'no-sidebar': !enableSidebar && !(slots.sidebar || slots.sidebarTop || slots.sidebarBottom),
        'has-toc': enableToc,
        'hide-navbar': hideNavbar,
        'sidebar-open': isMobile ? isMobileSidebarOpen : isDesktopSidebarOpen,
      }
    ]">
      <Navbar @toggleSidebar="toggleMobileSidebar()">
        <slot name="navbarLeft" slot="left"></slot>
        <slot name="navbarCenter" slot="center"></slot>
        <slot name="navbarRight" slot="right"></slot>
        <slot name="navScreenTop" slot="screenTop"></slot>
        <slot name="navScreenBottom" slot="screenBottom"></slot>
      </Navbar>
      <ProjectHome v-if="isHome" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, useSlots, watch } from 'vue'
import { useMobile, usePageFrontmatter, useThemeLocaleData } from '../composables'
import { ProjectHome } from '@theme-weasel/modules/project/components'
import { usePageData } from '@vuepress/client'
import { useSidebarItems } from '../modules/sidebar/composables';
import { useEventListener } from '@vueuse/core';
import debounce from 'lodash.debounce';
import { useRouter } from "vue-router";
import { Navbar } from '@theme-weasel/modules/navbar/components'

const page = usePageData()
const frontmatter = usePageFrontmatter()
const isHome = computed(() => frontmatter.value.home)
const themeLocale = useThemeLocaleData()
const isMobile = useMobile()
const router = useRouter()
const slots = useSlots()

// navbar
const hideNavbar = ref(false);
const enableNavbar = computed(() => {

  if (
    frontmatter.value.navbar === false ||
    themeLocale.value.navbar === false
  )
    return false

  return Boolean(
    page.value.title ||
    themeLocale.value.logo ||
    themeLocale.value.repo ||
    themeLocale.value.navbar
  )
})

// sidebar
const sidebarItems = useSidebarItems();
const enableSidebar = computed(() => {
  return (
    frontmatter.value.sidebar !== false &&
    sidebarItems.value.length !== 0 &&
    !frontmatter.value.home
  )
})

const isMobileSidebarOpen = ref(false)
const isDesktopSidebarOpen = ref(true)
const toggleMobileSidebar = (value?: boolean): void => {
  isMobileSidebarOpen.value =
    typeof value === "boolean" ? value : !isMobileSidebarOpen.value;
};
const toggleDesktopSidebar = (value?: boolean): void => {
  isDesktopSidebarOpen.value =
    typeof value === "boolean" ? value : !isDesktopSidebarOpen.value;
}
const touchStart = { x: 0, y: 0 };
const onTouchStart = (e: TouchEvent): void => {
  touchStart.x = e.changedTouches[0].clientX;
  touchStart.y = e.changedTouches[0].clientY;
};
const onTouchEnd = (e: TouchEvent): void => {
  const dx = e.changedTouches[0].clientX - touchStart.x;
  const dy = e.changedTouches[0].clientY - touchStart.y;

  if (
    // horizontal swipe
    Math.abs(dx) > Math.abs(dy) * 1.5 &&
    Math.abs(dx) > 40
  ) {
    if (dx > 0 && touchStart.x <= 80) toggleMobileSidebar(true);
    else toggleMobileSidebar(false);
  }
};

const enableToc = computed(
  () =>
    frontmatter.value.toc || (themeLocale.value.toc !== false && frontmatter.value.toc !== false)
)

/** Get scroll distance */
const getScrollTop = (): number =>
  window.pageYOffset ||
  document.documentElement.scrollTop ||
  document.body.scrollTop ||
  0;

// close sidebar after navigation
let unregisterRouterHook: () => void;
let lastDistance = 0;

useEventListener('scroll', () => debounce(() => {
  const distance = getScrollTop();
  // scroll down
  if (lastDistance < distance && distance > 58) {
    if (!isMobileSidebarOpen.value) hideNavbar.value = true;
  } else {
    // scroll up
    hideNavbar.value = false;
  }
  lastDistance = distance;
  // @ts-ignore
}, 300, { isImmediate: true })())

watch(isMobile, (value) => {
  if (!value) toggleMobileSidebar(false);
});

onMounted(() => {
  unregisterRouterHook = router.afterEach((): void => {
    toggleMobileSidebar(false);
  });
});

onUnmounted(() => {
  unregisterRouterHook();
});

</script>

<style lang="scss" scoped>

</style>
