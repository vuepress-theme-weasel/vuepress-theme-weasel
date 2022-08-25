---
title: 从零开始实现一个koa-starter（二）
tag:
  - node
  - koa
  - typescript
category:
 - node
 - koa
 - typescript
---

## 本节目标

本节目标是实现一个简单的路由自动装载服务端，包含完整装载日志，请求日志，自动绑定controller到路由，只需按照抽象类书写controller即可。先上【[GitHub地址](https://github.com/CavinHuang/koa-starter/tree/koa-router-1)】

## 应用服务的基本封装

### 什么是koa？

[Koa](http://koajs.cn/) 是下一代的 Node.js 的 Web 框架。由 Express 团队设计。旨在提供一个更小型、更富有表现力、更可靠的 Web 应用和 API 的开发基础。它的特点是优雅、简洁、表达力强、自由度高。跟express相比，它是一个更轻量的node框架，因为它所有功能都通过插件实现，这种插拔式的架构设计模式。

### koa的四大模块

- 封装node http server、创建Koa类构造函数
- 构造request、response、context对象
- 中间件机制和剥洋葱模型
- 错误捕获和错误处理

### koa中间件机制

多个中间件会形成一个栈结构（middle stack），以"先进后出"（first-in-last-out）的顺序执行。

```text
最外层的中间件首先执行。
调用next函数，把执行权交给下一个中间件。
...
最内层的中间件最后执行。
执行结束后，把执行权交回上一层的中间件。
...
最外层的中间件收回执行权之后，执行next函数后面的代码
```

更多关于koa的介绍，推荐阮一峰大神的[koa 框架教程](http://www.ruanyifeng.com/blog/2017/08/koa.html)，关于koa的洋葱模型，推荐看这片文章[Gopal -【Node】深入浅出 Koa 的洋葱模型](https://juejin.cn/post/7012031464237694983)

### 启动一个最简单的koa服务

如下代码：

```typescript
import Koa from 'koa'

const app = new Koa()

app.use((ctx, next) => {
  ctx.body = 'hello koa!'
})

app.listen(3000, () => {
  console.log('服务启动了！')
})

```

使用 ts-node 跑起来后，访问 http://127.0.0.1:3000 时，就会得到 hello koa！ 的输出了。

Koa 应用程序不是 HTTP 服务器的1对1展现。 可以将一个或多个 Koa 应用程序安装在一起以形成具有单个HTTP服务器的更大应用程序。这里的 app.listen(...) 方法只是以下方法的语法糖:

```typescript
import http from 'http'

http.createServer(app.callback()).listen(3000, () => {
  console.log('服务启动了！')
});
```

这意味着您可以将同一个应用程序同时作为 HTTP 和 HTTPS 或多个地址：

```typescript
import Koa from 'koa'
import http from 'http'

const app = new Koa()

app.use((ctx, next) => {
  ctx.body = 'hello koa!'
})

http.createServer(app.callback()).listen(3000, () => {
  console.log('服务启动了！', 3000)
});
http.createServer(app.callback()).listen(3001, () => {
  console.log('服务启动了！', 3001)
});
```

### 创建并使用中间件

实例一：实现一个计算整个请求处理所花时间的中间件

```typescript

export function responseTime() {
  return (ctx, next) => {
    const start = Date.now()

    await next()
    const ms = Date.now() - start
    ctx.set('X-Response-Time', `${ms}ms`);
  }
}

```

实例二：实现一个请求日志中间件

```typescript
export function reponseLogger() {
  return (ctx, next) => {
    const start = Date.now();
    await next()
    const ms = Date.now() - start;
    // 记录请求和响应日志
    ctx.logger.info(`
      ======>
      timestamp: ${new Date()}
      request method: ${ctx.method}
      request url: ${ctx.path}
      request query: ${JSON.stringify(ctx.query)}
      request body: ${JSON.stringify(ctx.request.body)}
      <======
      response body: ${JSON.stringify(ctx.body)},
      response time: ${ms}ms
    `)
  }
}

```

通过以上事例，可以看出首先请求流通过 x-response-time 和 logger 中间件来请求何时开始，然后继续移交控制给 response 中间件。当一个中间件调用 next() 则该函数暂停并将控制传递给定义的下一个中间件。当在下游没有更多的中间件执行后，堆栈将展开并且每个中间件恢复执行其上游行为。

## 开发基于koa的服务应用

基于以上的了解，开始封装基于koa的服务运用，首先我们在server下建立`application.ts`：

```typescript
export class Application {
  // koa实例
  public app
  // config
  public config
  // server
  public server
  // logger
  public logger
  // 构造器
  constructor(config) {}
  // 挂载全局中间件
  useMiddlewares() {}
  // 挂载路由
  mountRouter() {}
  // 启动服务
  start()
}
```

application 大致上的结构是这样的，我们只需要基于这个结构去补充实现即可。

到这里，发现首先需要一个日志模块来方便调试，以及打印一些必要的信息输出到控制台，为了后续服务部署时，也能很好的管理日志，这里我们选用成熟的日志框架 [`log4js`](https://github.com/log4js-node/log4js-node)

安装log4js

```bash
pnpm i log4js
```

封装一个基础的logger类：

```typescript
mport log4js, { Configuration, Logger } from 'log4js'
const _logger = Symbol('_logger')

/**
 * log4js基础适配器
 */
export class Base {
  /**
   * logger 标记
   */
  private [_logger]: Logger | null = null

  /**
   * 构造器
   * @param config
   */
  constructor(config: Configuration) {
    const logConfig = this.formatConfig(config)
    this.setLogger(logConfig)
  }

  /**
   * 链路日志
   * @param message
   * @param args
   * @returns
   */
  trace(message: any, ...args: any[]) {
    return this[_logger] && this[_logger].trace(message, args)
  }

  /**
   * 调试日志
   * @param message
   * @param args
   * @returns
   */
  debug(message: any, ...args: any[]) {
    return this[_logger]!.debug(message, ...args)
  }

  /**
   * 信息日志
   * @param message
   * @param args
   * @returns
   */
  info(message: any, ...args: any[]) {
    return this[_logger]!.info(message, ...args)
  }

  /**
   * 警告日志
   * @param message
   * @param args
   * @returns
   */
  warn(message: any, ...args: any[]) {
    return this[_logger]!.warn(message, ...args)
  }

  /**
   * 错误日志
   * @param message
   * @param args
   * @returns
   */
  error(message: any, ...args: any[]) {
    return this[_logger]!.error(message, ...args)
  }

  /**
   * 致命错误日志
   * @param message
   * @param args
   * @returns
   */
  fatal(message: any, ...args: any[]) {
    return this[_logger]!.fatal(message, ...args)
  }


  /**
   * log4js 配置加载
   */
  configure(config: Configuration) {
    return log4js.configure(config)
  }

  /**
   * log4js 获取log4js的实例
   */
  setLogger(config: Configuration, category?: string) {
    this.configure(config)
    this[_logger] = log4js.getLogger(category)
  }

  /**
   * 格式化配置
   * @param config
   * @returns
   */
  formatConfig(config: Configuration) {
    return config
  }
}
```

再基于这个基础类实现一个DateFile类型的logger：

```typescript
import { DateFileAppender } from 'log4js'
import { Base } from "./Base"
import { LoggerConfig, LoggerLevel } from "../types"

/**
 * date file适配器
 */
export class DateFileLogger extends Base {
  formatConfig(config: LoggerConfig & DateFileAppender) {
    let { level, filename, pattern, alwaysIncludePattern, absolute, layout, mode, numBackups } = config
    level = (level ? level.toUpperCase() : 'ALL') as LoggerLevel
    layout = layout || { type: 'pattern', pattern: '%[[%d] [%z] [%p]%] - %m' }

    return Object.assign({
      appenders: {
        // 控制台输出
        console: {type: 'console', layout},
        // 输出到文件
        dateFile: {type: 'dateFile', filename, pattern, alwaysIncludePattern, absolute, layout, mode, numBackups}
      },
      categories: {
        default: { appenders: ['dateFile', 'console'], level }
      }
    }, config)
  }
}
```

在server文件夹下创建一个logger.ts，主要作用是让我们的logger实例单例化：

```typescript
import { ILoggerConfig, loggerConfig } from "@/config"
import { DateFileLogger, Logger } from "@/utils"

export type ApplicationLogger = Logger<DateFileLogger>

/**
 * 全局保存实例，避免重复实例化
 */
let globalLogger: ApplicationLogger | null = null

export const createLogger = (config: ILoggerConfig, name: string = 'app') => {
  if (globalLogger) return globalLogger
  const handler = config.handler
  delete config.handler

  globalLogger = new Logger<DateFileLogger>(config, handler)
  return globalLogger
}

export const logger = createLogger(loggerConfig)
```

logger配置文件：

```typescript
/**
 * 日志配置
 */

import { APP_ROOT } from "@/constants";
import { DateFileLogger } from "@/utils/logger"
import { DateFileAppender } from 'log4js';
import path from 'path';

export type ILoggerConfig = Partial<DateFileAppender> & {
  handler: any
  status: 'close' | 'open'
}

/**
 * 日志配置
 */
export const loggerConfig: ILoggerConfig = {
  handler: DateFileLogger,
  filename: path.resolve(APP_ROOT, 'logs/logs.log'),
  pattern: '-yyyy-MM-dd',
  alwaysIncludePattern: false,
  status: 'open'
}
```

继续完善application.ts，把内容都补充起来

```typescript
import Koa from 'koa'
import { createServer, Server } from 'http'

import { LoggerNameSpace, NOT_FOUND_APPLICATION_CONFIG } from '@/constants'
import { ApplicationLogger, createLogger } from './logger'
import { useMiddlewares } from './core/middlewares/useMiddlewares'
import { loggerConfig } from '@/config'
import { initRouter } from './router'

import type { AppContext, Config } from '@/types'

/**
 * 应用
 */
export class Application {
  /**
   * koa实例
   */
  public app: Koa

  /**
   * 服务配置
   */
  public config: Config.Application

  /**
   * 服务实例
   */
  public server: Server

  /**
   * 日志实例
   */
  public logger: ApplicationLogger

  /**
   * 构造函数
   * @param config
   */
  constructor(config: Config.Application) {
    if (!config) throw TypeError(NOT_FOUND_APPLICATION_CONFIG)
    this.config = config
    this.app = new Koa()
    this.server = createServer(this.app.callback())
    this.logger = createLogger(loggerConfig)

    this.useMiddleware()
    this.mountRouter()
  }

  /**
   * 挂载中间件
   */
  useMiddleware() {
    // 做一些对象的挂载方便后续使用
    this.app.use(async (ctx: AppContext, next) => {
      ctx.$ = ctx.server = this
      ctx.logger = this.logger
      await next()
    })

    // 挂载中间件
    useMiddlewares(this.app)
  }

  /**
   * 启动服务
   */
  start() {
    const { host, port } = this.config
    try {
      this.server.listen(port, host, () => {
        this.logger.info(LoggerNameSpace.App, `服务已运行在http://${host}:${port}`, '✔ ')
      })
    } catch (error) {
      this.logger.fatal(LoggerNameSpace.App, `服务http://${host}:${port}启动失败!`, error)
    }
  }
}
```

useMiddlewares.ts，主要作用是把中间件统一到一个地方管理，方便排查和统一配置：

```typescript
import Koa from 'koa';
import koaBody from 'koa-body'
import koaCors from '@koa/cors'

