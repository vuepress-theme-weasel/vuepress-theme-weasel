<template>
  <div class="recomment-list">
    <div class="recommand-list-title">热门文章推荐</div>
    <div class="recommend-list-articles">
      <div class="recommend-article" v-for="(article, index) in starts.items" :key="'recomand' + index" @click="navigetor(article.path)">
        <div class="article-summay">
          <div class="article-summay-content">
            {{ article.info.excerpt ? getText(article.info.excerpt) : article.info.title}}
          </div>
        </div>
        <div class="article-title">{{ article.info.title }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStars } from '@theme-weasel/composables';
import { useRouter } from 'vue-router';

const starts = useStars()

const getText = (str: string) => {
  const ref = /(?<=>)[^<>]+(?=<)/g
  const res = str.match(ref)
  return res ? res.join('<br />') : ''
}

const router = useRouter()
const navigetor = (path: string) => {
  router.push({
    path
  })
}

</script>

<style lang="scss" scoped>

</style>
