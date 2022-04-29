<template>
  <div class="home-page-container">
    <BlogHeader />
    <div class="content-container">
      <Navbar />
      <div class="blog-page-wrapper">
        <main class="blog-home">
          <DropTransition :delay="0.16">
            <Features />
          </DropTransition>
          <DropTransition :delay="0.24">
            <div>
              <ArticleList id="article-list" :items="articles.items" :currentPage="currentPage" />
              <Pagination
                :currentPage="currentPage"
                :perPage="articlePerPage"
                :total="articles.items.length"
                @UpdateCurrentPage="updatePage"
              />
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
import { useArticles } from '@theme-weasel/composables'
import { Features } from '../feature'
import { ArticleList } from '../article'
import { BlogPanel } from '../blogInfo'
import { computed, onMounted, ref, watch } from 'vue'
import { useBlogOptions } from '../../composables'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute();
const router = useRouter();

const articles = useArticles()
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

</script>
