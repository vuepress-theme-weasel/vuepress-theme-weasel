<template>
  <i v-if="icon" :class="['icon', `${iconPrefix}${icon}`]"></i>
</template>

<script lang="ts" setup>
import { useIconPrefix } from "@theme-weasel/composables";

defineProps({
  icon: String
})

const iconPrefix = useIconPrefix()
</script>
