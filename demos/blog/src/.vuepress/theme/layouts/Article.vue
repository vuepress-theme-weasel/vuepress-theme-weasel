<template>
  <ParentLayout>
    <template #page>
      <main class="page">
        <ArticleList :items="articles.items" />
      </main>
    </template>
  </ParentLayout>
</template>
<script setup lang="ts">
import { useBlogPageType } from "@mr-huang/vuepress-plugin-blog/lib/client";

import ArticleList from "../components/ArticleList.vue";
import ParentLayout from "@vuepress/theme-default/lib/client/layouts/Layout.vue";

const articles = useBlogPageType("article");
</script>
