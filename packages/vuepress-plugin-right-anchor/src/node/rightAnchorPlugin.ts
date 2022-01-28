/*
 * @Author: cavinHuang
 * @Date: 2022-01-28 10:02:33
 * @LastEditTime: 2022-01-28 10:02:33
 * @LastEditors: Please set LastEditors
 * @Description: 插件
 * @FilePath: \vuepress-theme-Weasel\packages\vuepress-plugin-right-anchor\src\node\rightAnchorPlugin.ts
 */

import type { Plugin, Page } from '@vuepress/core'
import { path } from '@vuepress/utils'
import debug from 'debug'
export interface RightAnchorPluginOptions {
  showDepth?: number
  ignore?: string[]
  expand?: {
    trigger: 'hover' | 'click'
    clickModeDefaultOpen: boolean
  }
  customClass?: string
}

export interface RightAnchorPageOptions {
  showDepth?: number
  isIgnore: boolean
  expand: {
    trigger: 'hover' | 'click'
    clickModeDefaultOpen: boolean
  }
  customClass?: string
}

export const rightAnchorPlugin: Plugin<RightAnchorPluginOptions> = (options = {}) => {
  return {
    name: 'vuepress-plugin-right-anchor',
    clientAppRootComponentFiles: path.resolve(
      __dirname,
      '../client/components/RightAnchor.js'
    ),
    extendsPage: (page: Page<{ rightAnchor: RightAnchorPageOptions }>) => {
      const { rightAnchor: frontmatterOptions = {} } = page.frontmatter
      const rightAnchor: RightAnchorPageOptions = {
        ...options,
        ...frontmatterOptions as any,
        isIgnore: Array.isArray(options.ignore) && options.ignore.includes((page as any).path),
        expand: {
          trigger: 'hover',
          clickModeDefaultOpen: true,
          ...options.expand,
          ...(frontmatterOptions as any).expand,
        },
      }
      page.data.rightAnchor = rightAnchor
      return rightAnchor
    },
  }
}