import { defineClientAppEnhance } from "@vuepress/client"
import BlogWrapper from './Wrapper.vue'

// import style
import "./styles/index.scss"

// clinet entry
export default defineClientAppEnhance(({ app }) => {
  app.component('BlogWrapper', BlogWrapper)
});
