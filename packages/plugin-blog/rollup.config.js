import { buildConfig } from '../../build/rollup'

export default buildConfig([
  {
    type: 'ts',
    filePath: 'node/index',
    options: {
      external: [
        '@mr-huang/vuepress-shared',
        '@vuepress/core'
      ]
    }
  },
  {
    type: 'ts',
    filePath: 'client/index',
    options: {
      external: [
        '@mr-huang/vuepress-shared/lib/client',
        '@vuepress/client',
        '@vuepress/shared',
        'vue',
        'vue-router',
        /^@temp/,
      ]
    }
  }
])
