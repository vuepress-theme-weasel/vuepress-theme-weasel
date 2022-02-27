import { buildConfig } from "../../build/rollup"

export default buildConfig([
  {
    type: 'ts',
    filePath: 'node/index'
  }
])
