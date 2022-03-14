# 使用 pnpm 构建 Monorepo 项目

## monorepo 是什么

monorepo 是把多个项目的所有代码放到一个 git 仓库中进行管理，多个项目中会有共享的代码则可以分包引用。整个项目就是有 root 管理的 dependencies 加上多个 packages，每个 package 也可以在自己的作用域引入自己的 dependencies。
<!--more-->
项目结构如下：

    .
    ├── node_modules
    ├── package.json
    ├── packages
    │   ├── ui
    │   ├── utils
    │   └── web
    ├── pnpm-lock.yaml
    ├── pnpm-workspace.yaml
    ├── readme.md
    └── tsconfig.json

packages 文件夹中的就是原本每个独立的项目(下文称之为 package )了，现在放在一起用 workspace 去管理。最外层路径称之为 root。在 root package.json 中的 deps 是所有子 package 共用的。

## pnpm 是什么

> Fast, disk space efficient package manager

pnpm 是新一代 node 包管理器。它由 npm/yarn 衍生而来，但却解决了 npm/yarn 内部潜在的 bug，并且极大了地优化了性能，扩展了使用场景。\[^1\]

pnpm 相比 yarn，npm，yarn PnP 安装包更快速，对包的依赖管理更偏平，对磁盘占用也有优势。

具体可以参考这篇文章：[为什么现在我更推荐 pnpm 而不是 npm/yarn?](https://link.zhihu.com/?target=https%3A//jishuin.proginn.com/p/763bfbd3bcff)

## 为什么要使用 monorepo

使用 monorepo 可以把原本一个项目的多个模块拆分成多个 packages，在 packages 之间相互引用，也可以单独发布成包，极大地解决了项目之间代码无法重用的痛点。在项目打包或者编译操作时也可重用一套配置，通吃所有 packages。

![](https://pic1.zhimg.com/v2-f4d4b28efed3b84db227b70d3b805df0_b.jpg)

![](https://pic1.zhimg.com/80/v2-f4d4b28efed3b84db227b70d3b805df0_720w.jpg)

## 开始

首先需要安装 pnpm，就不用多说了。然后 init 一个项目。

在 root 目录新建 `pnpm-workspace.yaml`，内容如下

    packages:
      # all packages in subdirs of packages/ and components/
      - 'packages/**'

我们所有的 packages 都放在 `packages` 目录下。

用 pnpm 安装全局共用的包，比如 react, react-dom。

    pnpm install react react-dom -w

注意这里使用 `-w` 表示把包安装在 root 下，该包会放置在 `<root>/node_modules` 下。当然也可以把把安装在所有 packages 中，使用 `-r` 代替 `-w`。你必须使用其中一个参数。例如把 dayjs 装入 packages/web 下，packages/web 中的 package.json name 为 `@test/web`。需要执行：

    pnpm i dayjs -r --filter @test/web

使用 `--filter` 后面接子 package 的 name 表示只把安装的新包装入这个 package 中。

---

接下来，我们在 packages 中新建以下几个目录。

    ├── packages
    │   ├── ui
    │   ├── utils
    │   └── web

然后每个都执行 `npm init` ，假设每个 package 的 name 依次为 `@test/ui` `@test/utils` `@test/web`。

    // packages/utils
    {
      "name": "@test/utils", // <-----
      "version": "1.0.0",
      "description": "",
      "main": "index.ts",
      "author": "Innei",
      "license": "MIT",
      "dependencies": {}
    }

以 utils 为例，入口文件为 index.ts，首先建立这个文件。写入如下内容。

    export const add = (a: number, b: number) => a + b

然后，执行

    pnpm i @test/utils -r --filter @test/ui

之后，打开 `packages/ui/package.json` 发现 dependencies 中多了一行。

    {
      "name": "@test/ui",
      "version": "1.0.0",
      "description": "",
      "main": "./index.tsx",
      "scripts": {},
      "author": "Innei",
      "license": "MIT",
      "dependencies": {
        "@test/utils": "workspace:^1.0.0" // <--------
      }
    }

由于是 workspace 管理的，所有有一个前缀 workspace。接下来则可以从 package/ui 中直接引入这个包了。

    import {add} from '@test/utils'

当然，如果用 vscode ts server 提供的 auto import 会使用 relative path 引用。如下：

    import {add} from '../utils'

其实只要用 vscode 打开这个文件夹，当成一个项目来写就行了。这也就暂时剥离 monorepo 这个概念了。

![](https://pic3.zhimg.com/v2-19249cc55e2be4c063724c930f32236a_b.jpg)

![](https://pic3.zhimg.com/80/v2-19249cc55e2be4c063724c930f32236a_720w.jpg)

那么接下来的 package/web 就是整个项目的整体了。放置原来项目中的所有 src 下的代码。而一些原本通用的代码就从 src 下提取成包放在了 packages 下了。这样就好理解了。

![](https://pic3.zhimg.com/v2-c0a6499294e8efb186295b6098cde2e6_b.jpg)

![](https://pic3.zhimg.com/80/v2-c0a6499294e8efb186295b6098cde2e6_720w.jpg)

Template: [Innei](https://link.zhihu.com/?target=https%3A//github.com/Innei)/**[pnpm-workspace-monorepo](https://link.zhihu.com/?target=https%3A//github.com/Innei/pnpm-workspace-monorepo)**

\[^1\]: [为什么现在我更推荐 pnpm 而不是 npm/yarn?](https://link.zhihu.com/?target=https%3A//jishuin.proginn.com/p/763bfbd3bcff)
