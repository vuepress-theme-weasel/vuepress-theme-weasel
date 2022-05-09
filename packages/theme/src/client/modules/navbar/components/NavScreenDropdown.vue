<template>
  <button :class="['nav-screen-dropdown-title', { active: open }]" type="button" :aria-label="dropdownAriaLabel" @click="() => { open = !open }">
    <span class="title">
      <i v-if="config.icon" :class="`icon ${iconPrefix}${config.icon}`"></i>
      {{ config.text }}
    </span>
    <span :class="['arrow', open ? 'down' : 'right']"></span>
  </button>
  <ul :class="['nav-screen-dropdown', { hide: !open }]">
    <template v-if="'children' in child">
      <li class="dropdown-item" v-for="(child, index) in config.children" :key="'dropdown-item' + index">
      <h4 class="dropdown-subtitle">
        <AutoLink v-if="child.link" :config="child" @focusout="() => {
          if (
            isLastItemOfArray(child, config.value.children) &&
            child.children.length === 0
          ) {
            open.value = false;
          }
        }" />
        <span v-else>{{ child.text }}</span>
      </h4>
      <ul class="dropdown-subitem-wrapper">
        <li class="dropdown-subitem">
          <AutoLink :config="grandchild" @focusout="() => {
            if (
              isLastItemOfArray(grandchild, child.children) &&
              isLastItemOfArray(child, config.children)
            ) {
              open.value = false;
            }
          }" />
        </li>
      </ul>
    </li>
    </template>
    <AutoLink :config="child" @focusout="() => {
      if (isLastItemOfArray(child, config.children)) {
        open = false;
      }
    }"/>
  </ul>
</template>

<script lang="ts" setup>
import { ThemeNavGroup, AutoLink as AutoLinkType } from '../../../../typings';
import { computed, PropType, ref, toRef, watch } from 'vue';
import { useRoute } from 'vue-router'
import { useIconPrefix } from '@theme-weasel/composables';
import { AutoLink } from '@theme-weasel/components'

const props = defineProps({
  config: {
    type: Object as PropType<
      ThemeNavGroup<AutoLinkType | ThemeNavGroup<AutoLinkType>>
    >,
    required: true,
  },
})

const route = useRoute();
const iconPrefix = useIconPrefix();
const config = toRef(props, "config");

const dropdownAriaLabel = computed(
  () => config.value.ariaLabel || config.value.text
);

const open = ref(false);

watch(
  () => route.path,
  () => {
    open.value = false;
  }
);

const isLastItemOfArray = <T>(item: T, arr: T[]): boolean => arr[arr.length - 1] === item;
</script>

<style lang="scss" scoped>

</style>
