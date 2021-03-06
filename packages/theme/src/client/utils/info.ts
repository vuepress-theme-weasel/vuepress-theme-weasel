import { capitalize } from "@mr-huang/vuepress-shared/lib/client"
import { Author, AuthorInfo } from "@mr-huang/vuepress-shared"

/**
 * 获取作者信息
 * @param author
 * @param canDisable
 * @returns
 */
export const getAuthor = (
  author: Author | false | undefined,
  canDisable = false
): AuthorInfo[] => {
  if (author) {
    if (Array.isArray(author)) {
      return author.map((item) =>
        typeof item === 'string' ? { name: item } : item
      )
    }

    if (typeof author === 'string') return [{ name: author }]

    if (typeof author === 'object' && author.name) return [author]

    console.error(`Expect 'author' to be \`AuthorInfo[] | AuthorInfo | string[] | string ${ canDisable ? '' : '| false' } | undefined\`, but got`, author)

    return []
  }

  return []
}

/**
 * 获取分类
 * @param category
 * @returns
 */
export const getCategory = (
  category: string[] | string | undefined
): string[] => {
  if (category) {
    if (Array.isArray(category)) return category.map(capitalize)
    if (typeof category === 'string') return [capitalize(category)]

    console.error(
      `Expect 'category' to be \`string[] | string | undefined\`, but got`,
      category
    )
  }

  return []
}

/**
 * 获取标签
 * @param tag
 * @returns
 */
export const getTag = (tag: string[] | string | undefined): string[] => {
  if (tag) {
    if (Array.isArray(tag)) return tag
    if (typeof tag === 'string') return [tag]

    console.error(
      `Expect 'tag' to be \`string[] | string | undefined\`, but got`,
      tag
    )
  }

  return []
}
