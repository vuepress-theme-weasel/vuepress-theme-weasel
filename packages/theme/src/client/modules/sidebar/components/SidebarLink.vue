<template>
  <ul class="sidebar-links">
    <li v-for="(conf, index) in config" :key="'sidebar-link' + index">
      <SidebarGroup v-if="conf.type === 'group'" :config="conf" :open="index === openGroupIndex" @toggle="toggleGroup(index)" />
      <SidebarChild v-else :config="conf" />
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { ResolvedSidebarItem } from '../../../../typings';
import { PropType, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { resolveOpenGroupIndex } from '../utils';
import SidebarGroup from './SidebarGroup.vue';
import SidebarChild from './SidebarChild.vue';

const props = defineProps({
  config: {
    type: Array as PropType<ResolvedSidebarItem[]>,
    required: true,
  }
})

const route = useRoute();
const openGroupIndex = ref(-1);

const toggleGroup = (index: number): void => {
  openGroupIndex.value = index === openGroupIndex.value ? -1 : index;
};

watch(
  () => [route.path, props.config],
  (): void => {
    const index = resolveOpenGroupIndex(route, props.config);

    openGroupIndex.value = index;
  },
  { immediate: true }
);

</script>

<style lang="scss" scoped>

</style>
