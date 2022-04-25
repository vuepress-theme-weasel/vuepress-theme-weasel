/**
 * blog resolve options
 */
import { BlogOptions } from '@mr-huang/vuepress-plugin-blog';
import { Page } from '@vuepress/core';
import { ThemeBlogPluginOptions } from '../../typings'

/**
 * 默认配置
 */
const defaultOptions: ThemeBlogPluginOptions = {
  article: '/article/',
  category: '/category/',
  categoryItem: '/category/:name/',
  tag: '/tag/',
  tagItem: '/tag/:name/',
  encrypted: '/encrypted/',
  slides: '/slides/',
  star: '/star/',
  timeline: '/timeline/',
  pictures: '/pictures/'
}

/**
 * 页面筛选条件
 * @param page
 * @returns
 */
const defaultClassifierFilter = (page: Page): boolean => {
  const { frontmatter, filePathRelative, routeMeta } = page
  return Boolean(filePathRelative) && frontmatter.home !== true && routeMeta.type !== 'page'
}

/**
 * 时间对比函数
 * @param dateA
 * @param dateB
 * @returns
 */
const compareDate = (
  dateA: Date | undefined,
  dateB: Date | undefined
): number => {
  if (!dateA) return 1
  if (!dateB) return -1

  return dateB.getTime() - dateA.getTime()
}

/**
 * 页面排序方法
 * @param pageA
 * @param pageB
 * @returns
 */
const sorter = (pageA: Page, pageB: Page): number => {
  const prevKey = pageA.frontmatter.sticky
  const nextKey = pageB.frontmatter.sticky

  if (prevKey && nextKey && prevKey !== nextKey)
    return Number(nextKey) - Number(prevKey)
  if (prevKey && !nextKey) return -1
  if (!prevKey && nextKey) return 1

  return compareDate(
    pageA.routeMeta.date as Date | undefined,
    pageB.routeMeta.date as Date | undefined
  )
}

export const resolveBlogOptions = (options?: ThemeBlogPluginOptions | false): BlogOptions | false => {
  if (!options) return false
  const blogOptions = {
    ...defaultOptions,
    ...(typeof options === 'object' ? options : {})
  }

  return {
    metaScope: '',

    filter: blogOptions.filter || defaultClassifierFilter,

    frontmatterClassifier: [
      {
        key: 'category',
        getter: ({ routeMeta }) => (routeMeta.category as string[]) || [],
        sorter,
        path: blogOptions.category,
        layout: 'Blog',
        itemPath: blogOptions.categoryItem,
        itemLayout: 'Blog'
      },
      {
        key: 'tag',
        getter: ({ routeMeta }) => (routeMeta.tag as string[]) || [],
        sorter,
        path: blogOptions.tag,
        layout: 'Blog',
        itemPath: blogOptions.tagItem,
        itemLayout: 'Blog'
      }
    ],

    pageTypeClassifier: [
      {
        key: 'article',
        sorter,
        filter: () => true,
        path: blogOptions.article,
        layout: 'Blog'
      },
      {
        key: 'encrypted',
        sorter,
        filter: ({ routeMeta }) => Boolean(routeMeta.isEncrypted),
        path: blogOptions.encrypted,
        layout: 'Blog'
      },
      {
        key: 'slide',
        sorter,
        filter: ({ routeMeta }) => routeMeta.type === 'slide',
        path: blogOptions.slides,
        layout: 'Blog'
      },
      {
        key: 'picture',
        sorter,
        filter: ({ routeMeta }) => routeMeta.type === 'picture',
        path: blogOptions.pictures,
        layout: 'Blog'
      },
      {
        key: 'star',
        sorter,
        filter: ({ frontmatter }) => Boolean(frontmatter.star),
        path: blogOptions.star,
        layout: 'Blog'
      },
      {
        key: 'timeline',
        sorter: (pageA, pageB) =>
          compareDate(
            pageA.routeMeta.date as Date | undefined,
            pageB.routeMeta.date as Date | undefined
          ),
        filter: ({ frontmatter, routeMeta }) =>
          'date' in routeMeta && frontmatter.timeline !== false,
        path: blogOptions.timeline,
        layout: 'Blog'
      }
    ],

    directoryClassifier: [
      {
        key: 'blog',
        dirname: 'blog',
        path: '/post/',
        layout: 'Blog',
        itemLayout: 'Blog'
      },
      {
        key: 'project',
        dirname: '_project',
        path: '/project/',
        layout: 'Blog',
        itemLayout: 'Blog'
      }
    ]
  }
}
