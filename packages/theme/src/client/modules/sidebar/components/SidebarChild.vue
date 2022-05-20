<template>
  <RenderItem :config="config" :props="{
    class: [
      'sidebar-link',
      `sidebar-${config.type}`,
      {
        active: isActive(config)
      },
    ],
    exact: true
  }" />
  <RenderChildren :config="config.children || []" />
</template>

<script lang="ts" setup>
import { ResolvedThemeSidebarHeaderItem, ResolvedThemeSidebarPageItem } from '../../../../typings';
import { PropType } from 'vue';
import { useRoute } from "vue-router";
import RenderItem from './RenderItem.vue';
import RenderChildren from './RenderChildren.vue';
import { isActiveSidebarItem } from '../utils';

defineProps({
  config: {
    type: Object as PropType<
      ResolvedThemeSidebarPageItem | ResolvedThemeSidebarHeaderItem
    >,
    required: true,
  }
})
const route = useRoute();
const isActive = (child: ResolvedThemeSidebarHeaderItem) => isActiveSidebarItem(route, child, true)
</script>

<style lang="scss" scoped>

</style>
