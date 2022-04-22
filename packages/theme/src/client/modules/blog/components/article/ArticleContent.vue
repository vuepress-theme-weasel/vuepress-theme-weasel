<template>
  <article class="article-page-container">
    <div class="article-thumb">
      <div class="article-thumb-wrapper">
        <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwallpaperm.cmcm.com%2F5f72d25ba4252610196518b3be3397ac.jpg&refer=http%3A%2F%2Fwallpaperm.cmcm.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650250480&t=62ceed36c38d5cf7f998ec4fd5d33cec" alt="" />
        <CoverIcon class="thumb-icon" />
      </div>
    </div>
    <div class="article-content-container">
      <h1 class="article-title">最刺激的历险记</h1>
      <div class="article-info">
        <div class="article-author article-info__item">
          <AuthorIcon />
          <span>cavinHuang</span>
        </div>
        <div class="article-date article-info__item">
          <CalendarIcon />
          <span>2022.05.16</span>
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
  <div class="article-author-info">这里放作者的详细介绍</div>
  <div class="article-recommend">这里放推荐的文章</div>
</template>

<script lang="ts" setup>
import { MarkdownContent } from '@theme-weasel/components'
import { CoverIcon, AuthorIcon, CalendarIcon } from '../icons'
import { ArticleInfo } from '@mr-huang/vuepress-plugin-components/lib/client'
import { usePageInfo } from "@theme-weasel/composables";
import { PageTitleProps } from '@mr-huang/vuepress-plugin-components';
import { DropTransition, PageMeta, PageNav } from '@theme-weasel/components'

const pageInfoProps: PageTitleProps = {...usePageInfo(), ...{ author: false, date: false }};

console.log(pageInfoProps)
</script>

<style lang="scss" scoped src="../../styles/article-info.scss"></style>
