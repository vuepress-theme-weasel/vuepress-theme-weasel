/**
 * alias for developer
 */
import { App } from '@vuepress/core'
import { path } from '@vuepress/utils'
import fs from 'fs'
import { logger } from '../utils'

/**
 * 主题根目录
 */
const themeRootDir = path.resolve(__dirname, '../../')
/**
 * client alias
 */
const CLIENT_ALIAS = '@theme-weasel/'

/**
 * 获取文件夹下所有的文件夹的alias
 * @param dir
 * @returns
 */
const getDirAlias = (dir: string, baseDir: string = '../../client', isClient: boolean = true): [string, string][] =>
  fs
    .readdirSync(path.resolve(__dirname, baseDir, dir))
    .filter(
      (file) =>
        file.endsWith('.js') || file.endsWith('.vue') || !file.includes('.')
    )
    .map<[string, string]>((file) => {
      let alias = '/' + file
      if (file.endsWith('.js')) {
        const _tmp = file.replace(/(?:\/index)?\.js$/, '').replace(/index$/, '')
        alias = _tmp !== '' ? '/' + _tmp : _tmp
      }
      return [
        `${isClient ? CLIENT_ALIAS : '@'}${dir}${alias}`,
        path.resolve(__dirname, baseDir, dir, file),
      ]
    })

/**
 * 获取单个文件的alias
 * @param entry
 * @returns
 */
const getEntryAlias = (entry: string): [string, string] | null =>
  fs.existsSync(path.resolve(__dirname, '../../client', entry, 'index.js'))
    ? [
        `${CLIENT_ALIAS}${entry}`,
        path.resolve(__dirname, '../../client', entry, 'index.js'),
      ]
    : null

/**
 * 获取根目录的alias
 * @param app
 * @returns
 */
const getRootAlias = (app: App): [string, string][] => {
  const alias: [string, string][] = [
    ['@', themeRootDir]
  ]

  const aliasRoot = ['node', 'shared', 'typings']

  aliasRoot.forEach(dir => {
    alias.push(...getDirAlias(dir, '../../', false))
  })
  return alias
}

/**
 * 获取client下所有的alias
 * @param app App
 * @returns {[key in string]: string}
 */
export const getAlias = (): Record<string, string> => {
  // use alias to make all components replaceable
  const alias = Object.fromEntries([
    // define components
    ...getDirAlias('components'),
    // define composables and utils
    ...['composables', 'utils']
      .map(getEntryAlias)
      .filter<[string, string]>(
        (item): item is [string, string] => item !== null
      ),
    // define modules
    ...fs
      .readdirSync(path.resolve(__dirname, '../../client/modules'))
      .map((folder) => `modules/${folder}`)
      .map((file) => [
        // define module components
        ...getDirAlias(`${file}/components`),
        // define module composables and utils
        ...['composables', 'utils']
          .map((folder) => `${file}/${folder}`)
          .map(getEntryAlias)
          .filter<[string, string]>(
            (item): item is [string, string] => item !== null
          ),
      ])
      .flat(),
  ])

  return alias
}

/**
 * 创建主题目录的alias
 * @returns
 */
export const createAlias = (app: App) => {

  const stylesAlias: {[x: string]: string} = {}
  stylesAlias[`${CLIENT_ALIAS}styles`] = path.resolve(__dirname, '../../client/styles')
  stylesAlias[`${CLIENT_ALIAS}styles/config`] = path.resolve(__dirname, '../../client/styles/config/index.scss')

  const alias = {
    ...Object.fromEntries([
      ...getRootAlias(app)
    ]),
    ...getAlias(),
    // styles
    ...stylesAlias,
    '@source': app.dir.source(),
    '@TweenLite': path.resolve(__dirname, '../../../templates/assets/TweenLite.min.js'),
    '@EasePack': path.resolve(__dirname, '../../../templates/assets/EasePack.min.js')
  }
  if (app.env.isDebug) {
    logger.info('加载的alias:')
    logger.info(alias)
  }
  return alias
}