import { requestError } from './requestError'
import { requestLog } from './requestLogger'

/**
 * middleware
 * @param app
 */
export const useMiddlewares = (app: Koa) => {
  app.use(koaBody())
     .use(koaCors({
      allowHeaders: 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With',
      allowMethods: 'PUT, POST, GET, DELETE, OPTIONS',
      origin: '*'
     }))
     .use(requestLog())
     .use(requestError())
}
```

corsAllow 只做了一件事就是把 options的请求直接响应 200
requestError 把错误更友好的响应给页面或者接口
requestLogger 请求日志

## CORS原理及@koa/cors

### 1、为什么会有跨域问题？

这是浏览器的同源策略所造成的，同源策略限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的重要安全机制。

### 2、如何解决跨域?

- jsonp: 带有src属性的标签都可以用来， 但是只能处理GET请求
- document.domain + iframe跨域
- location.hash + iframe
- window.name + iframe
- postMessage跨域
- Nginx配置反向代理
- CORS(跨域资源共享)：支持所有类型的HTTP请求

相信大家对于以上的解决方法都很熟悉，这里不再对每一种方法展开讲解，接下来主要讲一下CORS；

### 3、CORS请求相关的字段，都以 Access-Control-开头

- Access-Control-Allow-Origin：必选
  - 请求头Origin字段的值
  - *：接受任何域名
- Access-Control-Allow-Credentials：可选，
  - true: 表示允许发送cookie，此时Access-Control-Allow-Origin不能设置为*，必须指定明确的，与请求网页一致的域名。
  - 不设置该字段：不需要浏览器发送cookie
- Access-Control-Expose-Headers：可选
  - Cache-Control
  - Content-Language
  - Content-Type
  - Expires
  - Last-Modified
  - Pragma
响应报头指示哪些报头可以公开为通过列出他们的名字的响应的一部分。默认情况下，只显示6个简单的响应标头：如果想要让客户端可以访问到其他的首部信息，可以将它们在 Access-Control-Expose-Headers 里面列出来。

### 4、withCredentials 属性

CORS请求默认不发送Cookie和HTTP认证信息，如果要把Cookie发到服务器，一方面需要服务器同意，设置响应头Access-Control-Allow-Credentials: true,另一方面在客户端发出请求的时候也要进行一些设置;

### 5、预检请求

预检请求用的请求方法是OPTIONS，表示这个请求是用来询问的。头信息里面，关键字段是Origin，表示请求来自哪个域。除了Origin，预检请求的头信息包括两个特殊字段：

- Access-Control-Request-Method：必选，用来列出浏览器的CORS请求会用到哪些HTTP方法，上例是POST
- Access-Control-Request-Headers：该字段是一个用逗号分割的字符串，执行浏览器CORS请求会额外发送的头信息字段，上例是Content-Type;

服务器收到预检请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨域请求，就可以做出回应。上面的HTTP回应中，关键的是Access-Control-Allow-Origin字段，表示http://127.0.0.1:3000可以请求数据。该字段也可以设为星号，表示同意任意跨源请求。

如果浏览器否定了“预检”请求，就会返回一个正常的HTTP回应，但是没有任何CORS相关的头信息字段，这时，浏览器就会认定，服务器不同意预检请求，因此触发一个错误，被XMLHttpRequest对象的onerror回调函数捕获h。

服务器回应的其他CORS字段

- Access-Control-Allow-Methods：必需；它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的方法。这是为了避免多次预检请求。
- Access-Control-Allow-Headers：如果浏览器请求头里包括Access-Control-Request-Headers字段，则Access-Control-Allow-Headers字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在预检中请求的字段。
- Access-Control-Allow-Credentials：与简单请求时含义相同。
- Access-Control-Allow-Max-Age: 可选，用来指定本次预检请求的有效期。单位为秒。在有效期内，不用发出另一条预检请求

## 引入koa-router

```typescript
import Router from 'koa-router'
import commonMiddleware from '../middlewares/common'
import validateParams from '../middlewares/validateParams'
import { testSchema } from '../validator/test'
import TestController from '../controller/test.ts'

