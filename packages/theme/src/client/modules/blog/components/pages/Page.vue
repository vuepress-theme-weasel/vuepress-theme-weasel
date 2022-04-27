<template>
  <div class="home-page-container">
    <BlogHeader />
    <div class="content-container">
      <Navbar />
      <div class="blog-page-wrapper">
        <main class="blog-home">
          <DropTransition :delay="0.16">
            <ArticleContent />
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
import { ArticleContent } from '../article'
import { BlogPanel } from '../blogInfo'

</script>
