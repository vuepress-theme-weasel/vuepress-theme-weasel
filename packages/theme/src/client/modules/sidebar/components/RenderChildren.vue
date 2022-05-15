<template>
  <ul class="sidebar-sub-headers">
    <li class="sidebar-sub-header" v-for="(child, index) in children" :key="'sidebar-sub' + index">
      <RenderItem :config="child" :props="{
        class: ['sidebar-link', 'heading', { active: isActive(child)}]
      }"/>
      <RenderChildren :config="child.children" />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RenderChildren'
})
</script>

<script lang="ts" setup>
import { ResolvedThemeSidebarHeaderItem } from '../../../../typings';
import { computed, PropType } from 'vue';
import { useRoute } from '@vuepress/client';
import RenderItem from './RenderItem.vue'
import { isActiveSidebarItem } from '../utils';

defineProps({
  children: {
    type: Object as PropType<ResolvedThemeSidebarHeaderItem[]>,
    default: () => ([])
  }
})

const route = useRoute();
const isActive = (child: ResolvedThemeSidebarHeaderItem) => computed(() => isActiveSidebarItem(route, child, true))

</script>

<style lang="scss" scoped>

</style>
