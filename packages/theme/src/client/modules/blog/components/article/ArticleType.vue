<template>
  <ul class="article-type-wrapper">
    <li v-for="(type, index) in types" :key="'article-type' + index" class="article-type" :class="{ active: type.path === route.path }">
      <RouterLink :to="type.path">{{ type.text }}</RouterLink>
    </li>
  </ul>
  <ArticleList id="article-list" :key="route.path" :items="items" :currentPage="currentPage" />
  <Pagination
    :currentPage="currentPage"
    :perPage="articlePerPage"
    :total="items.length"
    @UpdateCurrentPage="updatePage"
  />
</template>

<script lang="ts" setup>
import { useThemeLocaleData, useArticles, useStars, useCategoryMap, useTagMap } from "@theme-weasel/composables";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { computed, onMounted, ref, watch } from "vue";
import { useBlogOptions } from "../../composables";
import { ArticleList } from '../article'
import { usePageFrontmatter } from "@vuepress/client";
import { BlogFrontmatterOptions, BlogPluginFrontmatter } from "@mr-huang/vuepress-plugin-blog";

const frontmatter = usePageFrontmatter<BlogPluginFrontmatter>();
const themeLocale = useThemeLocaleData();
const route = useRoute();
const router = useRouter();
const articles = useArticles();
const tagMap = useTagMap();
// const encryptedArticles = useEncryptedArticles();
// const slides = useSlides();
const stars = useStars();
const categoryMap = useCategoryMap();

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
  const distance =
    (document.querySelector("#article-list") as Element).getBoundingClientRect().top + window.scrollY

  setTimeout(() => {
    window.scrollTo(0, distance);
  }, 100);
})

onMounted(() => {
  const { page } = route.query
  updatePage(page ? Number(page) : 1);
})

const types = computed(() => {
  const locale = themeLocale.value.blogLocales!;

  return [
    {
      text: locale.all,
      path: articles.value.path,
    },
    { text: locale.star, path: stars.value.path },
    // { text: locale.slides, path: slides.value.path },
    // { text: locale.encrypt, path: encryptedArticles.value.path },
  ];
});

const items = computed(() => {
  const { name = "", key = "" } =
    (frontmatter.value.blog as BlogFrontmatterOptions) || {};

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

console.log(items)

</script>
