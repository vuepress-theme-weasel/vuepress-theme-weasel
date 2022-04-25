import { computed } from 'vue'
import { usePageFrontmatter as _usePageFrontmatter } from '@vuepress/client'
import { BasePageFrontMatter } from '../../typings'

export const usePageFrontmatter = () => computed(() => _usePageFrontmatter<BasePageFrontMatter>().value)
