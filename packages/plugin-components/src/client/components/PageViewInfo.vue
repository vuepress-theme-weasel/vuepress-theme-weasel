<template>
  <span v-if="pageview" class="visitor-info" :aria-lable="pageInfoLocale.views" v-bind="hint !== false ? { 'data-balloon-pos': 'down' } : {}">
    <EyeIcon v-if="pageViews > 1000" />
    <FireIcon v-else />
    <span class="waline-visitor-count" :id="typeof pageview === 'string' ? pageview : withBase(route.path)">...</span>
  </span>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { EyeIcon, FireIcon } from './Icons'
import { articleInfoLocales } from '../define'
import { withBase } from '@vuepress/client'
import { useLocaleConfig } from '@mr-huang/vuepress-shared/lib/client'
import { onMounted, ref, watch } from 'vue'

defineProps({
  hint: {
    type: Boolean,
    default: true
  },
  pageview: {
    type: [Boolean, String],
    default: true
  }
})

const route = useRoute();
const pageInfoLocale = useLocaleConfig(articleInfoLocales)

const pageViews = ref(0)
// show fire icon depending on the views number
const getCount = (): void => {
  const countElement = document.querySelector(".waline-visitor-count")
  if (countElement) {
    const count = countElement.textContent
    if (count && !isNaN(Number(count))) pageViews.value = Number(count)
    else setTimeout(getCount, 500)
  }
}
onMounted(() => {
  setTimeout(getCount, 1500)
})
watch(() => route.path, (newValue: string, oldValue: string) => {
  if (newValue !== oldValue) setTimeout(getCount, 500)
})
</script>

<style lang="scss" scoped>

</style>
