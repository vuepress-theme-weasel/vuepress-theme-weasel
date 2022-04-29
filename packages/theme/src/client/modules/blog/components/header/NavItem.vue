<template>
  <div class="nav-bar__item" @click="navigator()">
    <span class="nav-bar__border"></span>
    <span class="nav-bar__border"></span>
    <span class="nav-bar__border"></span>
    <span class="nav-bar__border"></span>
    <h3 class="nav-bar__text">{{ text }}</h3>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';


const props = defineProps({
  text: {
    type: String,
    require: true
  },
  url: {
    type: String,
    default: '/'
  }
})

const router = useRouter()

const navigator = () => {
  router.push({
    path: props.url
  })
}
</script>
