import { SlugifyOption } from './../typings/slugify';
import { slugify } from 'transliteration'
import type { Page, Plugin } from '@vuepress/core'

const slugifyPlugin = ($page: Page, pluginConfig: SlugifyOption) => {
  // $page.path was encoded by VuePress already.
  // Make sure original so I decode it once.
  const pathArr = decodeURIComponent($page.path).split('/')
  // https://github.com/andyhu/transliteration#slugifystr-options
  const options = Object.assign({}, pluginConfig, { ignore: ['/', '.'] })
  $page.path = pathArr.map(str => slugify(str, options)).join('/')
}

const datePlugin = ($page: Page, formate: string) => {

}

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
const customerPlugin = ($page: Page, formate: string) => {

}

export const permalinkPlugin: Plugin = (pluginConfig) => {
  return {
    // https://vuepress.vuejs.org/plugin/option-api.html#extendpagedata
    extendPageData ($page: Page) {

    }
  }
}
