/**
 * client 组件注入
 */
import { defineClientAppEnhance } from '@vuepress/client'
import { BlogWrapper, BlogHome } from './components'

import './styles/index.scss'

export default defineClientAppEnhance(({ app }) => {
  app.component('BlogWrapper', BlogWrapper)
  app.component('BlogHome', BlogHome)
})
