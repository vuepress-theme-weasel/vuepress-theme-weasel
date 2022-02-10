import { defineComponent, h } from 'vue'
import Header from './header'
import NavBar from './navBar'
import { usePageFrontmatter, Content } from '@vuepress/client'
import { WeaselThemePageFrontmatter } from '../../types'
import MarkdownContent from './markdownContent'

// home page
export default defineComponent({
  setup() {
    const frontmatter = usePageFrontmatter<WeaselThemePageFrontmatter>()
    const feature = () => {
      return h('div', {
        class: 'weasel-features'
      }, [
        frontmatter.value.features && frontmatter.value.features.length ? frontmatter.value.features.map(feature => {
          return h('div', {
            class: 'feature'
          }, [
            h('h2', {}, feature.title),
            h('p', {}, feature.details)
          ])
        }) : null
      ])
    }
    return () => h('div', {
      class: 'home-page-container'
    }, [
      /**
       * render header
       */
      h(Header),

      h('div', {
        class: 'content-container'
      }, [
        /**
         * render navbar
         */
        h(NavBar),

        /**
         * render feature
         */
        feature(),

        /**
         * render content
         */
        h(MarkdownContent)
      ])
    ])
  }
})
