<template>
  <div class="blog-info-list">
    <div class="switch-wrapper">
      <button class="switch-button" v-for="(item, index) in buttons" :key="item.key">
        <div class="icon-wapper">
          <component :is="item.icon" />
        </div>
      </button>
    </div>

    <DropTransition>
      <div class="sticky-article-wrapper">
        <div class="title">
          <component :is="ArticleIcon"></component>
          <span class="num">18</span>
          文章
        </div>
        <hr />
        <ul class="sticky-article-list">
          <DropTransition :delay="0.08 * (0 + 1)">
            <li class="sticky-article">文章1</li>
          </DropTransition>
        </ul>
      </div>
    </DropTransition>

    <DropTransition v-if="active === 'category'">
      <div class="category-wrapper">
        <div class="title">
          <component :is="CategoryIcon"></component>
          <span class="num">20</span>
          分类
        </div>
        <hr />
        <DropTransition :delay="0.04">
          分类列表
        </DropTransition>
      </div>
    </DropTransition>

    <DropTransition v-if="active === 'tag'">
      <div class="tag-wrapper">
        <div class="title">
          <component :is="TagIcon"></component>
          <span class="num">20</span>
          标签
        </div>
        <hr />
        <DropTransition :delay="0.04">
          标签列表
        </DropTransition>
      </div>
    </DropTransition>

    <DropTransition v-if="active === 'timeline'">
      时间线列表
    </DropTransition>
  </div>
</template>
<script lang="ts" setup>
import { ref, FunctionalComponent } from 'vue'
import { DropTransition } from '@theme-weasel/components'
import {
  ArticleIcon,
  CategoryIcon,
  TagIcon,
  TimelineIcon,
} from "../icons"

const buttons: {
  key: "article" | "category" | "tag" | "timeline",
  icon: FunctionalComponent
}[] = [
  {key: 'article', icon: ArticleIcon},
  {key: 'category', icon: CategoryIcon},
  {key: 'tag', icon: TagIcon},
  {key: 'timeline', icon: TimelineIcon},
]

const active = ref('article')
</script>
