<template>
  <button
    :class="['toggle-navbar-button', { 'is-active': active }]"
    aria-label="Toggle Navbar"
    :aria-expanded="active"
    aria-controls="nav-screen"
    @click="emit('toggle')"
  >
    <span class="button-container">
      <span class="button-top"></span>
      <span class="button-middle"></span>
      <span class="button-bottom"></span>
    </span>
  </button>
</template>

<script lang="ts" setup>

defineProps({
  active: {
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits(["toggle"])

</script>
