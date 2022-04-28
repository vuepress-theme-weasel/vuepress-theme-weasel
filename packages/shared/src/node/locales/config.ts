import { WeaselLang } from './types'

export const lang2PathConfig = {
  'en-US': '/en/',
  'zh-CN': '/',
  'zh-TW': '/zh-tw/',
  'de-AT': '/de/',
  'vi-VN': '/vi/',
  'ru-RU': '/ru/',
  'uk-UA': '/uk/',
  'pt-BR': '/br/'
}

export const supportedLangs = Object.keys(lang2PathConfig)

export const path2langConfig = Object.fromEntries(
  (supportedLangs as WeaselLang[]).map((lang) => [lang2PathConfig[lang], lang])
)