const router = new Router({
  prefix: '/standard-test'
})
router.allowedMethods()

router.get(
  '/name',
  commonMiddleware,
  validateParams('get', testSchema),
  TestController.getName
)

router.post(
  '/name',
  commonMiddleware,
  validateParams('post', testSchema),
  TestController.updateName
)

export default router
```

上面写了一个很简单的test.ts的路由模块，可能你会觉得很清晰阿，想要什么功能都能实现，这是肯定的，这可是官方的写法，但是实现和开发成本又是另外一回事，特别是当业务复杂起来后，在真正的业务上，一个模块不可能只有两个简单的接口，根据上面的test.ts可以分析传统写法的短板，重点是我引入的两个中间件上：

- 1、多个模块需要创建多个路由实例
- 2、无法对项目的全部路由统一添加前缀
- 3、多个中间件之间无法进行数据传递，无法感知其他中间件的使用，完全隔离
- 4、无法对一个模块的接口统一添加中间件

1、2点非常明显；第3点对应的是上面的 validateParams 中间件，需要传入请求方法和joi校验规则，因为不同的请求方法，koa在拿参数的方式不同，这里就体现了在使用 validateParams 中间件时，无法感知当前接口是什么请求方法，需要手动传入；第4点对应的是上面的 commonMiddleware，当每个接口都需要使用到时，传统写法只能一个个接口进行添加，无法对整个模块进行使用。

实现一个简单的、不怎么灵活的路由自动注入，首先在controller下新建一个BaseController的抽象类

```typescript
/**
 * 封装一个抽象的核心controller
 */

