<template>
  <footer class="footer-container">
    <div class="footer-content">
      <div class="footer-logo">CavinHuang</div>
      <div class="footer-center"></div>
      <div class="footer-right">
        <div class="contact-item">
          <img src="" alt="">
        </div>
      </div>
    </div>
    <div class="footer">{{ footer }}</div>
  </footer>
</template>

<script lang="ts" setup>
import { usePageFrontmatter } from '@theme-weasel/composables'

const frontmatter = usePageFrontmatter()
const footer = frontmatter.value.footer || ''

</script>
