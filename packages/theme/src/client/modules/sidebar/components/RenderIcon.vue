<template>
  <i v-if="icon" :class="['icon', `${useIconPrefix()}${icon}`]"></i>
</template>

<script lang="ts" setup>
import { useIconPrefix } from "@theme-weasel/composables";

defineProps({
  icon: String
})
</script>
