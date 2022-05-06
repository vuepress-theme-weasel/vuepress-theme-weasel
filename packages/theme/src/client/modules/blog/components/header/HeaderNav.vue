<template>
  <div class="header-nav">
    <div class="header-menu-logo">{{ menuLogo }}</div>
    <div class="header-navbar-wrapper">
      <OutlookButton />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { OutlookButton } from '@theme-weasel/modules/outlook/components'


defineProps({
  menuLogo: {
    type: String,
    default: ''
  }
})
</script>
