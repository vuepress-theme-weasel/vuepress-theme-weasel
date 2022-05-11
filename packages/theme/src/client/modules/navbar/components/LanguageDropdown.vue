<template>
  <DropdownLink v-if="dropdown" class="i18n-dropdown" :config="dropdown">
    <I18nIcon slot="title" :aria-label="dropdown.ariaLabel" :style="{width: '1rem', height: '1rem', verticalAlign: 'middle',}"></I18nIcon>
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
