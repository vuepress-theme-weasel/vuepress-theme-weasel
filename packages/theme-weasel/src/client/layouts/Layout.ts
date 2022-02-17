/*
 * @Author: cavinHuang
 * @Date: 2022-01-30 09:29:24
 * @LastEditTime: 2022-02-11 15:42:14
 * @LastEditors: cavinHuang
 * @Description: theme layout
 * @FilePath: \vuepress-theme-Weasel\packages\theme-weasel\src\client\layouts\Layout.ts
 */
import { defineComponent, h } from 'vue'
import { usePageData, usePageFrontmatter } from "@vuepress/client"
import { WeaselThemePageFrontmatter } from '../../types'
import HomePage from '../components/home'
import ProjectHome from '../components/projectHome/ProjectHome'
import Footer from '../components/footer'

export default defineComponent({
  props: {

  },
  setup() {
    const frontmatter = usePageFrontmatter<WeaselThemePageFrontmatter>()

    const isHomePage = frontmatter.value.home
    const isProjectHomePage = frontmatter.value.project && isHomePage
    const isNormalHomePage = isHomePage && !frontmatter.value.home

    console.log(frontmatter.value);

    const projectHomePage = () => isProjectHomePage ? h(ProjectHome) : null
    const homePage = () => isNormalHomePage ? h(HomePage) : projectHomePage()

    return () => h('main', {
      class: 'body-content'
    }, [
      homePage(),
      h(Footer)
    ])
  }
})