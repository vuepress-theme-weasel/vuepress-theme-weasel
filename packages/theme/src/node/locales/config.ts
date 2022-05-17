import { ArticleInfoLocaleConfig, PaginationLocaleConfig, ThemeLocaleData, BackToTopLocaleConfig } from "../../typings"

export const themeLocalesData: Record<string, ThemeLocaleData> = {
  "/en/": {
    lang: "en-US",

    // navbarLocales: {
    //   langName: "English",
    //   selectLangText: "Language",
    //   selectLangAriaLabel: "Select language",
    // },

    metaLocales: {
      author: "Author",
      date: "Writing Date",
      origin: "Original",
      views: "Page views",
      category: "Category",
      tag: "Tags",
      readingTime: "Reading Time",
      words: "Words",
      toc: "On This Page",
      prev: "Prev",
      next: "Next",
      lastUpdated: "Last update",
      contributors: "Contributors",
      editLink: "Edit this page",
    },

    blogLocales: {
      article: "Articles",
      articleList: "Article List",
      category: "Category",
      tag: "Tags",
      timeline: "Timeline",
      timelineTitle: "Yesterday Once More!",
      all: "All",
      intro: "Personal Intro",
      star: "Star",
      slides: "Slides",
      encrypt: "Encrypted",
      picture: 'Picture'
    },

    outlookLocales: {
      themeColor: "Theme Color",
      darkmode: "Theme Mode",
      fullscreen: "Full Screen",
      pure: 'pure model'
    },

    // encryptLocales: {
    //   title: "Please enter password",
    //   errorHint: "Please enter the correct password!",
    // },

    routeLocales: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "404msg": [
        "There’s nothing here.",
        "How did we get here?",
        "That’s a Four-Oh-Four.",
        "Looks like we've got some broken links.",
      ],
      back: "Go back",
      home: "Take me home",
      openInNewWindow: "Open in new window",
    },
  },

  "/": {
    lang: "zh-CN",

    // navbarLocales: {
    //   langName: "简体中文",
    //   selectLangText: "选择语言",
    //   selectLangAriaLabel: "选择语言",
    // },

    metaLocales: {
      author: "作者",
      date: "写作日期",
      origin: "原创",
      views: "访问量",
      category: "分类",
      tag: "标签",
      readingTime: "阅读时间",
      words: "字数",
      toc: "此页内容",
      prev: "上一页",
      next: "下一页",
      lastUpdated: "上次编辑于",
      contributors: "贡献者",
      editLink: "编辑此页",
    },

    blogLocales: {
      article: "文章",
      articleList: "文章列表",
      category: "分类",
      tag: "标签",
      timeline: "时间轴",
      timelineTitle: "昨日不在",
      all: "全部",
      intro: "个人介绍",
      star: "收藏",
      slides: "幻灯片",
      encrypt: "加密",
      picture: '相册'
    },

    outlookLocales: {
      themeColor: "主题色",
      darkmode: "外观",
      fullscreen: "全屏",
      pure: '沉浸模式'
    },

    // encryptLocales: {
    //   title: "请输入密码",
    //   errorHint: "请输入正确密码",
    // },

    routeLocales: {
      "404msg": [
          "这里什么也没有",
          "我们是怎么来到这儿的？",
          "这 是 四 零 四 !",
          "看起来你访问了一个失效的链接",
        ],
        back: "返回上一页",
        home: "带我回家",
        openInNewWindow: "Open in new window",
      },
  }
}

/**
 * Default locales config for Article Info
 */
export const articleInfoLocales: ArticleInfoLocaleConfig = {
  '/en/': {
    author: 'Author🖊',
    date: 'Writing Date📅',
    isOrigin: 'Original💡',
    views: 'Page views🔢',
    category: 'Category🌈',
    tag: 'Tags🏷',
    readingTime: 'Reading Time⌛',
    words: 'Words🔠',
  },

  '/': {
    author: '作者🖊',
    date: '写作日期📅',
    isOrigin: '原创💡',
    views: '访问量🔢',
    category: '分类🌈',
    tag: '标签🏷',
    readingTime: '阅读时间⌛',
    words: '字数🔠',
  }
}

/**
 * 枫叶
 */
export const paginationLocales: PaginationLocaleConfig = {
  "/": {
    prev: "上一页",
    next: "下一页",
    navigate: "跳转到",
    button: "前往",
    errorText: "请输入 1 到 $page 之前的页码！",
  }
};

export const backToTopLocales: BackToTopLocaleConfig = {
  "/en/": {
    backToTop: "Back to top",
  },

  "/": {
    backToTop: "返回顶部",
  }
};
