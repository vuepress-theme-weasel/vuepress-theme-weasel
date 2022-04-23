<template>
  <span v-if="isOriginal" class="origin">
    {{ pageInfoLocale.origin }}
  </span>
</template>

<script lang="ts" setup>
import { useLocaleConfig } from '@theme-weasel/composables'
import { articleInfoLocales } from '../../define'

defineProps({
  isOriginal: { type: Boolean, default: false },
})

const pageInfoLocale = useLocaleConfig(articleInfoLocales)

</script>

<style lang="scss" scoped>

</style>
