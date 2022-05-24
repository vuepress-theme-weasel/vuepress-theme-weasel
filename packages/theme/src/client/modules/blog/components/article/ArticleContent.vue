<template>
  <article class="article-page-container">
    <div class="article-thumb">
      <div class="article-thumb-wrapper" v-if="config.cover">
        <img :src="config.cover" :alt="pageData.title" />
        <CoverIcon class="thumb-icon" />
      </div>
    </div>
    <div class="article-content-container">
      <h1 class="article-title">{{ pageData.title }}</h1>
      <div class="article-info">
        <div class="article-author article-info__item">
          <AuthorIcon />
          <span v-for="(author, index) in config.author" :key="'author' + index">{{ author.name }}</span>
        </div>
        <div class="article-date article-info__item" v-if="config.date">
          <CalendarIcon />
          <span>{{ config.date.display}}</span>
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

const { config } = usePageInfo()
const pageData = usePageData()
const pageInfoProps: PageTitleProps = {...config, ...{ author: false, date: false }}

</script>

<style lang="scss" scoped src="../../styles/article-info.scss"></style>
