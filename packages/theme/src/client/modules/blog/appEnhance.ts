/**
 * client 组件注入
 */
import { defineClientAppEnhance } from '@vuepress/client'
import { BlogWrapper } from './components'

export default defineClientAppEnhance(({ app }) => {
  app.component('BlogWrapper', BlogWrapper)
})
