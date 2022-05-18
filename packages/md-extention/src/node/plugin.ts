import type { PluginFunction } from '@vuepress/core';
import type { MdExtentionOptions } from './../typings';

export const mdExtentionPlugin = (options: MdExtentionOptions):PluginFunction => (app) => {

  return {
    name: '@mr-huang/vuepress-plugin-md-extention'
  }
}
