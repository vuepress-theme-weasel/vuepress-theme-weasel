
export const zh = [
  { text: "使用指南", icon: "creative", link: "/guide/" },
  {
    text: "博文",
    icon: "edit",
    prefix: "/posts/",
    children: [
      {
        text: "工程化",
        icon: "edit",
        prefix: "工程化/",
        children: [
          { text: "文章 1", icon: "edit", link: "article1" },
          { text: "文章 2", icon: "edit", link: "article2" },
          "article3",
          "article4",
        ],
      },
      {
        text: "算法学习",
        icon: "edit",
        prefix: "算法学习/",
        children: [
          {
            text: "文章 5",
            icon: "edit",
            link: "article/article5",
          },
          {
            text: "文章 6",
            icon: "edit",
            link: "article/article6",
          },
          "article/article7",
          "article/article8",
        ],
      },
      {
        text: "JavaScript",
        icon: "edit",
        prefix: "javascript/",
        children: [
          {
            text: "文章 5",
            icon: "edit",
            link: "article/article5",
          },
          {
            text: "文章 6",
            icon: "edit",
            link: "article/article6",
          },
          "article/article7",
          "article/article8",
        ],
      },
      {
        text: "vue",
        icon: "edit",
        prefix: "vue/",
        children: [
          {
            text: "文章 5",
            icon: "edit",
            link: "article/article5",
          },
          {
            text: "文章 6",
            icon: "edit",
            link: "article/article6",
          },
          "article/article7",
          "article/article8",
        ],
      },
      { text: "文章 9", icon: "edit", link: "article9" },
      { text: "文章 10", icon: "edit", link: "article10" },
    ],
  },
  {
    text: 'bate',
    icon: "note",
    children: [
      {
        text: "文档",
        link: "https://vuepress-theme-weasel.github.io/vuepress-theme-weasel",
      },
      {
        text: "演示",
        link: "https://vuepress-theme-weasel.github.io/vuepress-theme-weasel",
      },
    ],
  },
]
