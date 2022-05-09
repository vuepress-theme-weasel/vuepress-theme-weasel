<template>
  <Transition name="fade" @enter="() => { isLocked = true }" @afterLeave="() => { isLocked = false }">
    <div id="nav-screen" v-if="active">
      <div class="container">
        <slot name="before"></slot>
        <NavScreenLinks />
        <div class="outlook-wrapper">
          <OutlookSettings />
        </div>
        <slot name="after"></slot>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { useMobile } from '@theme-weasel/composables';
import { useScrollLock } from '@vueuse/core';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router'
import { Transition } from 'vue'
import NavScreenLinks from './NavScreenLinks.vue';
import OutlookSettings from '../../outlook/components/OutlookSettings.vue';

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(["close"])

const route = useRoute();
const isMobile = useMobile();

const body = ref<HTMLElement | null>();
const isLocked = useScrollLock(body);

watch(isMobile, (value) => {
  if (!value && props.active) emit("close");
});

watch(
  () => route.path,
  () => {
    isLocked.value = false;
    emit("close");
  }
);

onMounted(() => {
  body.value = document.body;
});

onBeforeUnmount(() => {
  isLocked.value = false;
});

</script>

<style lang="scss" scoped>

</style>
