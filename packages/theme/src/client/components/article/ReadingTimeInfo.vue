<template>
  <div>
  </div>
</template>

<script lang="ts" setup>

defineProps({
  readingTime: {
    type: Object as PropType<ReadingTime | null>,
    default: () => null,
  },

  hint: {
    type: Boolean,
    default: true,
  },
})
</script>

<style lang="scss" scoped>

</style>
