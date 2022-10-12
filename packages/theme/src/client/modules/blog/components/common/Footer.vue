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
    <div class="footer">
      <p v-if="footer">{{ footer }}</p>
      <a href="https://beian.miit.gov.cn">粤ICP备2022100010号-1</a>
      <div style="width:300px;margin:0 auto; padding:20px 0;">
        <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030602007137"
          style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img src="https://www.beian.gov.cn/img/ghs.png" style="float:left;" />
          <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">粤公网安备 44030602007137号</p>
        </a>
    </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { usePageFrontmatter } from '@theme-weasel/composables'

const frontmatter = usePageFrontmatter()
const footer = frontmatter.value.footer || ''

</script>
