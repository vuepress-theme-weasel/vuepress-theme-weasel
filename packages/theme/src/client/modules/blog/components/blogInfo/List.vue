<template>
  <div class="blog-info-list">
    <div class="switch-wrapper">
      <button class="switch-button" v-for="item in buttons" :key="item.key" @click="active = item.key">
        <div :class="['icon-wapper', { active: active === item.key }]" :aria-label="locale[item.key]">
          <component :is="item.icon" color="rgba(255, 255, 255, 0.6)"/>
        </div>
      </button>
    </div>

    <DropTransition v-if="active === 'article'">
      <div class="sticky-article-wrapper">
        <div class="title" @click="navigate(articles.path)">
          <component :is="ArticleIcon"></component>
          <span class="num">{{ articles.items.length }}</span>
          {{ locale.article }}
        </div>
        <hr />
        <ul class="sticky-article-list">
          <DropTransition v-for="({ info, path }, index) in stars.items" :delay="0.08 * (index + 1)" :key="'article-item' + index">
            <li class="sticky-article" @click="navigate(path)">{{ info.title }}</li>
          </DropTransition>
        </ul>
      </div>
    </DropTransition>

    <DropTransition v-if="active === 'tag'">
      <div class="tag-wrapper">
        <div class="title" @click="navigate(tagMap.path)">
          <component :is="TagIcon"></component>
          <span class="num">{{ tagNumber }}</span>
          {{ locale.tag }}
        </div>
        <hr />
        <DropTransition :delay="0.04">
          <TagList />
        </DropTransition>
      </div>
    </DropTransition>

    <DropTransition v-if="active === 'timeline'">
      时间线列表
    </DropTransition>
  </div>
</template>
<script lang="ts" setup>
import { ref, FunctionalComponent, computed } from 'vue'
import { DropTransition } from '@theme-weasel/components'
import {
  ArticleIcon,
  TagIcon,
  TimelineIcon,
} from "../icons"
import { useNavigate, useTagMap, useStars, useArticles, useThemeLocaleData } from '@theme-weasel/composables'
import TagList from './TagList.vue'

const buttons: {
  key: "article" | "tag" | "timeline",
  icon: FunctionalComponent
}[] = [
  { key: 'article', icon: ArticleIcon },
  { key: 'tag', icon: TagIcon },
  { key: 'timeline', icon: TimelineIcon }
]
const themeLocale = useThemeLocaleData()
const active = ref('article')
const articles = useArticles()
const stars = useStars()
const tagMap = useTagMap()
const tagNumber = computed(() => Object.keys(tagMap.value.map).length);
const navigate = useNavigate()
const locale = computed(() => themeLocale.value.blogLocales)

</script>
