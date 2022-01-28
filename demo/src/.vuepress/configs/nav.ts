export default [
  { text: "vue学习", link: "/vue/" },
  { text: "React学习", link: "/react/" },
  { text: "PHP学习", link: "/php/" },
  { text: "算法学习", link: "/algorithm/", children: [
    { text: '数据结构', link: '/algorithm/dataStructure/' },
    { text: '算法分类', link: '/algorithm/category/' },
    { text: 'leeCode', link: '/algorithm/leecode/' },
    { text: '剑指offer', link: '/algorithm/sword-finger-offer/' },
  ] },
  { text: "JavaScript", link: "/javascript/" },
  { text: "TypeScript", link: "/typescript/" },
  { text: "开源项目", link: "/project/" },
  { text: "博客", link: "/blog/", children: [
    {text: '全部文章', link: '/blog/'},
    {text: '分类一', link: '/blog/'},
  ] },
]
