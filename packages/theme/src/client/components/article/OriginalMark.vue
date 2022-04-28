<template>
  <span v-if="isOriginal" class="origin">
    {{ pageInfoLocale.origin }}
  </span>
</template>

<script lang="ts" setup>
import { useLocaleConfig } from '@mr-huang/vuepress-shared/lib/client'
import { articleInfoLocales } from '../../define'

defineProps({
  isOriginal: { type: Boolean, default: false },
})

const pageInfoLocale = useLocaleConfig(articleInfoLocales)

</script>

<style lang="scss" scoped>

</style>
