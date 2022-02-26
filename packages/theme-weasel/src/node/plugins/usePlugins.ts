import { WeaselThemePluginsOptions } from './../../typings';
import type { App } from "@vuepress/core"
import { path } from '@vuepress/utils'
import { useSassPalettePlugin } from '@mr-huang/vuepress-plugin-sass-palette'

export const usePlugins = (app: App, plugins: WeaselThemePluginsOptions) => {
  useSassPalettePlugin(app, {
    id: "weasel",
    config: ".vuepress/styles/config.scss",
    defaultConfig: path.resolve(__dirname, "../../../templates/config.scss"),
    defaultPalette: path.resolve(__dirname, "../../../templates/palette.scss"),
    generator: path.resolve(__dirname, "../../../templates/generator.scss"),
    palette: ".vuepress/styles/palette.scss",
    style: ".vuepress/styles/index.scss",
  })

  if (plugins.blog) {
    useSassPalettePlugin(app, {
      id: "weasel-blog",
      config: ".vuepress/styles/config.scss",
      defaultConfig: path.resolve(__dirname, "../../../templates/config.scss"),
      defaultPalette: path.resolve(__dirname, "../../client/modules/blog/styles/palette.scss"),
      generator: path.resolve(__dirname, "../../client/modules/blog/styles/generator.scss"),
      palette: ".vuepress/styles/palette.scss",
      style: ".vuepress/styles/index.scss",
    })
  }
}
