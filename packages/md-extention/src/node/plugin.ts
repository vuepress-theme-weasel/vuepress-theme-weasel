import { clientConfigFile } from './clientConfig';
import { containerExtention, codeDemoDefaultSetting} from './plugins';
import type { PluginFunction } from '@vuepress/core';
import type { MdExtentionOptions } from './../typings';

export const mdExtentionPlugin = (options: MdExtentionOptions):PluginFunction => (app) => {

  // 前置插件
  containerExtention(app, options)
  return {
    name: '@mr-huang/vuepress-plugin-md-extention',
    define: {
      MARKDOWN_ENHANCE_DELAY: options.delay || 500,
      CODE_DEMO_OPTIONS: {
          ...codeDemoDefaultSetting,
          ...(typeof options.demo === "object" ? options.demo : {}),
        },
    },
    clientConfigFile: () => clientConfigFile(app, options)
  }
}
