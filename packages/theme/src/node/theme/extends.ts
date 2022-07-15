import { getCategory, getTag } from '../utils'
import { logger } from '@vuepress/utils'

import type { Page } from '@vuepress/core'
import type {
  WeaselThemeConfig,
  ThemePageData,
  ThemePluginsOptions,
  ThemeNormalPageFrontmatter,
} from '../../typings'
import { App } from '@vuepress/core'

export const checkFrontmatter = (
  page: Page<ThemePageData>,
  isDev = false
): void => {
  const frontmatter = page.frontmatter as ThemeNormalPageFrontmatter

  const { filePathRelative } = page

  // handle deprecated
  const handleDeprecated = (deprecatedKey: string, key = ''): void => {
    if (deprecatedKey in frontmatter) {
      // show logger in dev mode
      if (isDev)
        logger.warn(
          `'${deprecatedKey}' property in Page FrontMatter is deprecated${
            key ? `, please use ${key} instead` : ''
          }.${filePathRelative ? `\nFound in ${filePathRelative}` : ''}`
        )

      if (!(key in frontmatter)) {
        frontmatter[key] = frontmatter[deprecatedKey]
      }

      delete frontmatter[deprecatedKey]
    }
  }

  handleDeprecated('authors', 'author')
  handleDeprecated('tags', 'tag')
  handleDeprecated('categories', 'category')
  handleDeprecated('time', 'date')

  // check date
  if ('date' in frontmatter && !(frontmatter.date instanceof Date)) {
    if (isDev)
      logger.error(
        `'date' roperty in Page FrontMatter should be a valid Date.${
          filePathRelative ? `\nFound in ${filePathRelative}` : ''
        }`
      )

    delete frontmatter.date
  }

  // resolve category
  if ('category' in frontmatter) {
    const category = getCategory(frontmatter.category)

    frontmatter.category = category
  }

  // resolve tag
  if ('tag' in frontmatter) {
    const tag = getTag(frontmatter.tag)

    frontmatter.tag = tag
  }
}

/**
 * 匹配出所有的Image Url
 */
const matchImageSource = (content: string) => {
  var patt = /<img[^>]+src=['"]([^'"]+)['"]+/g;
  var result = [],
    temp;
  while ((temp = patt.exec(content)) != null) {
    result.push(temp[1])
  }
  return result
}

export const extendsPage = (
  app: App,
  themeConfig: WeaselThemeConfig,
  plugins: ThemePluginsOptions,
  page: Page<ThemePageData>,
  isDev = false
): void => {
  // const { config = {} } = themeConfig.encrypt
  const frontmatter = page.frontmatter as ThemeNormalPageFrontmatter
  const { filePathRelative } = page
  const { createdTime } = page.data.git || {}

  checkFrontmatter(page, isDev)

  // save relative file path into page data to generate edit link
  page.data.filePathRelative = filePathRelative

  // save basic info to routeMeta
  page.routeMeta = {
    ...page.routeMeta,
    title: page.title,
    icon: frontmatter.icon,
  }

  if (plugins.blog) {
    const isArticle =
      // declaring this is an article
      frontmatter.article ||
      // generated from markdown files
      Boolean(frontmatter.article !== false && filePathRelative)

    const isSlide = isArticle && frontmatter.layout === 'Slide'

    // save basic info to routeMeta
    page.routeMeta = {
      ...page.routeMeta,
      type: frontmatter.home
        ? 'home'
        : isSlide
        ? 'slide'
        : isArticle
        ? 'article'
        : 'page',
      // readingTime: page.data.readingTime,
      excerpt:
        page.excerpt ||
        frontmatter.description ||
        (typeof plugins.blog === 'object' && plugins.blog.autoExcerpt
          ? frontmatter.summary
          : ''),
    }

    // resolve author
    if ('author' in frontmatter) page.routeMeta.author = frontmatter.author

    // resolve date
    if ('date' in frontmatter) page.routeMeta.date = frontmatter.date
    else if (createdTime) page.routeMeta.date = new Date(createdTime)

    if ('category' in frontmatter)
      // resolve category
      page.routeMeta.category = frontmatter.category

    // resolve tag
    if ('tag' in frontmatter) page.routeMeta.tag = frontmatter.tag

    // resolve sticky
    if ('sticky' in frontmatter) page.routeMeta.sticky = frontmatter.sticky

    // resolve star
    if ('star' in frontmatter) page.routeMeta.star = frontmatter.star

    // resolve image
    if ('cover' in frontmatter) page.routeMeta.cover = frontmatter.cover
    const images = matchImageSource(page.contentRendered)
    if (images.length) page.routeMeta.cover = (app.env.isDev ? images[0].replace('@source', `/@fs/${app.dir.source().replace('\\', '/')}`) : images[0])

    // resolve isOriginal
    if ('isOriginal' in frontmatter)
      page.routeMeta.isOriginal = frontmatter.isOriginal

    // resolve encrypted
    // if (Object.keys(config).some((key) => path.startsWith(key))) page.routeMeta.isEncrypted = true
  }
}
