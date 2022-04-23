/**
 * client 组件注入
 */
import { defineClientAppEnhance } from '@vuepress/client'
import { BlogWrapper, BlogHome, BlogPage } from './components'

import './styles/index.scss'

export default defineClientAppEnhance(({ app }) => {
  app.component('BlogWrapper', BlogWrapper)
  app.component('BlogHome', BlogHome)
  app.component('BlogPage', BlogPage)
})
