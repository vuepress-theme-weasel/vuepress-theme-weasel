import { clientConfigFile } from './clientConfig';
import { containerExtention } from './plugins';
import type { PluginFunction } from '@vuepress/core';
import type { MdExtentionOptions } from './../typings';

export const mdExtentionPlugin = (options: MdExtentionOptions):PluginFunction => (app) => {

  // 前置插件
  containerExtention(app, options)
  return {
    name: '@mr-huang/vuepress-plugin-md-extention',
    clientConfigFile: () => clientConfigFile(app, options)
  }
}
