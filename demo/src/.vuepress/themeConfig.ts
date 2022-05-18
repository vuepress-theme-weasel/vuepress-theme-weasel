import * as navbar from "./configs/navbar"
import * as sidebar from "./configs/sidebar"
import weaselTheme from '@mr-huang/vuepress-theme-weasel'

console.log(weaselTheme)
export default weaselTheme({
  author: {
    name: "Mr.Huang",
    url: "https://mrhope.site",
  },
  hostname: 'https://vuepress-theme-weasel.github.io/vuepress-theme-weasel',
  articlePerPage: 2,
  repo: "vuepress-theme-hope/vuepress-theme-hope",
  lang: 'zh-CN',
  // 开启blog
  blog: {
    avatar: './avatar.jpg',
    medias: {
      Baidu: "https://example.com",
      Bitbucket: "https://example.com",
      Dingding: "https://example.com",
      Discord: "https://example.com",
      Dribbble: "https://example.com",
      Email: "https://example.com",
      Evernote: "https://example.com",
      Facebook: "https://example.com",
      Flipboard: "https://example.com",
      Gitee: "https://example.com",
      GitHub: "https://example.com",
      Gitlab: "https://example.com",
      Gmail: "https://example.com",
      Instagram: "https://example.com",
      Lines: "https://example.com",
      Linkedin: "https://example.com",
      Pinterest: "https://example.com",
      Pocket: "https://example.com",
      QQ: "https://example.com",
      Qzone: "https://example.com",
      Reddit: "https://example.com",
      Rss: "https://example.com",
      Steam: "https://example.com",
      Twitter: "https://example.com",
      Wechat: "https://example.com",
      Weibo: "https://example.com",
      Whatsapp: "https://example.com",
      Youtube: "https://example.com",
      Zhihu: "https://example.com",
    },
  },
  // 编辑连接
  editLink: true,
  nextLinks: true,
  prevLinks: true,
  pageInfo: ["Category", "Tag", "ReadingTime"],
  plugins: {
    blog: {
      autoExcerpt: true,
    },
    prismjs: true,
    permalink: {
      format: ':year-:month-:day/:id'
    },
    // comment: {
    //   type: "twikoo",
    //   // repo: "vuepress-theme-hope/giscus-discussions",
    //   envId: "https://blog-comment-qihd.vercel.app/",
    //   // category: "Announcements",
    //   // categoryId: "DIC_kwDOG_Pt2M4COD69",
    // },export http_proxy="http://127.0.0.1:1087" export https_proxy="http://127.0.0.1:1087"
    comment: {
      type: "giscus",
      repo: "vuepress-theme-weasel/blog-comment",
      repoId: "R_kgDOHEoaBA",
      category: "Announcements",
      categoryId: "DIC_kwDOHEoaBM4COShW",
    },
    // comment: {
    //   type: "giscus",
    //   repo: "vuepress-theme-hope/giscus-discussions",
    //   repoId: "R_kgDOG_Pt2A",
    //   category: "Announcements",
    //   categoryId: "DIC_kwDOG_Pt2M4COD69",
    // },
  },
  // navbar: nav,
  // sidebar,
  locales: {
    "/en/": {
      // navbar
      // navbar: navbar.en,

      // sidebar
      // sidebar: sidebar.en,

      footer: "Default footer",

      displayFooter: true,

      blog: {
        description: "A FrontEnd programmer",
        intro: "about-me.html"
      },

      metaLocales: {
        editLink: "Edit this page on GitHub",
      },
    },

    /**
     * Chinese locale config
     */
    "/": {
      // navbar
      navbar: navbar.zh,

      // sidebar
      // sidebar: sidebar.zh,

      footer: "默认页脚",

      displayFooter: true,

      blog: {
        description: "一个前端开发者",
        intro: "about-me.html",
      },

      // page meta
      metaLocales: {
        editLink: "在 GitHub 上编辑此页",
      },
    },
  },
})
