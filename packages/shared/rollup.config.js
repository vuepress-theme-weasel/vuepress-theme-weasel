import { buildConfig } from "../../build/rollup"

export default buildConfig([
  {
    type: 'ts',
    filePath: 'node/index',
    options: {
      resolve: true,
      external: [
        'chalk',
        'org',
        'vue-router',
        '@vuepress/shared',
        '@vuepress/core',
        '@vuepress/bundler-vite'
      ]
    }
  },
  {
    type: 'ts',
    filePath: 'client/index',
    options: {
      resolve: true,
      external: [
        '@vuepress/client',
        '@vuepress/plugin-theme-data/lib/client',
        'chalk',
        'org',
        'vue',
        'vue-router',
        /\.scss$/
      ],
      dtsExternal: [/\.scss$/],
      copy: [['client/styles', 'client']]
    }
  },
  {
    type: 'ts',
    filePath: 'client/noopModule',
    options: {
      external: ['vue']
    }
  }
])
