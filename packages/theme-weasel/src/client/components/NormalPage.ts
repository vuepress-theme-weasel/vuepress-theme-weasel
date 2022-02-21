import { defineComponent, h, VNode } from 'vue'
import Header from './header'
import NavBar from './navBar'
import MarkdownContent from './markdownContent'
export default defineComponent({
  name: "NormalPage",
  setup(_props, { slots }) {
    return (): VNode =>
      h("main", { class: "page" }, [
        slots.top?.(),
        h(Header),
        h(NavBar),
        // h(resolveComponent("PageInfo"), { ...pageInfoProps.value }),
        h(MarkdownContent),
        // h(PageMeta),
        // h(PageNav),
        // h(resolveComponent("CommentService")),
        slots.bottom?.(),
      ]);
  }
})
