import { defineComponent, h } from 'vue'
import Header from './header'
import Banner from './banner'

export default defineComponent({
  props: {

  },
  setup() {
    return () => h('div', {
      class: 'home-page-container'
    }, [
      h(Header),
      // banner
      h(Banner)
    ])
  }
})
