<template>
  <div class="category-card">
    <header class="category-card-title">博客分类</header>
    <ul class="category-list">
      <li
        v-for="(category, index) in Object.keys(categoryMap.map)"
        :class="[
          'category-item',
          `category${index % 9}`,
          { active: currentItem(category).path === route.path }
        ]"
      >
        <RouterLink :to="currentItem(category).path">
          <span class="category-title">{{ capitalize(category) }}</span>
          <span class="category-number">{{ currentItem(category).items.length }}</span>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useCategoryMap } from '@theme-weasel/composables'
import { RouterLink, useRoute } from 'vue-router'
import { capitalize } from '@mr-huang/vuepress-shared/lib/client'

const route = useRoute()
const categoryMap = useCategoryMap()

function currentItem(category: string) {
  return categoryMap.value.map[category]
}
</script>

<style lang="scss" scoped>
.category-card {
  margin-bottom: 16px;
  padding: 8px 0;
  border-radius: 8px;
  -webkit-box-shadow: 0 1px 3px 0 var(--card-shadow);
  box-shadow: 0 1px 3px 0 var(--card-shadow);
  background: var(--bg-color);
  padding: 0 16px;
  .category-card-title {
    font-size: 18px;
    text-align: center;
    font-weight: 600;
    border-bottom: 1px solid #dedede;
    line-height: 42px;
  }
  .category-list {
    padding: 0;
    margin: 0;
    padding-bottom: 16px;
    list-style: none;
    .category-item {
      border-bottom: 1px solid #dedede;
      list-style: none;
      a {
        line-height: 32px;
        display: flex;
        flex-wrap: nowrap;
        span {
          display: block;
        }
        .category-title {
          flex: 1;
        }
        .category-number {
          width: 60px;
          text-align: right;
          color: rgba($color: #000000, $alpha: 0.6)
        }
      }
    }
  }
}
</style>
