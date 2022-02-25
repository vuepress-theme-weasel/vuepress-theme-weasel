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
        '@vuepress/core',
        '@vuepress/bundler-vite'
      ]
    }
  }
])
