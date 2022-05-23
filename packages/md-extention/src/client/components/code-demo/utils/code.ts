import { getConfig, preProcessorConfig } from "./utils";

import type Babel from "@babel/core";
import type { Code, CodeType } from "./typings";
import type { PreProcessorType } from "./utils";
import type { CodeDemoOptions } from "../../../../typings";

declare global {
  interface Window {
    Babel: typeof Babel;
  }
}

/**
 * 获取代码块
 * @param code
 * @returns
 */
export const getCode = (code: Record<string, string>): CodeType => {
  const languages = Object.keys(code);
  const result: CodeType = {
    html: [],
    js: [],
    css: [],
    isLegal: false,
  };

  (["html", "js", "css"] as PreProcessorType[]).forEach((type) => {
    const match = languages.filter((language) =>
      preProcessorConfig[type].types.includes(language)
    );

    if (match.length) {
      const language = match[0];

      result[type] = [
        code[language].replace(/^\n|\n$/g, ""),
        preProcessorConfig[type].map[language] || language,
      ];
    }
  });

  result.isLegal =
    (!result.html.length || result.html[1] === "none") &&
    (!result.js.length || result.js[1] === "none") &&
    (!result.css.length || result.css[1] === "none");

  return result;
};

/**
 * 格式化HTML
 * @param html
 * @returns
 */
const handleHTML = (html: string): string =>
  html
    .replace(/<br \/>/g, "<br>")
    .replace(/<((\S+)[^<]*?)\s+\/>/g, "<$1></$2>");

/**
 * 组织单文件 template
 * @param html
 * @returns
 */
const genVueTemplate = (html: string): string =>
  `<div id="app">\n${handleHTML(html)}\n</div>`;

/**
 * 创建单文件 script
 * @param js 。
 * @returns
 */
const genVueScript = (js: string): string =>
  js
    .replace(
      /export\s+default\s*\{(\n*[\s\S]*)\n*\}\s*;?$/u,
      "Vue.createApp({$1}).mount('#app')"
    )
    .replace(
      /export\s+default\s*define(Async)?Component\s*\(\s*\{(\n*[\s\S]*)\n*\}\s*\)\s*;?$/u,
      "Vue.createApp({$1}).mount('#app')"
    )
    .trim();

/**
 * 构建浏览器运行的代码块
 * @param scriptStr
 * @returns
 */
export const wrapper = (scriptStr: string): string =>
  `(function(exports){var module={};module.exports=exports;${scriptStr};return module.exports.__esModule?module.exports.default:module.exports;})({})`;

/**
 * 组件常用代码块
 * @param code
 * @param config
 * @returns
 */
export const createNormalCode = (
  code: CodeType,
  config: Partial<CodeDemoOptions>
): Code => {
  const codeConfig = getConfig(config);
  const js = code.js[0] || "";

  return {
    ...codeConfig,
    html: handleHTML(code.html[0] || ""),
    js,
    css: code.css[0] || "",
    isLegal: code.isLegal,
    getScript: (): string =>
      codeConfig.useBabel
        ? window.Babel.transform(js, { presets: ["es2015"] })?.code || ""
        : js,
  };
};

/**
 * 创建vue代码
 * @param code
 * @param config
 * @returns
 */
export const createVueCode = (
  code: CodeType,
  config: Partial<CodeDemoOptions>
): Code => {
  const codeConfig = getConfig(config);

  const vueTemplate = code.html[0] || "";
  const htmlBlock = /<template>([\s\S]+)<\/template>/u.exec(vueTemplate);
  const jsBlock = /<script(\s*lang=(['"])(.*?)\2)?>([\s\S]+)<\/script>/u.exec(
    vueTemplate
  );
  const cssBlock =
    /<style(\s*lang=(['"])(.*?)\2)?\s*(?:scoped)?>([\s\S]+)<\/style>/u.exec(
      vueTemplate
    );
  const html = htmlBlock ? htmlBlock[1].replace(/^\n|\n$/g, "") : "";
  const [js = "", jsLang = ""] = jsBlock
    ? [jsBlock[4].replace(/^\n|\n$/g, ""), jsBlock[3]]
    : [];
  const [css = "", cssLang = ""] = cssBlock
    ? [cssBlock[4].replace(/^\n|\n$/g, ""), cssBlock[3]]
    : [];

  const isLegal = jsLang === "" && (cssLang === "" || cssLang === "css");

  return {
    ...codeConfig,
    html: genVueTemplate(html),
    js: genVueScript(js),
    css,
    isLegal,
    jsLib: [codeConfig.vue, ...codeConfig.jsLib],
    getScript: (): string => {
      const scriptStr = config.useBabel
        ? window.Babel?.transform(js, { presets: ["es2015"] })?.code || ""
        : js.replace(/export\s+default/u, "return");

      return `const app=window.document.createElement('div');document.firstElementChild.appendChild(app);const appOptions=${wrapper(
        scriptStr
      )};appOptions.template=\`${html.replace(
        "`",
        '\\`"'
      )}\`;window.Vue.createApp(appOptions).mount(app);`;
    },
  };
};
