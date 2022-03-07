import { fs, path } from '@vuepress/utils'

import type { App } from '@vuepress/core'

const getDirAlias = (dir: string): [string, string][] =>
  fs
    .readdirSync(path.resolve(__dirname, '../client', dir))
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
        `@theme-weasel/${dir}${alias}`,
        path.resolve(__dirname, '../client', dir, file),
      ]
    })

const getEntryAlias = (entry: string): [string, string] | null =>
  fs.existsSync(path.resolve(__dirname, '../client', entry, 'index.js'))
    ? [
        `@theme-weasel/${entry}`,
        path.resolve(__dirname, '../client', entry, 'index.js'),
      ]
    : null

/**
 * get all alias for vuepress
 * @param app App
 * @returns {[key in string]: string}
 */
export const getAlias = (app: App): Record<string, string> => {
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
      .readdirSync(path.resolve(__dirname, '../client/modules'))
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

  if (app.env.isDebug) console.log('Theme alias config:', alias)

  return alias
}
