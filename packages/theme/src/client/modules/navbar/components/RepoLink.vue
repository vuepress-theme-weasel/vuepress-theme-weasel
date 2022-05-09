<template>
  <div class="nav-item" v-if="repo">
    <a class="repo-link" :href="repo.link" target="_blank" rel="noopener noreferrer">
      <Component :is="resolveComponent(`${repo.value.type}Icon`)" :style="{width: "1.25rem", height: "1.25rem", verticalAlign: "middle"}"/>
    </a>
  </div>
</template>

<script lang="ts" setup>
import { Component } from 'vue'
import { useNavbarRepo } from '../composables';
import {
  BitbucketIcon,
  GiteeIcon,
  GitHubIcon,
  GitlabIcon,
  SourceIcon,
} from "./icons"

const repo = useNavbarRepo();

</script>

<style lang="scss" scoped>

</style>