import { Response } from "@/server";

/**
 * 核心抽象类
 */
export abstract class BaseController {

  /**
   * 请求方法枚举
   */
  public METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT'
  }

  /**
   * 指定当前api的请求方式
   */
  public abstract method: string | string[]

  /**
   * 指定当前api必须完成方法
   * @param params
   */
  public abstract handler(params?: Record<string, any>): Response
}

```

新建controller/test/list.api.ts:

```typescript
import { Response } from "@/server"
import { BaseController } from "../BaseController"

interface IParams {
  name: string
}

/**
 * 测试api，请求地址：router.prefix + /test/list
 */
export default class Test extends BaseController{

  public method = this.METHODS.GET

  public handler<IParams>(params: IParams) {
    return Response.success(params, '成功')
  }
}
```

用这个不怎么灵活的controller作为路由自动注入的例子，可以很好的理解整个流程：

server/router/router.ts:

```typescript
import { application } from '@/config';
import Router from 'koa-router'

const router = new Router({
  prefix: application.routerPrefix || '/'
})

router.allowedMethods()

export default router

```

开始实现路由自动注入，我们实现注入的逻辑是：比如 controller/test/list.api.ts 那我们注入的路径是：router.prefix + /test/list

`server/router/initRouter.ts` 记载的逻辑是这样的，首先递归拿到controller文件夹下的所有 .api.ts 的文件，然后导入文件，并实例化它，获得对应的 `method` 和 `handler`, 然后动态注入到`koa-router`中，最后把router挂载到koa中。

```typescript
import { Application } from "../application";
import router from './router'
import { readdirRecursive } from '@/utils/file';
import path from "path";
import { AppContext } from '@/types/application';
import { Next } from "koa";
import { Response } from "../response";
import { CONTROLLER_ROOT, LoggerNameSpace } from "@/constants";

