<template>
  <div :class="['dropdown-wrapper', { open }]">
    <button class="dropdown-title" type="button" :aria-label="dropdownAriaLabel" @click="handleDropdown">
      <slot name="title">
        <span class="title">
          <i v-if="config.icon" :class="`icon ${iconPrefix}${config.icon}`"/>
          {{ config.text }}
        </span>
      </slot>
      <span class="arrow" />
      <ul class="nav-dropdown">
        <li class="dropdown-item" v-for="(child, index) in config.children" :key="'dropdown-item' + index">
          <template v-if="'children' in child">
            <h4 class="dropdown-subtitle">
              <AutoLink v-if="child.link" :config="child" @focusout="() => {
                if (
                  isLastItemOfArray(
                    child,
                    config.value.children
                  ) &&
                  child.children.length === 0
                ) {
                  open.value = false
                }
              }" />
              <span v-else>{{ child.text }}</span>
            </h4>
            <ul class="dropdown-subitem-wrapper">
              <li class="dropdown-subitem" v-for="(grandchild, idx) in child.children" :key="'dropdown-subitem' + idx">
                <AutoLink :config="grandchild" @focusout="() => {
                  if (
                    isLastItemOfArray(
                      grandchild,
                      child.children
                    ) &&
                    isLastItemOfArray(
                      child,
                      config.children
                    )
                  ) {
                    open.value = false;
                  }
                }" />
              </li>
            </ul>
          </template>
          <AutoLink v-else :config="child" @focusout="() => {
            if (isLastItemOfArray(child, config.children)) {
              open.value = false;
            }
          }" />
        </li>
      </ul>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ThemeNavGroup, AutoLink as AutoLinkType } from '../../../../typings';
import { computed, PropType, ref, toRef, watch } from 'vue';
import { useRoute } from 'vue-router'
import { useIconPrefix } from '@theme-weasel/composables';
import { AutoLink } from '@theme-weasel/components'

const props = defineProps({
  config: {
    type: Object as PropType<ThemeNavGroup<AutoLinkType | ThemeNavGroup<AutoLinkType>>>,
    required: true,
  }
})

const route = useRoute();
const iconPrefix = useIconPrefix();
const config = toRef(props, "config");

console.log('cion', iconPrefix)

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

/**
 * Open the dropdown when user tab and click from keyboard.
 *
 * Use event.detail to detect tab and click from keyboard.
 * The Tab + Click is UIEvent > KeyboardEvent, so the detail is 0.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail
 */
const handleDropdown = (event: MouseEvent): void => {
  const isTriggerByTab = event.detail === 0;

  if (isTriggerByTab) open.value = !open.value;
};

const isLastItemOfArray = <T>(item: T, arr: T[]): boolean => arr[arr.length - 1] === item;

</script>

<style lang="scss" scoped>

</style>
