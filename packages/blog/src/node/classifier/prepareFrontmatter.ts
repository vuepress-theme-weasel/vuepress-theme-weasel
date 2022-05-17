/**
 * frontmatter classifier
 */

import { App, createPage, Page } from "@vuepress/core";
import { BlogOptions, FrontmatterClassifierOptions, FrontmatterMap, PageMap } from "../../typings";
import { logger, removeLeadingSlash } from "../utils";

const HMR_CODE = `
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateBlogCategory) {
    __VUE_HMR_RUNTIME__.updateBlogCategory(frontmatterMap)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ frontmatterMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogCategory(frontmatterMap)
  })
}
`

const defaultSlugify = (name: string): string => name.replace(/[ _]/g, '-').toLowerCase()

const createFrontmatterPromise = (
  app: App,
  frontmatterClassifiers: FrontmatterClassifierOptions[],
  slugify: (name: string) => string,
  pages: PageMap,
  init = false
  ) => {
  return frontmatterClassifiers.map(async (classifier, index) => {
    const {
      key,
      getter,
      sorter = (): number => -1,
      path = `/${key}/`,
      layout = 'Layout',
      frontmatter = (): Record<string, string> => ({}),
      itemPath = `/:key/:name/`,
      itemLayout = 'Layout',
      itemFrontmatter = (): Record<string, string> => ({})
    } = classifier

    if (typeof key !== 'string' || !key) {
      logger.error(`Invalid 'key' option ${key} in 'frontmatter classifier [${index}]'`)

      return null
    }

    if (typeof getter !== 'function') {
      logger.error(
        `Invalid 'getter' option in 'frontmatter classifier [${index}]', it should be a function!`
      )

      return null
    }

    if (app.env.isDebug) logger.info(`Generating ${key} Frontmatter.\n`)

    const frontmatterMap: FrontmatterMap = {}
    const pagePaths: string[] = []
    const getItemPath =
      typeof itemPath === 'function'
        ? itemPath
        : (name: string): string => itemPath
              .replace(/:key/g, slugify(key))
              .replace(/:name/g, slugify(name))

    for (const routeLocale in pages) {
      if (path) {
        const pagePath = `${routeLocale}${removeLeadingSlash(
            path.replace(/:key/g, slugify(key))
          )}`;
        const mainPage = await createPage(app, {
          path: `${routeLocale}${removeLeadingSlash(
            path.replace(/:key/g, slugify(key))
          )}`,
          frontmatter: {
            ...frontmatter(routeLocale),
            blog: {
              type: 'frontmatter',
              key,
            },
            layout,
          },
        })

        const index = app.pages.findIndex(({ path }) => path === pagePath);

        if (index === -1) app.pages.push(mainPage);
        else if (app.pages[index].key !== mainPage.key) {
          app.pages.splice(index, 1, mainPage);
          if (init) logger.warn(`Overiding existed path ${pagePath}`);
        }
        // app.pages.push(mainPage)
        pagePaths.push(mainPage.path)

        frontmatterMap[routeLocale] = {
          path: mainPage.path,
          map: {},
        }
      } else {
        frontmatterMap[routeLocale] = {
          path: '',
          map: {},
        }
      }

      const { map } = frontmatterMap[routeLocale]
      const pageMapStore: Record<string, Page[]> = {}

      for (const page of pages[routeLocale]) {
        const categories = getter(page)

        for (const frontmatter of categories) {
          if (!map[frontmatter]) {
            const itemPath = getItemPath(frontmatter)

            if (itemPath) {
              const pagePath = `${routeLocale}${removeLeadingSlash(itemPath)}`;
              const page = await createPage(app, {
                path: `${routeLocale}${removeLeadingSlash(itemPath)}`,
                frontmatter: {
                  ...itemFrontmatter(frontmatter, routeLocale),
                  blog: {
                    type: 'frontmatter',
                    name: frontmatter,
                    key,
                  },
                  layout: itemLayout,
                },
              })

              const index = app.pages.findIndex(({ path }) => path === pagePath);

              if (index === -1) app.pages.push(page);
              else if (app.pages[index].key !== page.key) {
                app.pages.splice(index, 1, page);
                if (init) logger.warn(`Overiding existed path ${pagePath}`);
              }
              // app.pages.push(page)
              pagePaths.push(page.path)

              map[frontmatter] = {
                path: page.path,
                keys: [],
              }
            } else {
              map[frontmatter] = {
                path: '',
                keys: [],
              }
            }

            pageMapStore[frontmatter] = []
          }

          pageMapStore[frontmatter].push(page)
        }
      }

      for (const frontmatter in pageMapStore)
        map[frontmatter].keys = pageMapStore[frontmatter]
          .sort(sorter)
          .map(({ key }) => key)

      if (app.env.isDebug) {
        let infoMessage = `Route ${routeLocale} in ${key} frontmatter:\n`

        for (const frontmatter in map) {
          const { path, keys } = map[frontmatter]

          infoMessage += `name: ${frontmatter} ${
            path ? `path: ${path} ` : ''
          }items: ${keys.length}`
        }

        logger.info(infoMessage)
      }
    }

    return {
      key,
      map: frontmatterMap,
      pagePaths,
    }
  })
}

export const prepareFrontmatter = (app: App, options: Partial<BlogOptions>, pages: PageMap, init = false) => {

  const {
    frontmatterClassifier = [],
    slugify = defaultSlugify
  } = options

  return Promise.all(createFrontmatterPromise(app, frontmatterClassifier, slugify, pages, init)).then(async (result) => {
    const finalMap: Record<string, FrontmatterMap> = {}
    const paths: string[] = []

    result
      .filter(
        (
          item
        ): item is {
          key: string
          map: FrontmatterMap
          pagePaths: string[]
        } => item !== null
      )
      .forEach(({ key, map, pagePaths }) => {
        finalMap[key] = map
        paths.push(...pagePaths)
      })

    await app.writeTemp(
      `blog/frontmatter.js`,
      `export const frontmatterMap = ${JSON.stringify(finalMap)}\n${HMR_CODE}`
    )

    if (app.env.isDebug) logger.info('All types generated.')

    return paths
  })
}
