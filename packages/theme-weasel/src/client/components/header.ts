import { defineComponent, h } from 'vue'
export default defineComponent({
  props: {

  },
  setup() {
    return () => h('header', {
      class: 'header-container'
    }, [
      h('div', {
        class: 'header-menu-icon'
      })
    ])
  }
})
