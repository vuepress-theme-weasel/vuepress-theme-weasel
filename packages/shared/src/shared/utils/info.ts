/*
 * @Author: your name
 * @Date: 2022-02-11 16:15:43
 * @LastEditTime: 2022-02-15 17:47:24
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vuepress-theme-Weasel\packages\shared\src\shared\utils\info.ts
 */
import { capitalize } from "./capitalize";
import type { Author, AuthorInfo } from "../../types";

export const getAuthor = (
  author: Author | false | undefined,
  canDisable = false
): AuthorInfo[] => {
  if (author) {
    if (Array.isArray(author)) {
      return author.map((item) =>
        typeof item === "string" ? { name: item } : item
      );
    }

    if (typeof author === "string") return [{ name: author }];

    if (typeof author === "object" && author.name) return [author];

    console.error(
      `Expect 'author' to be \`AuthorInfo[] | AuthorInfo | string[] | string ${
        canDisable ? "" : "| false"
      } | undefined\`, but got`,
      author
    );

    return [];
  }

  return [];
};

export const getCategory = (
  category: string[] | string | undefined
): string[] => {
  if (category) {
    if (Array.isArray(category)) return category.map(capitalize);
    if (typeof category === "string") return [capitalize(category)];

    console.error(
      `Expect 'category' to be \`string[] | string | undefined\`, but got`,
      category
    );
  }

  return [];
};

export const getTag = (tag: string[] | string | undefined): string[] => {
  if (tag) {
    if (Array.isArray(tag)) return tag;
    if (typeof tag === "string") return [tag];

    console.error(
      `Expect 'tag' to be \`string[] | string | undefined\`, but got`,
      tag
    );
  }

  return [];
};
