import { WeaselLang } from './types';
import { ConvertLocaleConfig } from "../../typings"
import { App, LocaleConfig } from "@vuepress/core"
import { lang2PathConfig, path2langConfig, supportedLangs } from "./config"
import { deepAssign, Logger } from '../utils'

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

  return app.siteData.lang as WeaselLang
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
    new Set([...Object.keys(app.siteData.locales)])
  )

export interface GetLocalesOptions<T> {
  app: App;
  default: ConvertLocaleConfig<T>;
  config?: LocaleConfig<T> | undefined;
  name?: string;
}

/**
 * Get final locale config to passed to client
 *
 * @param app  VuePress Node App
 * @param defaultLocalesConfig default locale config
 * @param userLocalesConfig user locale config
 * @returns final locale config
 */
export const getLocales = <T>({
  app,
  name,
  default: defaultLocalesConfig,
  config: userLocalesConfig = {},
}: GetLocalesOptions<T>): ConvertLocaleConfig<T> => {
  const rootPath = getRootLangPath(app);
  const logger = new Logger(name);

  return Object.fromEntries([
    ...getLocalePaths(app)
      .filter((localePath) => localePath !== "/")
      .map<[string, T]>((localePath) => {
        if (!defaultLocalesConfig[localePath])
          logger.warn(`Locale ${localePath} is missing it's i18n config`);

        return [
          localePath,
          deepAssign(
            {},
            defaultLocalesConfig[localePath] ||
              defaultLocalesConfig[rootPath] ||
              {},
            userLocalesConfig[localePath] || {}
          ),
        ];
      }),
    [
      "/",
      deepAssign(
        {},
        defaultLocalesConfig[rootPath],
        userLocalesConfig["/"] || userLocalesConfig[rootPath] || {}
      )
    ]
  ])
}
