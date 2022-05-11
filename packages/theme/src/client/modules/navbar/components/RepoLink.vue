<template>
  <div class="nav-item" v-if="repo">
    <a class="repo-link" :href="repo.link" target="_blank" rel="noopener noreferrer">
      <component :is="resolveComponent(`${repo.type}Icon`)" :style="{width: '1.25rem', height: '1.25rem', verticalAlign: 'middle'}"/>
    </a>
  </div>
</template>

<script lang="ts">
import { resolveComponent, defineComponent } from 'vue'
import { useNavbarRepo } from '../composables';
import {
  BitbucketIcon,
  GiteeIcon,
  GitHubIcon,
  GitlabIcon,
  SourceIcon,
} from "./icons"


export default defineComponent({
  components: {
    BitbucketIcon,
    GiteeIcon,
    GitHubIcon,
    GitlabIcon,
    SourceIcon,
  },
  setup() {
    const repo = useNavbarRepo();

    return {
      repo,
      resolveComponent
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
