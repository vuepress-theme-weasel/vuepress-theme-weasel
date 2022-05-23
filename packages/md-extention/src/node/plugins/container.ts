import { markdownEnhanceLocales } from './../locales';
import { getLocales } from "@mr-huang/vuepress-shared"
import { containerPlugin } from "@vuepress/plugin-container";

import type { App, LocaleConfig } from "@vuepress/core"
import type { MarkdownContainerName, MdExtentionLocaleConfig, MdExtentionOptions } from '../../typings';
import { detailsRender } from './details';
import { codeDemoRender } from './codeDemo';

const getContainterLocale = (
  key: MarkdownContainerName,
  locales: MdExtentionLocaleConfig
): LocaleConfig<{
  defaultInfo: string;
}> =>
  Object.fromEntries(
    Object.keys(locales).map((path) => [
      path,
      { defaultInfo: locales[path][key] },
    ])
  );

export const containerExtention = (app: App, pluginOptions: MdExtentionOptions) => {
  const locales = getLocales({
    app,
    name: 'md-extention',
    default: markdownEnhanceLocales,
    config: pluginOptions.locales
  })

  if (pluginOptions.container || pluginOptions.enableAll) {
    const containers: MarkdownContainerName[] = [
      "info",
      "note",
      "tip",
      "warning",
      "danger",
    ];

    containers.forEach((type) =>
      app.use(containerPlugin({ type, locales: getContainterLocale(type, locales) }))
    );

    app.use(
      containerPlugin({
        type: "details",
        render: detailsRender(getContainterLocale("details", locales)),
      })
    );
  }

  if (pluginOptions.demo || pluginOptions.enableAll) {
    app.use(containerPlugin({ type: "demo", render: codeDemoRender }));
  }
}
