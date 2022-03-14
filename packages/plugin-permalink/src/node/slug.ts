import { getCreatedTime } from './getCreateTime';
import { logger, isDate, parseDate } from './utils';
import { PermaLinkPluginConfig } from './../typings/options';
import { Page, App } from '@vuepress/core';
import { checkGitRepo } from './checkGitRepo';
import path from 'path'

/**
 *
 * @param $page
 * @param formate
:year	文章的发表年份（4 位数）
:month	文章的发表月份（2 位数）
:i_month	文章的发表月份（去掉开头的零）
:day	文章的发表日期 (2 位数)
:i_day	文章的发表日期（去掉开头的零）
:hour	文章发表时的小时 (2 位数)
:minute	文章发表时的分钟 (2 位数)
:second	文章发表时的秒钟 (2 位数)
:title	文件名称 (relative to “source/_posts/“ folder)
:name	文件名称
:post_title	文章标题
:id	文章 ID (not persistent across cache reset)
:category	分类。如果文章没有分类，则是 default_category 配置信息。
:hash	SHA1 hash of filename (same as :title) and date (12-hexadecimal)
:slugify 拼音生成
 */
export const gennerSlugify = async ($page: Page, app: App, pluginOptions?: PermaLinkPluginConfig) => {
  const cwd = app.dir.source()
  const isGitRepoValid = checkGitRepo(cwd)
  if (pluginOptions) {
    const { format, options } = pluginOptions
    // 含有时间的参数
    if (/year|mouth|day|hour|minute|second/ig.test(format)) {
      if (!isGitRepoValid || $page.filePath === null || $page.path === '/') {
        return
      }
      try {
        const createTime = await getCreatedTime($page.filePath, cwd)
        logger.info(`当前文件的createTime=>${createTime}`)
        if (createTime) {
          const date = new Date(createTime)
          if (isDate(date)) {
            // 是时间时处理
            const { year, month, i_month, day, i_day, hour, minute, second } = parseDate(date)
            const { key: id, filePathRelative: title, title: post_title } = $page
            const name = title ? path.basename(title, '.md') : ''
            const category = $page.frontmatter && $page.frontmatter.category ? (Array.isArray($page.frontmatter.category) && $page.frontmatter.category.length ? $page.frontmatter.category[0] : $page.frontmatter.category): ''

            let _path = format.replace(/:year/ig, year).replace(/:month/ig, month).replace(/:i_month/ig, i_month).replace(/:day/ig, day).replace(/:i_day/ig, i_day).replace(/:hour/ig, hour).replace(/:minute/ig, minute).replace(/:second/ig, second).replace(/:id/ig, id).replace(/:title/ig, title || '').replace(/:post_title/ig, post_title).replace(/:name/ig, name).replace(/:category/ig, category)
            let suffix = '.html'
            if (_path.indexOf('.') > -1) {
              suffix = ''
            }
            const routePath = '/' + _path + suffix
            $page.path = routePath
            $page.data.path = routePath
            $page.pathInferred = routePath
            logger.info(`路径匹配后的地址${$page.path}=>${routePath}`)
          }
        }
      } catch (e) {
        throw e
      }
    }
  }
}
