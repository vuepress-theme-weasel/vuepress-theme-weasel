import { defineComponent, h } from 'vue'
import Header from './header'
export default defineComponent({
  props: {

  },
  setup() {
    return () => h(Header)
  }
})
