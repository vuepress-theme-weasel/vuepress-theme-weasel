<template>
  <div class="nav-bar__item">
    <span class="nav-bar__border"></span>
    <span class="nav-bar__border"></span>
    <span class="nav-bar__border"></span>
    <span class="nav-bar__border"></span>
    <h3 class="nav-bar__text">{{ text }}</h3>
  </div>
</template>

<script lang="ts" setup>

defineProps({
  text: {
    type: String,
    require: true
  },
  url: {
    type: String,
    default: '/'
  }
})
</script>
