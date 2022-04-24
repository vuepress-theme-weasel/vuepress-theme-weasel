/**
 * client 注入
 */
import { defineClientAppSetup } from '@vuepress/client'
import { setupSidebarItems } from './composables'

export default defineClientAppSetup(() => {
  setupSidebarItems()
})
