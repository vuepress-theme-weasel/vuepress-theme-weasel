import { computed } from 'vue'
import { usePageFrontmatter as _usePageFrontmatter } from '@vuepress/client'
import { WeaselThemePageFrontmatter } from '../../typings'

export const usePageFrontmatter = () => computed(() => _usePageFrontmatter<WeaselThemePageFrontmatter>().value)
