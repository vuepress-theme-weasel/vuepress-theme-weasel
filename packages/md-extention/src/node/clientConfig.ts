import { ensureEndingSlash } from "@vuepress/shared";
import { path } from "@vuepress/utils";

import type { App } from "@vuepress/core";
import type { MdExtentionOptions, RevealPlugin } from "../typings";

const CLIENT_FOLDER = ensureEndingSlash(path.resolve(__dirname, "../client"));

export const clientConfigFile = async (
  app: App,
  options: MdExtentionOptions
): Promise<string> => {
  let configImport = "";
  let enhance = "";

  const getStatus = (key: keyof MdExtentionOptions): boolean =>
    key in options
      ? Boolean(options[key])
      : options.enableAll || false;

  if (getStatus("demo")) {
    configImport += `import { CodeDemo } from "${CLIENT_FOLDER}components/code-demo";\n import "${CLIENT_FOLDER}styles/code-demo.scss";\n`;
    enhance += `app.component("CodeDemo", CodeDemo);\n`;
  }

  // if (getStatus("codegroup")) {
  //   configImport += `import CodeGroup from "${CLIENT_FOLDER}components/CodeGroup";\n`;
  //   enhance += `app.component("CodeGroup", CodeGroup);\n`;
  //   configImport += `import CodeGroupItem from "${CLIENT_FOLDER}components/CodeGroupItem";\n`;
  //   enhance += `app.component("CodeGroupItem", CodeGroupItem);\n`;
  // }

  // if (getStatus("align"))
  //   configImport += `import "${CLIENT_FOLDER}styles/align.scss";\n`;

  if (getStatus("container"))
    configImport += `import "${CLIENT_FOLDER}styles/container/index.scss";\n`;

  // if (getStatus("imageMark"))
  //   configImport += `import "${CLIENT_FOLDER}styles/image-mark.scss";\n`;

  // if (getStatus("tasklist"))
  //   configImport += `import "${CLIENT_FOLDER}styles/tasklist.scss";\n`;

  return app.writeTemp(
    `md-enhance/config.js`,
    `import { defineClientConfig } from "@vuepress/client";
${configImport}

export default defineClientConfig({
  enhance: ({ app }) => {
${enhance
  .split("\n")
  .map((item) => `    ${item}`)
  .join("\n")}
  }
});`
  );
};
