<template>
  <div class="recomment-list">
    <div class="recommand-list-title">热门文章推荐</div>
    <div class="recommend-list-articles">
      <div class="recommend-article" v-for="(article, index) in starts.items" :key="'recomand' + index">
        <div class="article-summay">{{ getText(article.info.excerpt) }}</div>
        <div class="article-title">{{ article.info.title }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStars } from '@theme-weasel/composables';

const starts = useStars()

const getText = (str: string) => {
  const div = document.createElement('div')
  div.innerHTML = str
  return div.innerText
}

console.log(starts)
</script>

<style lang="scss" scoped>

</style>
