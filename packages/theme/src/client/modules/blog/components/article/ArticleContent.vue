<template>
  <article class="article-page-container">
    <div class="article-thumb">
      <div class="article-thumb-wrapper">
        <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwallpaperm.cmcm.com%2F5f72d25ba4252610196518b3be3397ac.jpg&refer=http%3A%2F%2Fwallpaperm.cmcm.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650250480&t=62ceed36c38d5cf7f998ec4fd5d33cec" alt="" />
        <CoverIcon class="thumb-icon" />
      </div>
    </div>
    <div class="article-content-container">
      <h1 class="article-title">{{ pageData.title }}</h1>
      <div class="article-info">
        <div class="article-author article-info__item">
          <AuthorIcon />
          <span v-for="(author, index) in pageInfo.author" :key="'author' + index">{{ author.name }}</span>
        </div>
        <div class="article-date article-info__item">
          <CalendarIcon />
          <span>{{ pageInfo.date.display}}</span>
        </div>
      </div>
      <div class="article-content-wrapper">
        <DropTransition :delay="0.16">
          <MarkdownContent :custom="true" />
        </DropTransition>
      </div>
      <div class="article-belong">
        <ArticleInfo v-bind="pageInfoProps"/>
      </div>
    </div>
    <div class="article-footer">
      <PageMeta />
    </div>
  </article>

  <div class="article-nav-container">
    <page-nav />
  </div>

  <div class="article-comment">
    <page-comment />
  </div>
  <div class="article-author-info"><AuthorInfoCard /></div>
  <div class="article-recommend">
    <RecommendList />
  </div>
</template>

<script lang="ts" setup>
import { MarkdownContent, AuthorInfoCard } from '@theme-weasel/components'
import { CoverIcon, AuthorIcon, CalendarIcon } from '../icons'
import { usePageInfo } from "@theme-weasel/composables"
import { PageTitleProps } from '../../../../../typings'
import { DropTransition, PageMeta, PageNav } from '@theme-weasel/components'
import { usePageData } from '@vuepress/client'

const pageInfo = usePageInfo()
const pageData = usePageData()
const pageInfoProps: PageTitleProps = {...pageInfo, ...{ author: false, date: false }}

</script>

<style lang="scss" scoped src="../../styles/article-info.scss"></style>
