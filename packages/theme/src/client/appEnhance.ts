/**
 * client 组件注入
 */
import { defineClientAppEnhance } from '@vuepress/client'
import { h } from 'vue'
import { AuthorInfo, DateInfo, ArticleInfo, TagInfo, CategoryInfo, OriginalInfo, ReadingTimeInfo, RecommendList, Pagination } from './components/article'
import { Badge } from './components'
import './styles/index.scss';
export default defineClientAppEnhance(({ app }) => {
  // 注入组件
  app.component('ArticleInfo', ArticleInfo)
  app.component('TagInfo', TagInfo)
  app.component('AuthorInfo', AuthorInfo)
  app.component('DateInfo', DateInfo)
  app.component('CategoryInfo', CategoryInfo)
  app.component('OriginalInfo', OriginalInfo)
  app.component('ReadingTimeInfo', ReadingTimeInfo)
  app.component('RecommendList', RecommendList)
  app.component('Pagination', Pagination)
  app.component('Badge', Badge)

  // compat with vuepress-plugin-comment
  app.component("PageComment", ({ darkmode }: { darkmode?: boolean }) => {
    const CommentService = app.component("CommentService");

    //@ts-ignore
    return CommentService ? h(CommentService, { darkmode }) : null;
  });
})
