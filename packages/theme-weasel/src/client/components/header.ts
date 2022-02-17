import { useSiteData } from '@vuepress/client'
import { defineComponent, h } from 'vue'
import Banner from './banner'

export default defineComponent({
  props: {

  },
  setup() {
    const siteData = useSiteData()
    console.log(siteData.value)
    return () => h('header', {
      class: 'header-container'
    }, [
      h('div', {
        class: 'header-nav'
      }, [
        h('div', {
          class: 'header-menu-logo'
        }, siteData.value.title)
      ]),
      /**
       * render banner
       */
      h(Banner)
    ])
  }
})
