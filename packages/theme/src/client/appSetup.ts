/**
 * client 注入
 */
import { defineClientAppSetup } from '@vuepress/client'
import { setupArticles, setupCategoryMap, setupTagMap, setupStars } from "./composables";

export default defineClientAppSetup(() => {
  setupArticles()
  setupCategoryMap()
  setupTagMap()
  setupStars()
})
