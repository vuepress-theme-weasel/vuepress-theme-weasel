import { SlugifyOption } from './slugify';
/**
 * 插件配置
 */
export type PluginType = 'slugify' | 'date' | 'customer'

/**
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
export type SlugifyKey = ':slugify'
export type PluginFormat = ':year' | ':month' | ':i_month' | ':day' | ':i_day' | ':hour' | ':minute' | ':second' | ':title' | ':name' | ':post_title' | ':id' | ':category' | ':hash' | ':slugify'

export interface PluginConfigCustomer {
  format: PluginFormat
}

export interface PluginConfigSlugify {
  format: PluginFormat,
  options?: SlugifyOption
}

export type PermaLinkPluginConfig = PluginConfigSlugify
