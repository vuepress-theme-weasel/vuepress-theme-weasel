---
title: 从零开始实现一个koa-starter（一）
tag:
  - node
  - koa
  - typescript
category:
 - node
 - koa
 - typescript
---


## 背景

为什么会有这样的想法呢？原因其实很简单就是单纯想要完整的实现一次node服务开发的链路，总结下自己所掌握的东西。另外一个呢，最近都在学习使用Typescript，所以索性基于TS实现一个服务端的代码，也是方便自己总结。

## 需求简述

我的目的是最终实现一个类似nest的简易starter，它包含的内容如下：

- 1.基于koa的完整restful api开发链路

- 2.有完整路由自动导入功能

- 3.利用TS的装饰器实现依赖注入/控制反转

## 完整实现假设代码

```typescript
// entity.ts
@Repo('TestRepository')
@Entity()
export class Test {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    comment: 'test',
    nullable: false
  })
  name: string
}

// service.ts
@Service()
export class TestService {
  @Inject('TestRepository')
  testRepo: Repository<TestEntity>

  testHandler() {
    this.testRepo.save({
      name: '1'
    })

    return { a: 2, b: 3 }
  }
}

// testGetDto.ts
import { IsString } from "class-validator";

export class GetTestIndexDto {
  @IsString({
    message: '缺少必要的参数'
  })
  name: string
}

// testController.ts
@Controller('/test1', { skipPerm: true })
export class Test {
  @Inject()
  testService: TestService

  @Get('/index')
  public test(@Query() query: GetTestIndexDto) {
    const a = this.testService.testHandler()
    return { code: 2, message: 'test controller', data: {
      service: a,
      query
    } }
  }

  @Get('/async')
  public async asyncTest() {
    return new Promise((resolve) => {
      resolve({ code: 200, message: 1 })
    })
  }
}

```

以上都是伪代码，是一个我们实现中的理想样子，我们最终将朝着这个方向努力。

## 项目初始化

包管理工具这里我将选择使用pnpm，pnpm确实会是一个相对比较好的选择。

### pnpm简介

pnpm的全称是performant npm，意味“高性能的 npm”。pnpm由npm/yarn衍生而来，解决了npm/yarn内部潜在的bug，极大的优化了性能，扩展了使用场景。被誉为“最先进的包管理工具”。是时下非常热门的包管理工具，目前我们熟悉的项目都在使用pnpm进行项目管理，比如vue3.0/vite/cycle.js/prisma/milkdown/vueuse等等。

### pnpm基础使用

#### 安装

```bash
npm i pnpm -g
```

#### 查看版本

```bash
pnpm -v
```

#### 设置npm源

```bash
pnpm config get registry
pnpm config set registry https://registry.npmmirror.com //切换淘宝源
```

当然此处我推荐使用nrm管理npm源，清晰明了方便便捷，爽歪歪~~~

#### 项目初始化

```bash
pnpm init
```

#### 安装项目依赖

```bash
pnpm i / pnpm install
```

更多命令，请查看[pnpm官方文档](https://pnpm.io/zh/cli/install)

### 开始项目初始化

```bash
pnpm init
```

### 安装基础依赖

首先安装koa生态依赖 koa koa-router koa-body @koa/cors

```bash
pnpm i koa koa-router koa-body @koa/cors
```

安装开发依赖 typescript @types/node ts-node tsconfig-paths

```bash
pnpm i typescript @types/node ts-node tsconfig-paths -D
```

> 注: tsconfig-paths （[【GitHub地址】](https://github.com/dividab/tsconfig-paths)）是为了可以使用类似webpack和vite的路径alias的一个库，主要是为了方便开发时的路径管理，可以减少类似 `../../../` 的写法，其核心功能就是读取tsconfig文件，获取paths（别名）映射，覆写path._resolveFilename,匹配映射，解析获取真正的模块。

### 初始化TS配置文件

```bash
npx tsc --init
```

开放一些ts的配置，目前用到的ts配置可以参考[tsconfig.json](https://github.com/CavinHuang/koa-starter/blob/main/tsconfig.json)

### 建立基本文件目录

```text
src               # 源码目录
│   app.ts        # 服务入口
├───config        # 配置文件目录
├───controller    # 控制器目录
├───dto           # 数据传输校验
├───middlewares   # 中间件目录
├───models        # 数据模型目录
├───server        # 应用服务组织及封装
├───services      # 业务服务层
├───types         # TS类型管理目录
└───utils         # 工具目录
```

## 总结及下节预告

本篇主要是对项目初始化工具、项目初始化、项目目录组织进行分析及初步搭建，也是万里长征的第一步，为后面的工作提供很好的基础，下一篇将会迈出关键性的一步，对整个应用服务进行一次完整封装，涉及koa启动、koa中间使用及封装、尝试封装一个日志工具、引入koa-router并进行自动导入的实现。

## GitHub地址

本篇源码[GitHub地址](https://github.com/CavinHuang/koa-starter/tree/start-1)

## 博客

欢迎关注小博客，没啥特点只有一些记录，还不完善，正在调整中[博客地址](https://mrhuang.site)
