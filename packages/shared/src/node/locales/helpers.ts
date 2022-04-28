import { WeaselLang } from './types';
import { ConvertLocaleConfig, BaseThemeConfig } from "../../typings"
import { App, AppOptions, LocaleConfig } from "@vuepress/core"
import { lang2PathConfig, path2langConfig, supportedLangs } from "./config"
import { deepAssign } from '../utils'

/**
 * 错误状态
 */
const reportStatus: Record<string, boolean> = {}

/** Check if the lang is supported */
export const checkLang = (lang = ''): boolean => supportedLangs.includes(lang)

/**
 * 显示语言配置错误
 * @param lang
 * @param plugin
 */
export const showLangError = (lang: string, plugin = ''): void => {
  if (!reportStatus[lang]) {
    console.warn(
      `${lang} locates config is missing, and will return 'en-US' instead.
${
  lang === 'root'
    ? ''
    : `You can contribute to https://github.com/xxx/packages/${
        plugin || '<YOUR PLUGIN>'
      }/src/node/locales.ts in this repository.
`
}Note: This warning will be shown only once`
    )
    reportStatus[lang] = true
  }
}

/** Get language from path */
export const path2Lang = (path = ''): WeaselLang => {
  if (path in path2langConfig) return path2langConfig[path]

  console.error(
    `${path} isn’t assign with a lang, and will return 'zh-CN' instead.`
  )

  return 'zh-CN'
}

/** Get path from language */
export const lang2Path = (lang = ''): string => {
  if (lang in lang2PathConfig) return lang2PathConfig[lang as WeaselLang]

  console.error(`${lang} has no path config, and will return '/' instead.`)

  return '/'
}

/**
 * Get language of root directory
 *
 * @param app VuePress Node App
 * @returns root language
 */
export const getRootLang = (app: App): WeaselLang => {
  // infer from siteLocale
  const siteLocales = app.siteData.locales

  if (siteLocales?.['/'] && checkLang(siteLocales['/']?.lang))
    return siteLocales['/'].lang as WeaselLang

  // infer from themeLocale
  const options = app.options as AppOptions<BaseThemeConfig>
  const themeLocales = options.themeConfig.locales

  if (themeLocales?.['/'] && checkLang(themeLocales['/']?.lang))
    return themeLocales['/'].lang as WeaselLang

  showLangError('root')

  return 'zh-CN'
}

/**
 * Get the infer language path from root directory language
 *
 * @param app VuePress Node App
 * @returns infer language
 */
export const getRootLangPath = (app: App): string =>
  lang2Path(getRootLang(app))


export const getLocalePaths = (app: App): string[] =>
  Array.from(
    new Set([
      ...Object.keys(app.siteData.locales),
      ...Object.keys(
        (app.options as AppOptions<BaseThemeConfig>).themeConfig.locales || {}
      ),
    ])
  )

/**
 * Get final locale config to passed to client
 *
 * @param app  VuePress Node App
 * @param defaultLocalesConfig default locale config
 * @param userLocalesConfig user locale config
 * @returns final locale config
 */
export const getLocales = <T>(
  app: App,
  defaultLocalesConfig: ConvertLocaleConfig<T>,
  userLocalesConfig: LocaleConfig<T> = {}
): ConvertLocaleConfig<T> => {
  const rootPath = getRootLangPath(app)

  return Object.fromEntries([
    ...getLocalePaths(app).map<[string, T]>((localePath) => [
      localePath,
      deepAssign(
        {},
        userLocalesConfig[localePath] || {},
        defaultLocalesConfig[localePath]
      ),
    ]),
    [
      '/',
      deepAssign(
        {},
        userLocalesConfig['/'] || userLocalesConfig[rootPath] || {},
        defaultLocalesConfig[rootPath]
      ),
    ],
  ])
}
