<template>
  <div class="home-page-container">
    <BlogHeader />
    <div class="content-container">
      <Navbar />
      <div class="blog-page-wrapper">
        <main class="blog-home">
          <DropTransition :delay="0.16">
            <div>
              <ArticleContentPage v-if="pageType === 'articleContent'" />
              <div v-if="pageType !== 'articleContent'">
                <ArticleType v-if="pageType === 'ArticleType'" />
                <TagList v-if="pageType === 'TagList'" />
                <CategoryList v-if="pageType === 'CategoryList'" />
                <TimelineItems v-if="pageType === 'timeline'"/>
                <ArticleList id="article-list" :key="route.path" :items="items" :currentPage="currentPage" />
                <Pagination
                  :currentPage="currentPage"
                  :perPage="articlePerPage"
                  :total="items.length"
                  @UpdateCurrentPage="updatePage"
                />
              </div>
            </div>
          </DropTransition>
        </main>
        <DropTransition :delay="0.16">
          <BlogPanel />
        </DropTransition>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { BlogHeader, Navbar } from '../header'
import { DropTransition } from '@theme-weasel/components'
import { useArticles, useCategoryMap, useStars, useTagMap } from '@theme-weasel/composables'
import { BlogPanel } from '../blogInfo'
import { usePageFrontmatter } from '@vuepress/client';
import { BlogFrontmatterOptions, BlogPluginFrontmatter } from '@mr-huang/vuepress-plugin-blog';
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import ArticleContentPage from './ArticleContentPage.vue';
import { ArticleType, TagList, ArticleList, CategoryList, TimelineItems } from '../../components'
import { useBlogOptions } from '../../composables';
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter();
const frontmatter = usePageFrontmatter<BlogPluginFrontmatter>()
const tagMap = useTagMap();
const categoryMap = useCategoryMap();
const stars = useStars();
const articles = useArticles();

const pageType = computed<string>(() => {
  const { key } = frontmatter.value.blog || {}
  console.log('================', key)
  return key === 'category'
        ? 'CategoryList'
        : key === 'tag'
        ? 'TagList'
        : key === 'articleContent'
        ? 'articleContent'
        : key === 'timeline'
        ? 'timeline'
        : key === 'article'
        ? 'ArticleType'
        : key === 'star'
        ? 'ArticleType'
        : 'articleContent'
})

watchEffect(() => {
  console.log(pageType, frontmatter.value.blog)
})

const items = computed(() => {
  const { name = "", key = "" } = (frontmatter.value.blog as BlogFrontmatterOptions) || {};

  return (
    // key === "encrypted"
    // ? encryptedArticles.value.items
    // :
    key === "star"
    ? stars.value.items
    // : key === "slide"
    // ? slides.value.items
    : key === "timeline"
    ? []
    : key === "articleContent"
    ? []
    : key === "category"
    ? name
      ? categoryMap.value.map[name].items
      : []
    : key === "tag"
    ? name
      ? tagMap.value.map[name].items
      : []
    : articles.value.items
  )
})

const blogOptions = useBlogOptions();
const currentPage = ref(1)
const articlePerPage = computed(() => blogOptions.value.articlePerPage)

const updatePage = (page: number): void => {
  currentPage.value = page

  const query = { ...route.query }

  if (query.page === page.toString() || (page === 1 && !query.page)) return
  if (page === 1) delete query.page
  else query.page = page.toString()

  void router.push({ path: route.path, query })
}

watch(currentPage, () => {
  // list top border distance
  const el = document.querySelector("#article-list") as Element
  if (el) {
    const distance = el.getBoundingClientRect().top + window.scrollY

    setTimeout(() => {
      window.scrollTo(0, distance);
    }, 100);
  }
})

onMounted(() => {
  const { page } = route.query
  updatePage(page ? Number(page) : 1);
})

watchEffect(() => {
  console.log(route.path)
})
</script>
