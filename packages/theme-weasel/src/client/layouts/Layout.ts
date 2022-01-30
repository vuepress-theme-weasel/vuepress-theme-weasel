import { defineComponent, h } from 'vue'
import { usePageData, usePageFrontmatter } from "@vuepress/client"
import { WeaselThemePageFrontmatter } from '../../types'
import HomePage from '../components/home'
export default defineComponent({
  props: {

  },
  setup() {
    // const page = usePageData()
    const frontmatter = usePageFrontmatter<WeaselThemePageFrontmatter>()

    const isHomePage = frontmatter.value.home

    const homePage = () => isHomePage ? h(HomePage) : null

    return () => h('div', {}, [
      homePage()
    ])
  }
})