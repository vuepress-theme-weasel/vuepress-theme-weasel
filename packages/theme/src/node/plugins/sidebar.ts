/**
 * side bar plugin
 */

import { App } from '@vuepress/core'
import { fs, path } from '@vuepress/utils'
import { logger } from '../utils'
import { ThemeSidebarArrayConfig, ThemeSidebarGroupItem, WeaselThemeConfig } from './../../typings'

const INDEX_MD_FILE = 'README.md'

/**
 * 页面 page frontmatter dir配置
 */
interface PageFrontmatterDirInfo {
  text?: string;
  icon?: string;
  collapsable?: boolean;
  link?: boolean;
  index?: number | boolean;
}

/**
 * 文件信息
 */
interface FileInfo {
  type: "file";
  path: string;
  title: string;
  index: boolean | number | null;
}

/**
 * 文件夹信息
 */
interface DirInfo {
  type: "dir";
  info: {
    text: string;
    icon?: string;
    collapsable?: boolean;
    link?: string;
  };
  index: boolean | number | null;
  children: Info[];
}

/**
 * 文件或者文件夹的信息
 */
type Info = FileInfo | DirInfo;

/**
 * 创建sidebar配置项
 * @param sidebarConfig
 * @param prefix
 * @returns
 */
const getGeneratePaths = (
  sidebarConfig: ThemeSidebarArrayConfig,
  prefix = ""
): string[] => {
  const result: string[] = []

  sidebarConfig.forEach((item) => {
    // sidebar group 配置
    if (typeof item === "object" && "children" in item) {
      const childPrefix = `${prefix}${item.prefix || ""}`

      // 创建子项
      if (item.children === "structure") {
        result.push(childPrefix)
      } else {
        result.push(...getGeneratePaths(item.children, childPrefix))
      }
    }
  })

  return result
}

/**
 * 过滤函数
 * @param app
 * @param dir
 * @returns
 */
const isThemeSidebarDir = (app: App, dir: string): boolean => {
  return dir !== '.vuepress' && !Object.keys(app.siteData.locales).includes(`/${dir}/`)
}

/**
 * 获取文件状态
 * @param fileFullPath
 */
const getFileStat = (app: App, rootDir: string, fileName: string, fileFullPath: string, fileRelativePath: string):Info | null => {
  const stat = fs.statSync(fileFullPath)
  // 是文件夹 继续往下查找
  if (stat.isDirectory()) {
    // 获取当前文件夹下的信息
    const result = getSidebarFileItemInfo(app, rootDir, fileRelativePath)

    // 不包含readme
    if (!result.some(subDirFilePath => subDirFilePath.type === 'file' && subDirFilePath.path === INDEX_MD_FILE)) {
      if (app.env.isDebug) logger.warn(`README.md not found in ${path.join(rootDir,fileRelativePath)}`)
      return null
    }

    /**
     * 获取符合条件的页面
     */
    const page = app.pages.find(page => {
      return page.filePathRelative === path.join(rootDir, fileRelativePath, INDEX_MD_FILE)
    })!

    const dirInfo = (page.frontmatter.dir || {}) as PageFrontmatterDirInfo

    return {
      type: 'dir',
      info: {
        text: dirInfo.text || page.title,
        icon: dirInfo.icon || (page.frontmatter.icon as string | undefined),
        collapsable: 'collapsable' in dirInfo ? dirInfo.collapsable : true,
        prefix: `${fileName}/`
      },
      index: 'index' in dirInfo ? (dirInfo.index as number | boolean) : null,
      children: (dirInfo.link ? result.filter(item => item.type !== 'file' || item.path !== INDEX_MD_FILE) : result).filter(item => item.index !== false) // items with `index: false` should be dropped here
    } as DirInfo
  }

  if (fileName.endsWith('.md')) {
    const page = app.pages.find(page => page.filePathRelative === path.join(rootDir, fileRelativePath))!
    return {
      type: 'file',
      path: fileName,
      title: page.title,
      index: "index" in page.frontmatter ? (page.frontmatter.index as boolean | number) : null
    }
  }

  return null
}

/**
 * 获取sidebar的信息
 * @param app
 * @param rooDir
 * @param base
 */
const getSidebarFileItemInfo = (
  app: App,
  rootDir: string,
  base = ''
): Info[] => {
  try {
    const dirFullPath = app.dir.source(rootDir, base)

    const fileItems = fs.readdirSync(dirFullPath)
    const stats = fileItems.filter(dir => {
      if (rootDir === '' && base === '') {
        return isThemeSidebarDir(app, dir)
      }
      return true
    }).map(fileName => {
      // 相对路径
      const fileRelativePath = path.join(base, fileName)
      // 绝对路径
      const fileFullPath = path.join(dirFullPath, fileName)
      return getFileStat(app, rootDir, fileName, fileFullPath, fileRelativePath)
    }).filter(info => info !== null) as Info[]

    return stats.sort((itemA, itemB) => {
      // README.md必须放在第一位
      if (itemA.type === "file" && itemA.path === "README.md") return -1;
      if (itemB.type === "file" && itemB.path === "README.md") return 1;

      if (itemA.index) {
        // 校验index
        if (itemB.index) return Number(itemA.index) - Number(itemB.index);

        // b 没有 index
        return -1;
      }
      // A 没有index
      else if (itemB.index) return 1;

      // 根据标题计算排序
      return (
        itemA.type === "file" ? itemA.title : itemA.info.text
      ).localeCompare(
        itemB.type === "file" ? itemB.title : itemB.info.text
      )
    })

  } catch(err) {
    const error = err as NodeJS.ErrnoException
    if (error.code === "ENOENT") {
      logger.warn(`${path.join(rootDir,base)} does not exists, you probably have a wrong config.`);
      return [];
    }
    logger.warn(`Reading ${path.join(rootDir, base)} failed with err:`);
    console.error(err);
    return [];
  }
}

/**
 * 获取sidebar信息
 * @param infos
 * @returns
 */
const getSidebarItems = (infos: Info[]): (ThemeSidebarGroupItem | string)[] => {
  return infos.map((info) => {
    if (info.type === "file") return info.path

    return {
      ...info.info,
      children: getSidebarItems(info.children)
    }
  })
}

export const prepareSidebarData = (
  app: App,
  themeConfig: WeaselThemeConfig
) => {
  const generatePaths: string[] = []

  Object.entries(themeConfig.locales || []).forEach(item => {
    const [ localePath, { sidebar }] = item

    if (Array.isArray(sidebar)) {
      generatePaths.push(...getGeneratePaths(sidebar))
    } else if (typeof sidebar === 'object') {
      Object.entries(sidebar).forEach(sidebarItem => {
        const [ prefix, config ] = sidebarItem
        if (config === 'structure') {
          generatePaths.push(prefix)
        } else if (Array.isArray(config)) {
          generatePaths.push(...getGeneratePaths(config).map(pathItem => `${prefix}${pathItem}`))
        }
      })
    } else {
      generatePaths.push(localePath)
    }
  })

  // sidebar数据
  const sidebarData: Record<string, (ThemeSidebarGroupItem | string)[]> = {}

  generatePaths.forEach(path => {
    sidebarData[path] = getSidebarItems(getSidebarFileItemInfo(app, path.replace(/^\//, '')))
  })

  if (app.env.isDebug) {
    logger.info(`Structure SidebarData:${JSON.stringify(sidebarData, null, 2)}`)
  }

  // 写入缓存
  app.writeTemp(
    'theme-weasel/sidebar.js',
    `export const sidebarData = ${JSON.stringify(sidebarData)}`
  )
}
