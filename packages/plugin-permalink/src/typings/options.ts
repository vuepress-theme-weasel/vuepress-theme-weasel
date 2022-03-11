import { SlugifyOption } from './slugify';
/**
 * 插件配置
 */
export type PluginType = 'slugify' | 'date' | 'customer'

export interface BasePluginOption<T = unknown> {
  type: keyof T
  formatter: string,
  options: PluginOption<T>
}

export type PluginOption<T = any> = T extends 'slugify' ? SlugifyOption : T
