<template>
  <section class="hero-main">
    <div>
      <img src="/logo.png" alt="hero" style="max-width: 200px; width: 100%; display: block; margin: 0px auto 2rem; border-radius: 1rem; transition: transform 0.25s ease-in-out 0.04s, opacity 0.25s ease-in-out 0.04s; transform: translateY(0px); opacity: 1;">
      <p class="description" style="transition: transform 0.25s ease-in-out 0.08s, opacity 0.25s ease-in-out 0.08s; transform: translateY(0px); opacity: 1;">一款简洁而优雅的 vuepress 博客 &amp; 文档 主题。</p>
      <div style="transition: transform 0.25s ease-in-out 0.12s, opacity 0.25s ease-in-out 0.12s; transform: translateY(0px); opacity: 1;">
      <a target="_black" href="https://github.com/vuepress-reco/vuepress-theme-reco">
        <img alt="GitHub license" src="https://img.shields.io/github/license/vuepress-reco/vuepress-theme-reco?&amp;logo=github">
      </a>
      <a target="_black" href="https://github.com/vuepress-reco/vuepress-theme-reco">
        <img alt="GitHub stars" src="https://img.shields.io/github/stars/vuepress-reco/vuepress-theme-reco?style=flat&amp;logo=github" />
      </a>
      <a target="_black" href="https://github.com/vuepress-reco/vuepress-theme-reco">
        <img alt="GitHub forks" src="https://img.shields.io/github/forks/vuepress-reco/vuepress-theme-reco?style=flat&amp;logo=github">
      </a>
      <a target="_black" href="https://www.npmjs.com/package/vuepress-theme-reco">
        <img alt="Npm downloads" src="https://img.shields.io/npm/dt/vuepress-theme-reco?style=flat&amp;logo=npm">
      </a>
      <a target="_black" href="https://www.npmjs.com/package/vuepress-theme-reco">
        <img alt="Npm version" src="https://img.shields.io/npm/v/vuepress-theme-reco.svg?style=flat&amp;logo=npm&amp;label=version"></a>
      </div>
      <a href="/views/other/about" class="btn-about" style="transition: transform 0.25s ease-in-out 0.16s, opacity 0.25s ease-in-out 0.16s; transform: translateY(0px); opacity: 1;">About</a>
    </div>
  </section>
  <HomeFeature />
</template>

<script lang="ts" setup>
import { HomeFeature } from '../feature'
</script>

<style lang="scss" scoped>
.hero-main {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin: 0 auto;
  width: 100%;
  height: calc(100vh - 3.4rem);
  min-height: 452px;
  overflow: hidden;
  text-align: center;
  background: url(../../../../../../templates/assets/bg.svg) 50%/cover no-repeat;
  .description {
    font-size: 20px;
    margin-bottom: 2rem;
  }
  .btn-about {
    margin: 2rem 0;
    display: inline-block;
    padding: 0.6rem 1.2rem;
    border-radius: 0.25rem;
    background: #3eaf7c;
    color: #fff;
    font-size: 1rem;
  }
}
</style>
