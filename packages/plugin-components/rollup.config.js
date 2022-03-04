import { buildConfig } from '../../build/rollup'

export default buildConfig([
  {
    type: 'ts',
    filePath: 'node/index',
    options: {
      external: [
        '@mr-huang/vuepress-shared',
        '@vuepress/utils',
        'lodash.debounce',
        'vue',
        // 'vuepress-plugin-reading-time2',
        '@mr-huang/vuepress-plugin-sass-palette'
      ]
    }
  },
  {
    type: 'ts',
    filePath: 'client/appEnhance',
    options: {
      external: [
        '@vuepress/client',
        '@ArticleInfo',
        '@Badge',
        '@BreadCrumb',
        '@FullScreen',
        '@Pagination',
        '@TOC',
        /\.scss$/
      ],
      dtsExternal: [/\.scss$/],
      copy: [['client/styles', 'client']],
    }
  },
  {
    type: 'vue',
    filePath: 'client/components/ArticleInfo.vue',
    options: {
      external: [
      '@mr-huang/vuepress-shared/lib/client',
      '@vuepress/client',
      'balloon-css/balloon.css',
      'vue',
      'vue-router',
      /\.scss$/
    ],
    dtsExternal: ['balloon-css/balloon.css', /\.scss$/]
    }
  }
])
