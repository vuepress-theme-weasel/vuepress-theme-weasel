<template>
  <div class="nav-actions-wrapper">
    <slot name="before"></slot>
    <div class="nav-item">
      <LanguageDropdown />
    </div>
    <RepoLink />
    <OutlookButton />
    <Component v-if="searchComponent" :is="searchComponent" />
    <ToggleNavbarButton :active="showScreen" @toggle="emit('toggleScreen')" />
    <slot name="after"></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, resolveComponent } from 'vue'
import LanguageDropdown from './LanguageDropdown.vue';
import RepoLink from './RepoLink.vue';
import OutlookButton from '../../outlook/components/OutlookButton.vue';
import ToggleNavbarButton from './ToggleNavbarButton.vue'
import { isComponentRegistered } from '@mr-huang/vuepress-shared/lib/client'

const emit = defineEmits(["toggleScreen"])

defineProps({
  showScreen: { type: Boolean, default: false },
})

const searchComponent = computed(() => {
  return isComponentRegistered('Docsearch') ? resolveComponent('Docsearch') : isComponentRegistered('SearchBox') ? resolveComponent('SearchBox') : null
})
</script>

<style lang="scss" scoped>

</style>
