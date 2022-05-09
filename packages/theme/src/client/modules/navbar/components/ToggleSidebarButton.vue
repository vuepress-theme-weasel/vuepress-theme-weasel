<template>
  <button class="toggle-sidebar-button" title="Toggle Sidebar" @click="emit('toggle')">
    <span class="icon"></span>
  </button>
</template>

<script lang="ts" setup>

const emit = defineEmits(['toggle'])

</script>

<style lang="scss" scoped>

</style>
