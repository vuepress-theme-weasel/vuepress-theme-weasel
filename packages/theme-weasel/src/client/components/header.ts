import { defineComponent, h } from 'vue'
import Banner from './banner'

export default defineComponent({
  props: {

  },
  setup() {
    return () => h('header', {
      class: 'header-container'
    }, [
      h('div', {
        class: 'header-nav'
      }, [
        h('div', {
          class: 'header-menu-icon'
        })
      ]),
      /**
       * render banner
       */
      h(Banner)
    ])
  }
})
