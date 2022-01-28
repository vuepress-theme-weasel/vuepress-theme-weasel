/*
 * @Author: cavinHuang
 * @Date: 2022-01-28 09:07:08
 * @LastEditTime: 2022-01-28 09:07:09
 * @LastEditors: cavinHuang
 * @Description: scrollTop
 * @FilePath: \vuepress-theme-Weasel\packages\vuepress-plugin-right-anchor\src\client\utils\scrollTo.ts
 */

export const scrollToTop = (top: number = 0): void => 
  window.scrollTo({ top, behavior: 'smooth' })

export const scrollToTitle = (id: string): void => 
  scrollToTop(document.getElementById(id)?.offsetTop)