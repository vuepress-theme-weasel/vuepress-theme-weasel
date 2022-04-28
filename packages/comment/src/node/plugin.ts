import { CommentOptions } from '../typings'
import type { Plugin, PluginConfig } from '@vuepress/core'
import { getLocales, noopModule } from '@mr-huang/vuepress-shared'
import { walineLocales } from './locales'
import { path } from '@vuepress/utils'

export const commentPlugin: Plugin<CommentOptions> = (options, app) => {
  const isGiscus = options.type === 'giscus'
  const isTwikoo = options.type === 'twikoo'
  const isWaline = options.type === 'waline'

  const userWalineLocales = isWaline
    ? getLocales(app, walineLocales, options.walineLocales)
    : {}

  if ('walineLocales' in options) delete options.walineLocales

  return {
    name: '@mr-huang/vuepress-plugin-comment',

    alias: {
      "@Giscus": isGiscus
        ? path.resolve(__dirname, "../client/components/Giscus.js")
        : noopModule,
      "@Twikoo": isTwikoo
        ? path.resolve(__dirname, "../client/components/Twikoo.js")
        : noopModule,
      "@Waline": isWaline
        ? path.resolve(__dirname, "../client/components/Waline.js")
        : noopModule,
    },

    define: () => ({
      COMMENT_OPTIONS: options,
      WALINE_LOCALES: userWalineLocales,
    }),

    clientAppEnhanceFiles: path.resolve(__dirname, "../client/appEnhance.js")
  }
}

export const comment = (
  options: CommentOptions | false
): PluginConfig<CommentOptions> => ["@mr-huang/vuepress-plugin-comment", options];
