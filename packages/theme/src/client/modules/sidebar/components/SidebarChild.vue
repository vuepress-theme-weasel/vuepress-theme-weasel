<template>
  <RenderItem :config="config" :props="{
    class: [
      "sidebar-link",
      `sidebar-${props.config.type}`,
      {
        active: isActiveSidebarItem(route, props.config, true),
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

const props = defineProps({
  config: {
    type: Object as PropType<
      ResolvedThemeSidebarPageItem | ResolvedThemeSidebarHeaderItem
    >,
    required: true,
  }
})
const route = useRoute();

</script>

<style lang="scss" scoped>

</style>
