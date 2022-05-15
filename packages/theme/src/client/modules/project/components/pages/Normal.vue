<template>
  <main class="page" id="main-content">
    <slot name="top"></slot>
    <BreadCrumb />
    <PageTitle />
    <Toc v-if="tocEnable" :headerDepth="frontmatter.headerDepth ?? themeLocale.themeLocale" />
    <slot name="contentBefore"></slot>
    <MarkdownContent />
    <slot name="contentAfter"></slot>
    <PageMeta />
    <PageNav />
    <page-comment :darkmode="isDarkMode" />
    <slot name="bottom"></slot>
  </main>
</template>

<script lang="ts" setup>
import { useThemeLocaleData } from '@theme-weasel/composables';
import { useDarkMode } from '@theme-weasel/modules/outlook/composables';
import { usePageFrontmatter } from '@vuepress/client';
import { computed } from 'vue';
import { ThemeNormalPageFrontmatter } from '../../../../../typings';
import { BreadCrumb, Toc, MarkdownContent, PageMeta, PageNav } from '@theme-weasel/components'
import PageTitle from './PageTitle'

const frontmatter = usePageFrontmatter<ThemeNormalPageFrontmatter>();
const { isDarkMode } = useDarkMode();
const themeLocale = useThemeLocaleData();

const tocEnable = computed(
  () =>
    frontmatter.value.toc ||
    (frontmatter.value.toc !== false && themeLocale.value.toc !== false)
);
</script>

<style lang="scss" scoped>

</style>
