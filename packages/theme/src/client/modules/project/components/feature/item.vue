<template>
  <template v-if="feature.link">
      <a v-if="isLinkExternal(feature.link)" class="feature link" :href="feature.link" role="navigation" target="_blank">
      <img v-if="isLinkHttp(feature.icon)" :src="feature.icon" class="icon" alt="" />
      <img v-else-if="feature.icon.startsWith('/')" :src="withBase(feature.icon)" class="icon" alt="" />
      <span v-else-if="feature.icon" :class="['icon', `${iconPrefix}${feature.icon}`]"></span>
      <h2 v-html="feature.title"></h2>
      <p v-html="feature.details"></p>
    </a>
    <RouterLink class="feature link" :to="feature.link" role="navigation">
      <img v-if="isLinkHttp(feature.icon)" :src="feature.icon" class="icon" alt="" />
      <img v-else-if="feature.icon.startsWith('/')" :src="withBase(feature.icon)" class="icon" alt="" />
      <span v-else-if="feature.icon" :class="['icon', `${iconPrefix}${feature.icon}`]"></span>
      <h2 v-html="feature.title"></h2>
      <p v-html="feature.details"></p>
    </RouterLink>
  </template>
  <div v-else class="feature">
    <img v-if="isLinkHttp(feature.icon)" :src="feature.icon" class="icon" alt="" />
    <img v-else-if="feature.icon.startsWith('/')" :src="withBase(feature.icon)" class="icon" alt="" />
    <span v-else-if="feature.icon" :class="['icon', `${iconPrefix}${feature.icon}`]"></span>
    <h2 v-html="feature.title"></h2>
    <p v-html="feature.details"></p>
  </div>
</template>

<script lang="ts" setup>
import { ThemeProjectHomePageFrontmatter } from '../../../../../typings/frontmatter/home';
import { PropType } from 'vue';
import { isLinkExternal, isLinkHttp } from "@vuepress/shared";
import { useIconPrefix } from '@theme-weasel/composables';
import { RouterLink } from 'vue-router'

const props = defineProps({
  feature: {
    type: Object as PropType<ThemeProjectHomePageFrontmatter>
  }
})
const iconPrefix = useIconPrefix()

</script>

<style lang="scss" scoped>

</style>
