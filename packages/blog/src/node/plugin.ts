/**
 * blog plugin
 */
import { watch } from 'chokidar'
import path from 'path'
import cpx from 'cpx2'

import { filterPages, logger } from './utils'
import { preparePageType, prepareFrontmatter, prepareDirectories, directoriesExtendsPageOptions } from './classifier'
import { preparePageComponent, preparePageData, preparePagesComponents, preparePagesData, preparePagesRoutes } from '@vuepress/core'

import type { PluginFunction } from '@vuepress/core'
import type { BlogOptions } from '../typings'

export const blogPlugin = (options: BlogOptions):PluginFunction => (app) => {
  const {
    getInfo = (): Record<string, never> => ({}),
    metaScope = '_blog'
  } = options
  let generatePageKeys: string[] = [];

  if (app.env.isDebug) logger.info(`Options: ${options.toString()}`);
  return {
    name: '@mr-huang/vuepress-plugin-blog',

    define: () => ({
      BLOG_META_SCOPE: metaScope,
    }),

    extendsPage(page): void {
      page.routeMeta = {
        ...(metaScope === '' ? getInfo(page) : { [metaScope]: getInfo(page) }),
        ...page.routeMeta,
      }
    },

    // 为页面增强
    extendsPageOptions: (pageOptions) => {
      directoriesExtendsPageOptions(app, pageOptions, options)
    },

    // 初始化时创建页面
    onInitialized(app) {
      const pages = filterPages(options, app)
      return Promise.all([
          preparePageType(app, options, pages, true).then(keys => {
            generatePageKeys.push(...keys)
          }),
          prepareDirectories(app, options, pages).then(keys => {
            generatePageKeys.push(...keys)
          }),
          prepareFrontmatter(app, options, pages, true).then(keys => {
            generatePageKeys.push(...keys)
          })
        ]).then(() => {
          // console.log(app.pages)
        })
    },

    onWatched: (app, watchers): void => {
      if (!options.hotReload) return

      const pageDataWatcher = watch('page/**/*.js', {
        cwd: app.dir.temp(),
        ignoreInitial: true
      })

      const updateBlogData = ():Promise<void> => {
        const newGeneratedPageKeys: string[] = [];

        const pageMap = filterPages(options, app);
        return Promise.all([
          prepareFrontmatter(app, options, pageMap).then((pageKeys) => {
            newGeneratedPageKeys.push(...pageKeys);
          }),
          preparePageType(app, options, pageMap).then((pageKeys) => {
            newGeneratedPageKeys.push(...pageKeys);
          }),
          prepareDirectories(app, options, pageMap).then(pageKeys => {
            newGeneratedPageKeys.push(...pageKeys);
          })
        ]).then(async () => {
          const pagestoBeRemoved = generatePageKeys.filter(
            (key) => !newGeneratedPageKeys.includes(key)
          );
          const pagestoBeAdded = newGeneratedPageKeys.filter(
            (key) => !generatePageKeys.includes(key)
          );

          if (pagestoBeAdded.length) {
            if (app.env.isDebug)
              logger.info(
                `New pages detected: ${pagestoBeAdded.toString()}`
              );

            // prepare page files
            await Promise.all(
              pagestoBeAdded.map(async (pageKey) => {
                await preparePageComponent(
                  app,
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  app.pages.find(({ key }) => key === pageKey)!
                );
                await preparePageData(
                  app,
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  app.pages.find(({ key }) => key === pageKey)!
                );
              })
            );
          }

          // remove pages
          if (pagestoBeRemoved.length) {
            if (app.env.isDebug)
              logger.info(
                `Removing following pages: ${pagestoBeRemoved.toString()}`
              );

            pagestoBeRemoved.forEach((pageKey) => {
              app.pages.splice(
                app.pages.findIndex(({ key }) => key === pageKey),
                1
              );
            });
          }

          // prepare pages entry
          if (pagestoBeRemoved.length || pagestoBeAdded.length) {
            await preparePagesComponents(app);
            await preparePagesData(app);
            await preparePagesRoutes(app);
          }

          generatePageKeys = newGeneratedPageKeys;

          if (app.env.isDebug) logger.info("temp file updated");

        })
      }

      pageDataWatcher.on('add', () => {
        updateBlogData()
      })
      pageDataWatcher.on('change', () => {
        updateBlogData()
      })
      pageDataWatcher.on('unlink', () => {
        updateBlogData()
      })

      watchers.push(pageDataWatcher);
    },

    onGenerated(app) {
      if (app.env.isBuild) {
        const { directoryClassifier = []} = options

        const dirMap = directoryClassifier.map(item => {
          return {
            source: app.dir.source(item.dirname),
            target: path.posix.join(app.dir.dest(), item.path)
          }
        })

        dirMap.forEach(item => {
          const { source, target } = item
          cpx.copy(`${source}/**/*.{jpg,jpeg,png,gif,bmp,xml}`, target)
        })
        logger.success('copy static file success!')
      }
    }
  }
}
