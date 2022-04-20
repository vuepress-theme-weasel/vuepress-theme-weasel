import { pageTypeMap } from '@temp/blog/pageType'
import type { ComputedRef } from 'vue'

export const usePageType = <T extends Record<string, unknown> = Record<string, unknown>>(key = ''):ComputedRef<BlogTy> => {
  console.log(pageTypeMap)
}
