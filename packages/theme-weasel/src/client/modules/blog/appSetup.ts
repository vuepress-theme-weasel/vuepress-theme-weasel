import { defineClientAppSetup } from '@vuepress/client'

import { setupBlog, setupStars } from './composables'

export default defineClientAppSetup(() => {
  setupBlog()
  setupStars()
})
