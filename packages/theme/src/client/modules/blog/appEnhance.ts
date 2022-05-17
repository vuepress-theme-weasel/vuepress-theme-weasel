/**
 * client 组件注入
 */
import { App } from 'vue'
import { BlogWrapper, BlogHome, BlogPage } from './components'

import './styles/index.scss'

export const clientEnhance = (app: App) => {
  app.component('BlogWrapper', BlogWrapper)
  app.component('BlogHome', BlogHome)
  app.component('BlogPage', BlogPage)
}