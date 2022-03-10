import { slugify } from 'transliteration'
import type { Page, Theme } from '@vuepress/core'

const plugin: Theme = (pluginConfig) => {
  return {
    // https://vuepress.vuejs.org/plugin/option-api.html#extendpagedata
    extendPageData ($page: Page) {
      // $page.path was encoded by VuePress already.
      // Make sure original so I decode it once.
      const pathArr = decodeURIComponent($page.path).split('/')
      // https://github.com/andyhu/transliteration#slugifystr-options
      const options = Object.assign({}, pluginConfig, { ignore: ['/', '.'] })
      $page.path = pathArr.map(str => slugify(str, options)).join('/')
    }
  }
}

export default plugin
