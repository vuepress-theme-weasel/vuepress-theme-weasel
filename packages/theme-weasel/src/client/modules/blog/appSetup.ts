import { defineClientAppSetup } from '@vuepress/client'

import { setupBlog } from './composables'

export default defineClientAppSetup(() => {
  setupBlog()
})
