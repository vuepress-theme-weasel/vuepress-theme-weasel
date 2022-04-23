/**
 * client 组件注入
 */
import { defineClientAppEnhance } from '@vuepress/client'
import { AuthorInfo, DateInfo, ArticleInfo, TagInfo, CategoryInfo, OriginalInfo, ReadingTimeInfo } from './components/article'
import './styles/index.scss';
export default defineClientAppEnhance(({ app }) => {
  app.component('ArticleInfo', ArticleInfo)
  app.component('TagInfo', TagInfo)
  app.component('AuthorInfo', AuthorInfo)
  app.component('DateInfo', DateInfo)
  app.component('CategoryInfo', CategoryInfo)
  app.component('OriginalInfo', OriginalInfo)
  app.component('ReadingTimeInfo', ReadingTimeInfo)
})
