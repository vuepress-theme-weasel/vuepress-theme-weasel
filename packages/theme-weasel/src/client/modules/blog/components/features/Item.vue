<template>
  <div class="feature">
    <h2>{{ title }}</h2>
    <p>{{ details }}</p>
  </div>
</template>

<script lang="ts" setup>

defineProps({
  title: {
    type: String,
    default: ''
  },
  details: {
    type: String,
    default: ''
  }
})
</script>
