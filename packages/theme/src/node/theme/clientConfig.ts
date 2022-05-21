import { ensureEndingSlash } from "@vuepress/shared";
import { path } from "@vuepress/utils";

import type { App } from "@vuepress/core";
import type { ThemeStatus } from "./state";

const CLIENT_FOLDER = ensureEndingSlash(path.resolve(__dirname, "../../client"));

export const prepareClientConfigFile = (app: App, { enableBlog }: ThemeStatus): Promise<string> => {
  let configImport = "";
  let enhance = "";
  let setup = "";

  if (enableBlog) {
    configImport += `
import { BlogWrapper, BlogHome, BlogPage } from '@theme-weasel/modules/blog/components'
import "${CLIENT_FOLDER}modules/blog/styles/index.scss";
`;

    enhance += `
app.component('BlogWrapper', BlogWrapper)
app.component('BlogHome', BlogHome)
app.component('BlogPage', BlogPage)
`;
  }

//   if (enableEncrypt) {
//     configImport += `
// import GloablEncrypt from "@theme-weasel/module/encrypt/components/GloablEncrypt";
// import LocalEncrypt from "@theme-weasel/module/encrypt/components/LocalEncrypt";
// `;
//     enhance += `
// app.component("GloablEncrypt", GloablEncrypt);
// app.component("LocalEncrypt", LocalEncrypt);
// `;
//   }

  return app.writeTemp(
    `theme-weasel/client-config.js`,
    `import { defineClientConfig } from "@vuepress/client";
import { h } from 'vue'
import { AuthorInfo, DateInfo, ArticleInfo, TagInfo, CategoryInfo, OriginalInfo, ReadingTimeInfo, RecommendList, Pagination, Badge } from '@theme-weasel/components'
import { Navbar } from "@theme-weasel/modules/navbar/components";
import { Sidebar } from "@theme-weasel/modules/sidebar/components";

import { setupArticles, setupCategoryMap, setupTagMap, setupStars, setupTimelines } from "@theme-weasel/composables";
import { setupDarkMode, setupPureMode } from "@theme-weasel/modules/outlook/composables";
import { setupSidebarItems } from '@theme-weasel/modules/sidebar/composables'
import { useScrollPromise } from "@theme-weasel/composables";

import "${CLIENT_FOLDER}modules/blog/styles/index.scss";
import "${CLIENT_FOLDER}modules/navbar/styles/index.scss";
import "${CLIENT_FOLDER}modules/sidebar/styles/index.scss";
import "${CLIENT_FOLDER}modules/outlook/styles/index.scss";
import "${CLIENT_FOLDER}styles/index.scss";

${configImport}

export default defineClientConfig({
  enhance: ({ app, router }) => {
    const { scrollBehavior } = router.options;

    router.options.scrollBehavior = async (...args) => {
      await useScrollPromise().wait();

      return scrollBehavior(...args);
    };

    // register to inject styles
    app.component('ArticleInfo', ArticleInfo)
    app.component('TagInfo', TagInfo)
    app.component('AuthorInfo', AuthorInfo)
    app.component('DateInfo', DateInfo)
    app.component('CategoryInfo', CategoryInfo)
    app.component('OriginalInfo', OriginalInfo)
    app.component('ReadingTimeInfo', ReadingTimeInfo)
    app.component('RecommendList', RecommendList)
    app.component('Pagination', Pagination)
    app.component('Badge', Badge)
    app.component("PageComment", ({ darkmode = false }) => {
    const CommentService = app.component("CommentService");
      return CommentService ? h(CommentService, { darkmode }) : null;
    });
${enhance
  .split("\n")
  .map((item) => `    ${item}`)
  .join("\n")}
  },
  setup: () => {
    setupArticles();
    setupCategoryMap();
    setupTagMap();
    setupStars();
    setupTimelines();
    setupDarkMode();
    setupPureMode();
    setupSidebarItems();
${setup
  .split("\n")
  .map((item) => `    ${item}`)
  .join("\n")}
  },
});`
  );
};
