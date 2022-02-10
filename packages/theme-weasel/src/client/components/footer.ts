import { Content, usePageFrontmatter } from '@vuepress/client'
import { defineComponent, h } from 'vue'
import { WeaselThemePageFrontmatter } from '../../types'
export default defineComponent({
  props: {

  },
  setup() {
    const frontmatter = usePageFrontmatter<WeaselThemePageFrontmatter>()
    const footerCopyright = () => frontmatter.value.footer ? h('div', {
        class: 'footer'
      }, frontmatter.value.footer) :
      h(Content, {
        'slot-key': 'footer',
        class: 'footer'
      })
    const footerContact = () => {
      return h('div', {
        class: 'contact-item'
      }, [
        h('img', {
          src: ''
        })
      ])
    }
    const footerContent = () => {
      return h('div', {
        class: 'footer-content'
      }, [
        h('div', {
          class: 'footer-logo'
        }, 'CavinHuang'),
        h('div', {
          class: 'footer-center'
        }),
        h('div', {
          class: 'footer-right'
        }, [
          footerContact()
        ])
      ])
    }
    return () => h('footer', {
      class: 'footer-container'
    }, [
      footerContent(),
      footerCopyright()
    ])
  }
})