interface IRouterMate {
  routePath: string
  pathApi: string
}

/**
 * 初始化路由挂载
 * @param app
 * @returns
 */
export function initRouter(app: Application) {
  const methodsRouter = (router as any).methods.map((m: string) => m.toLowerCase())

  /**
   * 收集controller
   * @param controllerPath
   */
  async function importControllerFiles(controllerPath: string) {
    const controllerFiles = readdirRecursive(controllerPath).filter((filePath) => {
      return filePath.endsWith('.api.ts')
    })

    const routerMeta: IRouterMate[] = []
    controllerFiles.forEach(fileApi => {
      const infoApi = path.parse(fileApi)
      const pathApi = path.join(controllerPath, fileApi)
      const routePath = '/' + path.posix.join(...infoApi.dir.split(path.sep), path.basename(infoApi.base, '.api.ts'))

      routerMeta.push({
        routePath,
        pathApi
      })
    })

    for (let i = 0; i < routerMeta.length; i++) {
      const item = routerMeta[i]
      await controllerMounter(item.routePath, item.pathApi)
    }
  }

  /**
   * 过滤掉路由不允许的路由方法
   * @param methods
   */
  function filterRouteMethod(methods: string[]) {
    return methods.map(method => method.toLowerCase()).filter(method => methodsRouter.includes(method))
  }

  /**
   * 挂载controller
   * @param routePath
   * @param controllerPath
   */
  async function controllerMounter(routePath: string, controllerPath: string) {
    const controller = (await import(controllerPath)).default
    const controllerInstance = new controller()

    const instanceMethod = controllerInstance.method
    // 获取当前api请求的方法
    const methods = instanceMethod ? Array.isArray(instanceMethod) ? filterRouteMethod(instanceMethod) : filterRouteMethod([instanceMethod]) : ['get']

    for (const method of methods) {
      mountControllerWithRouter(method, controllerInstance, routePath)
    }
  }

  /**
   * 把controller和路由挂起来
   * @param method
   * @param controller
   * @param routePath
   */
  function mountControllerWithRouter(method: string, controller: any, routePath: string) {
    // 这里可以加载一些前置的中间件

    // 加载路由
    ;(router as any)[method](routePath, async (ctx: AppContext, next: Next) => {
      try {
        const params = {
          ...ctx.query,
          ...ctx.request.body
        }
        const responceRes = await controller.handler(params, ctx.$)
        if (responceRes !== undefined) {
          ctx.body = responceRes
          return await next()
        }
        ctx.status = 404
        ctx.body = Response.error('没有你要访问的内容')
      } catch (error) {
        const err = error instanceof Error ? error : new Error(error as string)
        ctx.status = 500
        ctx.body = Response.error(err.message, err.stack)
      }
      await next()
    })

    // 这里可以放一些后置处理的中间件

    // 记录一条日志
    app.logger.info(LoggerNameSpace.App, `✔ 加载 ~[HTTP接口]~{${method}}~{${routePath}}`)
  }

  importControllerFiles(CONTROLLER_ROOT).then(() => {
    app.app.use(router.routes())
  })
}
```

这部分的源码在【[initRoute.ts](https://github.com/CavinHuang/koa-starter/blob/koa-router-1/src/server/application.ts)】

在 application.ts 中使用：

```typescript
import Koa from 'koa'
import { createServer, Server } from 'http'

