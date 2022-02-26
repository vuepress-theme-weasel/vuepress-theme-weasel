<template>
  <div class="header-nav">
    <div class="header-menu-logo">{{ menuLogo }}</div>
  </div>
</template>

<script lang="ts" setup>

defineProps({
  menuLogo: {
    type: String,
    default: ''
  }
})
</script>
