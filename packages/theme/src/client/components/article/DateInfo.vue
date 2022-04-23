<template>
  <span v-if="date" class="date-info" :aria-label="pageInfoLocale.date" v-bind="hint !== false ? { 'data-balloon-pos': 'down' } : {}">
    <CalendarIcon />
    <span>{{ date && date.display }}</span>
    <meta property="datePublished" :content="date?.value?.toISOString() || ''"/>
  </span>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { DateInfo } from '@mr-huang/vuepress-shared'
import { useLocaleConfig } from '@theme-weasel/composables'
import { articleInfoLocales } from '../../define'
import { CalendarIcon } from './Icons'

defineProps({
  date: {
    type: [Object, Boolean] as PropType<DateInfo | null | false>,
    default: null,
  },

  hint: {
    type: Boolean,
    default: true,
  },
})

const pageInfoLocale = useLocaleConfig(articleInfoLocales)
</script>

<style lang="scss" scoped>

</style>
