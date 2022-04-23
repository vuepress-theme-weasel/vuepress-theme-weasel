/**
 * client 组件注入
 */
import { defineClientAppEnhance } from '@vuepress/client'
import { AuthorInfo, DateInfo, CategoryInfo, OriginalInfo, ReadingTimeInfo } from './components/article'
import './styles/index.scss';
export default defineClientAppEnhance(({ app }) => {
  app.component('AuthorInfo', AuthorInfo)
  app.component('DateInfo', DateInfo)
  app.component('CategoryInfo', CategoryInfo)
  app.component('OriginalInfo', OriginalInfo)
  app.component('ReadingTimeInfo', ReadingTimeInfo)
})
