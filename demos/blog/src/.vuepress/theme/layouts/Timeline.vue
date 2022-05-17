<template>
  <ParentLayout>
    <template #page>
      <main class="page">
        <h1 class="timeline-title">Timeline</h1>
        <ArticleList :items="timelines.items" />
      </main>
    </template>
  </ParentLayout>
</template>
<script setup lang="ts">
import { useBlogPageType } from "@mr-huang/vuepress-plugin-blog/lib/client";

import ArticleList from "../components/ArticleList.vue";
import ParentLayout from "@vuepress/theme-default/lib/client/layouts/Layout.vue";

const timelines = useBlogPageType("timeline");
</script>
<style lang="scss">
.timeline-title {
  padding: 0;
  text-align: center;
}
</style>
