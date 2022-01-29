/*
 * @Author: cavinHuang
 * @Date: 2022-01-28 09:06:21
 * @LastEditTime: 2022-01-28 09:06:21
 * @LastEditors: cavinHuang
 * @Description: getScrollTop
 * @FilePath: \vuepress-theme-Weasel\packages\vuepress-plugin-right-anchor\src\client\utils\getScrollTop.ts
 */

export const getScrollTop = (): number =>
  window.pageYOffset ||
  document.documentElement.scrollTop ||
  document.body.scrollTop ||
  0