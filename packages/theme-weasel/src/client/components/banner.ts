import { defineComponent, h } from 'vue'
export default defineComponent({
  props: {

  },
  setup() {
    return () => h('div', {
      class: 'banner-container'
    }, [
      h('div', {
        class: 'banner-item'
      }, [
        h('div', {
          class: 'banner-image'
        }, [
          h('img', {
            src: 'http://img.mp.sohu.com/upload/20170623/b4c7e45eba0e4ded9efd2e05acb12d4d_th.png',
            class: 'banner-item-image'
          })
        ])
      ])
    ])
  }
})
