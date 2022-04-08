/**
 * blog plugin
 */

import { Plugin } from '@vuepress/core'
import { BlogOptions } from '../typings'

export const blogPlugin: Plugin<BlogOptions> = () => {

  return {
    name: '@mr-huang/vuepress-plugin-blog'
  }
}
