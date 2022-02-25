import { buildConfig } from "../../build/rollup"

export default buildConfig([
  {
    type: 'ts',
    filePath: 'node/index',
    options: {
      external: [
        '@vuepress/utils',
        '@mr-huang/vuepress-shared'
      ]
    }
  }
])
