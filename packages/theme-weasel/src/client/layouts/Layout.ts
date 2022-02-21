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
import CommonWrapper from '../components/CommonWrapper'
import FadeSlideY from '../components/transitions/FadeSlideY'
import NormalPage from '../components/NormalPage'

export default defineComponent({
  props: {

  },
  setup() {
    const page = usePageData();
    const frontmatter = usePageFrontmatter<WeaselThemePageFrontmatter>()

    const isHomePage = frontmatter.value.home
    const isProjectHomePage = frontmatter.value.project && isHomePage
    const isNormalHomePage = isHomePage && !frontmatter.value.project

    console.log('=======++++=======', frontmatter.value, isNormalHomePage);

    const projectHomePage = () => isProjectHomePage ? h(ProjectHome) : h(FadeSlideY, {}, {
      default: () => h(NormalPage, { key: page.value.path })
    })
    const homePage = () => isNormalHomePage ? h(HomePage) : projectHomePage()

    return () => h(CommonWrapper, {
      class: 'body-content'
    }, {
      default: () => homePage()
    })
  }
})