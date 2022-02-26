<template>
  <div class="nav-bar-container">
    <div class="nav-logo">CavinHuang</div>
    <div class="nav-bar-wrap">
      <NavItem v-for="(item, index) in navConfig" :text="item.text" :url="item.url" :key="'navbar' + index"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavItem from './NavItem.vue'
type NavItem = {
  text: string
  url: string
}

const navConfig: NavItem[] = [
  {
    url: '/',
    text: '博客首页'
  },
  {
    url: '/list',
    text: '博客目录'
  },
  {
    url: '/picture',
    text: '图片分享'
  },
  {
    url: '/rss',
    text: '订阅信息'
  }
]
</script>
