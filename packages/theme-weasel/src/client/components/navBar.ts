import { defineComponent, h } from 'vue'

type NavItem = {
  text: string
  url: string
}

const navConfig: NavItem[] = [
  {
    url: '/',
    text: '博客首页'
  },
  {
    url: '/list',
    text: '博客目录'
  },
  {
    url: '/picture',
    text: '图片分享'
  },
  {
    url: '/rss',
    text: '订阅信息'
  }
]

export default defineComponent({
  props: {

  },
  setup() {
    const navItem = (item: NavItem) => {
      return h('div', {
        class: 'nav-bar__item'
      }, [
        h('h3', {
          class: 'nav-bar__text'
        }, item.text)
      ])
    }
    const navComponent = () => {
      return h('div', {
        class: 'nav-bar-wrap'
      }, [
        (navConfig.map(item => {
          return navItem(item)
        }))
      ])
    }
    return () => h('div', {
      class: 'nav-bar-container'
    }, [
      h('div', {
        class: 'nav-logo'
      }, 'CavinHuang'),
      navComponent()
    ])
  }
})
