import { buildConfig } from '../../build/rollup'

export default buildConfig([
  {
    type: 'ts',
    filePath: 'node/index',
    options: {
      external: [
        '@vuepress/utils',
        '@vuepress/plugin-theme-data',
        '@mr-huang/vuepress-shared',
        "@mr-huang/vuepress-plugin-sass-palette"
      ]
    }
  },
  {
    type: 'vue',
    filePath: 'client/layouts/Layout.vue',
    options: {
      external: [
        '@vuepress/client',
        'vue',
        'vue-router',
        /\.scss$/,
      ],
      dtsExternal: [/\.scss$/]
    }
  },
  {
    type: 'ts',
    filePath: 'client/appEnhance',
    options: {
      copy: [['client/styles', 'client']],
      external: [
        '@vuepress/client',
        /\.scss$/,
      ],
      dtsExternal: [/\.scss$/]
    }
  }
])
