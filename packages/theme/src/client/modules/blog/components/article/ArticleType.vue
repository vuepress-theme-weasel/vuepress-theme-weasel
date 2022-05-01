<template>
  <ul class="article-type-wrapper">
    <li v-for="(type, index) in types" :key="'article-type' + index" class="article-type" :class="{ active: type.path === route.path }">
      <RouterLink :to="type.path">{{ type.text }}</RouterLink>
    </li>
  </ul>
  <ArticleList id="article-list" :key="route.path" :items="articles.items" :currentPage="currentPage" />
  <Pagination
    :currentPage="currentPage"
    :perPage="articlePerPage"
    :total="articles.items.length"
    @UpdateCurrentPage="updatePage"
  />
</template>

<script lang="ts" setup>
import { useThemeLocaleData, useArticles, useStars } from "@theme-weasel/composables";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { computed, onMounted, ref, watch } from "vue";
import { useBlogOptions } from "../../composables";
import { ArticleList } from '../article'

const themeLocale = useThemeLocaleData();
const route = useRoute();
const router = useRouter();
const articles = useArticles();
// const encryptedArticles = useEncryptedArticles();
// const slides = useSlides();
const stars = useStars();
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

</script>
