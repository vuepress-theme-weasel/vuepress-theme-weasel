/**
 * client 注入
 */
import { defineClientAppSetup } from '@vuepress/client'
import { setupArticles, setupCategoryMap, setupTagMap } from "./composables";

export default defineClientAppSetup(() => {
  setupArticles()
  setupCategoryMap()
  setupTagMap()
})
