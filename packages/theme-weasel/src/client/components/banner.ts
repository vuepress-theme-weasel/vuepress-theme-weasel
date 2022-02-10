import { defineComponent, h } from 'vue'
export default defineComponent({
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
            src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.niutuku.com%2Fdesk%2F130220%2F17%2F17-niutuku.com-439.jpg&refer=http%3A%2F%2Fimg2.niutuku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1646980276&t=1f374dacd52026cf93c7c8e80f7a694c',
            class: 'banner-item-image'
          })
        ])
      ])
    ])
  }
})
