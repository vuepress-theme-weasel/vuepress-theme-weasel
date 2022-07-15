<template>
  <div class="blogger-info" vocab="https://schema.org" typeof="Person">
    <div class="blogger" v-if="intro" :style="{ cursor: 'pointer' }" :aria-label="locale.intro" data-balloon-pos="down" role="navigation" @click="navigate(intro)">
      <img v-if="bloggerAvatar" class="blogger-avatar" :class="{round: blogOptions.roundAvatar}" :src="withBase(bloggerAvatar)" alt="Blogger Avatar" />
      <div v-if="bloggerName" class="blogger-name" property="name">{{ bloggerName }}</div>
      <div v-if="blogOptions.description" class="blogger-description" v-html="blogOptions.description"></div>
      <meta v-if="intro" property="url" :content="withBase(intro)" />
    </div>
    <div class="num-wrapper">
      <div @click="navigate(articles.path)">
        <div class="num">{{ articles.items.length }}</div>
        <div>{{ locale.article }}</div>
      </div>
      <div @click="navigate(categoryMap.path)">
        <div class="num">{{ Object.keys(categoryMap.map).length }}</div>
        <div>{{ locale.category }}</div>
      </div>
      <div @click="navigate(tagMap.path)">
        <div class="num">{{ Object.keys(tagMap.map).length }}</div>
        <div>{{ locale.tag }}</div>
      </div>
       <div @click="navigate(timelines.path)">
        <div class="num">{{ timelines.items.length }}</div>
        <div>{{ locale.timeline }}</div>
      </div>
    </div>
    <SocialMedia />
  </div>
</template>

<script lang="ts" setup>
import { useSiteLocaleData, withBase } from '@vuepress/client';
import { computed } from 'vue';
import { useBlogOptions } from '../../composables'
import { useArticles, useCategoryMap, useNavigate, useTagMap, useThemeLocaleData, useTimelines } from '@theme-weasel/composables'
import { SocialMedia } from '../panel'
import { getAuthor } from '../../../../utils'

const blogOptions = useBlogOptions();
const siteLocale = useSiteLocaleData();
const themeLocale = useThemeLocaleData();
const articles = useArticles();
const categoryMap = useCategoryMap();
const tagMap = useTagMap();
const timelines = useTimelines();
const navigate = useNavigate();

const locale = computed(() => themeLocale.value.blogLocales);
const intro = computed(() => blogOptions.value.intro);
const bloggerName = computed(
  () =>
    blogOptions.value.name ||
    getAuthor(themeLocale.value.author)[0]?.name ||
    siteLocale.value.title
)
const bloggerAvatar = computed(
  () => blogOptions.value.avatar || themeLocale.value.logo
)
</script>

<style lang="scss" scoped>

</style>
