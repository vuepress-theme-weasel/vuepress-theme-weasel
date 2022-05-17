/**
 * client 注入
 */
import { setupArticles, setupCategoryMap, setupTagMap, setupStars, setupTimelines } from "./composables";

export const clientAppSetup = () => {
  setupArticles()
  setupCategoryMap()
  setupTagMap()
  setupStars()
  setupTimelines()
}