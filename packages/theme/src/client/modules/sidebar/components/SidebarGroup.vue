<template>
  <section class="sidebar-group">
    <button
      v-if="config.collapsable"
      :class="[
        'sidebar-heading',
        {
          clickable: config.collapsable || link,
          exact: exact,
          active: active,
        }]"
      @click="emit('toggle')"
      @keydown="keydown()"
    >
      <RenderIcon :icon="config.icon" />
      <RouterLink v-if="config.link" :to="config.link" class="title"> {{ config.text }} </RouterLink>
      <span v-else class="title">{{ config.text }}</span>
      <span :class="['arrow', props.open ? 'down' : 'right']"></span>
    </button>
    <p
      v-else
      :class="[
        'sidebar-heading',
        {
          clickable: config.collapsable || link,
          exact: exact,
          active: active,
        }
      ]"
    >
      <RenderIcon :icon="config.icon" />
      <RouterLink v-if="config.link" :to="config.link" class="title"> {{ config.text }} </RouterLink>
      <span v-else class="title">{{ config.text }}</span>
    </p>
    <DropTransition>
      <SidebarLink v-if="open || !config.collapsable" :config="config.children" />
    </DropTransition>
  </section>
</template>

<script lang="ts" setup>
import { ResolvedThemeSidebarGroupItem } from '../../../../typings';
import { computed, PropType } from 'vue';
import { useRoute, RouterLink } from 'vue-router'
import { isActiveSidebarItem } from '../utils';
import RenderIcon from './RenderIcon.vue';
import { DropTransition } from '@theme-weasel/components'
import SidebarLink from './SidebarLink.vue';

const props = defineProps({
  config: {
    type: Object as PropType<ResolvedThemeSidebarGroupItem>,
    required: true,
  },
  open: { type: Boolean, required: true },
})

const emit = defineEmits(['toggle'])

const route = useRoute();
const active = computed(() => isActiveSidebarItem(route, props.config));

const exact = computed(() =>
  isActiveSidebarItem(route, props.config, true)
)
const keydown = (event: KeyboardEvent): void => {
  if (event.key === "Enter") emit("toggle");
}

</script>

<style lang="scss" scoped>

</style>
