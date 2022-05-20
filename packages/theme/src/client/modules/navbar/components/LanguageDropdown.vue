<template>
  <DropdownLink v-if="dropdown" class="i18n-dropdown" :config="dropdown">
    <template #title>
      <I18nIcon :aria-label="dropdown.ariaLabel" :style="{width: '1rem', height: '1rem', verticalAlign: 'middle',}"></I18nIcon>
    </template>
  </DropdownLink>
</template>

<script lang="ts" setup>
import { useNavbarLanguageDropdown } from '../composables';
import DropdownLink from './DropdownLink.vue';
import { I18nIcon } from './icons'

const dropdown = useNavbarLanguageDropdown();

</script>

<style lang="scss" scoped>

</style>
