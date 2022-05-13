<template>
  <AutoLink v-if="config.link" v-bind="{...props, config: config}"></AutoLink>
  <p v-else v-bind="props">
    <RenderIcon :icon="config.icon" />
    {{ config.text }}
  </p>
</template>

<script lang="ts" setup>
import { ResolvedSidebarItem } from '../../../../typings';
import { PropType, VNode } from 'vue';
import { AutoLink } from "@theme-weasel/components";
import RenderIcon from './RenderIcon.vue';

defineProps({
  config: {
    type: Object as PropType<ResolvedSidebarItem>
  },
  props: {
    type: Object as PropType<VNode["props"]>
  }
})
</script>

<style lang="scss" scoped>

</style>
