import { defineClientAppEnhance } from "@vuepress/client"
import { h } from 'vue'

// import style
import "./styles/index.scss"

// clinet entry
export default defineClientAppEnhance(({ app }) => {
  // compat with vuepress-plugin-comment2
  app.component("PageComment", ({ darkmode }: { darkmode?: boolean }) => {
    const CommentService = app.component("CommentService");

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return CommentService ? h(CommentService, { darkmode }) : null;
  });
});
