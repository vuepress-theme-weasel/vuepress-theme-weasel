import { basename, resolve } from 'path'
import { promises as fs } from 'fs'
import { logger } from '../src/node/utils'

async function run() {
  // fix cjs exports theme file path
  const themePluginPath = resolve(__dirname, '../lib/node/index.js')
  logger.info('[postbuild]', basename(themePluginPath))
  // const name = basename(themePluginPath, '.js')
  let code = await fs.readFile(themePluginPath, 'utf8')
  code = code.replace('exports.default =', 'module.exports =')
  code += 'exports.default = module.exports;'
  await fs.writeFile(themePluginPath, code)
}

run().then(() => {
  logger.success('完成commonjs文件替换')
})