import { LoggerNameSpace, NOT_FOUND_APPLICATION_CONFIG } from '@/constants'
import { ApplicationLogger, createLogger } from './logger'
import { useMiddlewares } from './core/middlewares/useMiddlewares'
import { loggerConfig } from '@/config'
import { initRouter } from './router'

import type { AppContext, Config } from '@/types'

/**
 * 应用
 */
export class Application {
  //...some code

  /**
   * 构造函数
   * @param config
   */
  constructor(config: Config.Application) {
    //...some code
    this.mountRouter()
  }

  //...some code

  /**
   * 挂载路由
   */
  mountRouter() {
    initRouter(this)
  }
}
```

到这里整个应用应该已经可以正常启动了，接下来我们在 src/app.ts 下直接启动服务：

```typescript
import { application } from '@/config'
import { Application } from './server'

const app = new Application(application)

app.start()

```

正常的话可以看到如下的日志：

```text
[2022-08-25T11:28:27.957] [13208] [INFO] - Application 服务已运行在http://127.0.0.1:4001 ✔
[2022-08-25T11:28:28.023] [13208] [INFO] - Application ✔ 加载 ~[HTTP接口]~{get}~{/test/list}
```

尝试访问： http://127.0.0.1:4001/api/test/list?name=1&b=2 出现如下日志，说明我们的服务已经完整的启动了，并且在根目录创建了logs目录

```text
[2022-08-25T17:05:28.511] [4968] [INFO] -
    ======>
    timestamp: Thu Aug 25 2022 17:05:28 GMT+0800 (中国标准时间)
    request method: GET
    request url: /api/test/list
    request query: {"name":"1","b":"2"}
    request body: {}
    <======
    response body: {"data":{"name":"1","b":"2"},"code":1,"message":"成功"}
```

## 总结与预告

本节主要是熟悉并使用了koa、以及koa插件机制，并完成了koa的应用封装，封装并使用了多个中间件，实现简单的路由自动注入。下一篇将为整个应用引入typescript装饰器，详解typescript的装饰器使用方式，并为我们的koa路由自动注入改造成装饰器方式。

## GitHub地址

本篇【[GitHub地址](https://github.com/CavinHuang/koa-starter/tree/koa-router-1)】

## 博客

欢迎关注小博客，没啥特点只有一些记录，还不完善，正在调整中[博客地址](https://mrhuang.site)
