import { defineClientConfig } from '@vuepress/client'
import { clientEnhance } from './appEnhance'
import { clientAppSetup } from './appSetup'
import { clientEnhance as blogClientEnhance } from '@theme-weasel/modules/blog'
import { clientEnhance as navbarClientEnhance } from '@theme-weasel/modules/navbar'
import { clientEnhance as outlookClientEnhance, clientAppSetup as outlookClientAppSetup } from '@theme-weasel/modules/outlook'
import { clientEnhance as sidebarClientEnhance, clientAppSetup as sidebarClientAppSetup } from '@theme-weasel/modules/sidebar'
import BackToTop from './root-components/BackToTop'
import { ComponentOptions } from 'vue'

export default defineClientConfig({
  enhance: ({ app }) => {
    clientEnhance(app)
    blogClientEnhance(app)
    navbarClientEnhance(app)
    outlookClientEnhance()
    sidebarClientEnhance(app)
  },
  setup: () => {
    clientAppSetup()
    outlookClientAppSetup()
    sidebarClientAppSetup()
  },
  rootComponents: [BackToTop as unknown as ComponentOptions]
})