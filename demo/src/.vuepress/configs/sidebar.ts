export default {
  '/vue/': getVue3Sidebar(),
  '/javascript/': getJavascriptSidebar()
}

function getJavascriptSidebar() {
  return [
    {
      text: 'blob类型的数据转换成json数据',
      link: '/javascript/blob类型的数据转换成json数据.html'
    }
  ]
}

function getVue3Sidebar() {
  return [
  {
    text: 'vue3起手式',
    children: [
      {
        text: 'createApp创建过程解析',
        link: '/vue/vue3起手式/createApp创建过程解析.html'
      }
    ]
  },
  {
    text: 'vue使用技巧',
    children: [
      {
        text: 'createApp创建过程解析',
        link: '/vue/vue使用技巧/实用的vue指令结合(持续更新).html'
      },
      {
        text: 'vue自定义指令的jsx语法',
        link: '/vue/vue使用技巧/vue自定义指令的jsx语法.html'
      }
    ]
  }
]
}