<template>
  <ul class="article-type-wrapper">
    <li v-for="(type, index) in types" :key="'article-type' + index" class="article-type" :class="{ active: type.path === route.path }">
      <RouterLink :to="type.path">{{ type.text }}</RouterLink>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { useThemeLocaleData, useArticles, useStars } from "@theme-weasel/composables";
import { RouterLink, useRoute } from "vue-router";
import { computed } from "vue";

const themeLocale = useThemeLocaleData();
const route = useRoute();
const articles = useArticles();
// const encryptedArticles = useEncryptedArticles();
// const slides = useSlides();
const stars = useStars();

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
