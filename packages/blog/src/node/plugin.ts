import { preparePageType } from './pageType/preparePageType';
/**
 * blog plugin
 */

import { Plugin } from '@vuepress/core'
import { BlogOptions } from '../typings'
import { filterPages } from './utils'

export const blogPlugin: Plugin<BlogOptions> = (options) => {

  return {
    name: '@mr-huang/vuepress-plugin-blog',
    // 初始化时创建页面
    onInitialized(app) {
      const pages = filterPages(options, app)
      preparePageType(app, options, pages)
    }
  }
}
