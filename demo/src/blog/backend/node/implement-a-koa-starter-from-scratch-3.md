---
title: 从零开始实现一个koa-starter（三）
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

本节【[GitHub地址](https://github.com/CavinHuang/koa-starter/tree/koa-starter-2)】,本篇主要目标时熟悉typescript的装饰器，以及学习使用装饰器，并且将基于装饰器，改造koa-router路由自动装载功能。

## ts装饰器

typescript装饰器[官方文档](https://www.tslang.cn/docs/handbook/decorators.html)

>装饰器是一种特殊类型的声明，它能够被附加到类声明，方法， 访问符，属性或参数上。 装饰器使用 @expression这种形式，expression求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息做为参数传入。

注意这里的所谓的`运行时被调用`，这里指的是文件装载运行的时间点，而不是被附加的方法或者类调用时才调用，也就是引入文件就会执行相关的装饰器方法。所以，根据上面的描述知道，装饰器是一个函数，定义在不同的变量上会有不同的效果，主要是传入的参数不同。我们每个路由文件是一个单独模块，里面每一个接口都属于这个模块，刚好对应到类和类的方法这两者的关系，所以设计的装饰器用到了类装饰器和方法装饰器，当然，后续还会封装类似`@query`、`@body`这样的属性装饰器，下面介绍这些装饰器。

首先需要在 Typescript 配置中启用发送装饰器元数据。将这两行添加到tsconfig.json下的文件中compilerOptions：

```json
{
  "emitDecoratorMetadata": true,
  "experimentalDecorators": true
}
```

### 类装饰器

一个简单的类装饰器例子，类装饰器只有一个参数：类本身也就是类的构造函数，ts的类编译后其实就是es5的构造函数。

```typescript
// 装饰器获得当前的属性
type Constructor = new (...args: any[]) => any
function GetName(target: Constructor) {
  target.prototype.getAge = function () {
    return this.name
  }
}

@GetName
class Duck {
  public name = '唐老鸭'
  public age = 100

  getAge() {
    return this.age
  }
}

// 测试
const duck = new Duck()
console.log(duck.getAge()) // 唐老鸭
```

上面的例子通过装饰器改变了Duck的`getAge`这个方法，class的方法编译后全部在构造函数的`prototype`上，可以参考ts编译后的代码结合js的原型和原型链来理解。

### 方法装饰器

方法装饰器声明在一个方法的声明之前（紧靠着方法声明）。 它会被应用到方法的 属性描述符上，可以用来监视，修改或者替换方法定义。

方法装饰器表达式会在运行时当作函数被调用，传入下列3个参数：

- 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
- 成员的名字。
- 成员的属性描述符。

一个简单的例子：

```typescript
function fnDecorator(target: any, key: string, desc: any) {
  console.log(key)
  console.log(desc)
  console.log(Object.getOwnPropertyDescriptor(target, key))
}

class Duck  {
  name = '唐老鸭'
  age = 180

  @fnDecorator
  getAge() {
    return this.age
  }
}
```

结果：

```text
getAge
{
  "writable": true,
  "enumerable": true,
  "configurable": true
}
{
  "writable": true,
  "enumerable": true,
  "configurable": true
}
```

### 属性装饰器

属性装饰器声明在一个属性声明之前（紧靠着属性声明）。 属性装饰器不能用在声明文件中（.d.ts），或者任何外部上下文里。

属性装饰器表达式会在运行时当作函数被调用，传入下列2个参数：

- 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
- 成员的名字。

一个简单的例子：

```typescript
function format(target: Object, propertyKey: string | symbol) {
  let value:string
  Object.defineProperty(target,propertyKey,{
    set:(v)=>{
      value = v
    },
    get:()=>{
      return value < 10 ? '0'+ value : value
    }
  })
}

class Duck  {
  name = '唐老鸭'
  @format
  age = 2

  getAge() {
    return this.age
  }
}

const duck = new Duck()
console.log(duck.getAge()) // 02
```

### 参数装饰器

参数装饰器声明在一个参数声明之前（紧靠着参数声明）。 参数装饰器应用于类构造函数或方法声明。 参数装饰器不能用在声明文件（.d.ts），重载或其它外部上下文里。

参数装饰器表达式会在运行时当作函数被调用，传入下列3个参数：

- 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
- 成员的名字。
- 参数在函数参数列表中的索引。

## reflect-metadata(元数据 api)

> reflect-metadata 拆成两个单词，`reflect` 反射和 `metadata`，通俗理解 利用反射的原理修改元数据。元数据就是配置数据的数据，reflect-metadata 利用反射的原理通过key、value的形式给对象、对象属性设置数据，从而不改变其数据结构。

安装 reflect-metadata

```bash
pnpm i reflect-metadata
```

我们已经在 tsconfig.json 中开启了 emitDecoratorMetadata 选项，此时，TypeScript 在编译时定义一些 元数据设计键，目前可用的有：

- 属性类型元数据 design:type ：用于获取类属性的类型
- 参数类型元数据 design:paramtypes：用于获取方法参数的类型
- 返回类型元数据 design:returntype：用于获取返回值的类型

小例子：参数统一处，比如不管传入什么参数，最后统一修改成 吃饭

```typescript
import 'reflect-metadata'

function actionDecorate(target, propertyKey, descriptor) {
  let PropsTypes = Reflect.getMetadata('design:paramtypes',target,propertyKey)
  let p =   new PropsTypes[0]()
  p.action = '吃饭'
  let orgMethod = descriptor.value
  descriptor.value = ()=>{
    orgMethod(p)
  }
}

class Duck {
  name: string
  age: number
  action: string

  @actionDecorate
  setAction(action) {
    console.log(action)
  }
}
```

api介绍

```typescript
// 在对象或属性上定义元数据
Reflect.defineMetadata(metadataKey, metadataValue, target);
Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey);

// 检查对象或属性的原型链上是否存在元数据键
let result = Reflect.hasMetadata(metadataKey, target);
let result = Reflect.hasMetadata(metadataKey, target, propertyKey);

// 检查对象或属性是否存在自己的元数据键
let result = Reflect.hasOwnMetadata(metadataKey, target);
let result = Reflect.hasOwnMetadata(metadataKey, target, propertyKey);

// 获取对象或属性的原型链上的元数据键的元数据值
let result = Reflect.getMetadata(metadataKey, target);
let result = Reflect.getMetadata(metadataKey, target, propertyKey);

// get metadata value of an own metadata key of an object or property
let result = Reflect.getOwnMetadata(metadataKey, target);
let result = Reflect.getOwnMetadata(metadataKey, target, propertyKey);

// 获取对象或属性的自身元数据键的元数据值
let result = Reflect.getMetadataKeys(target);
let result = Reflect.getMetadataKeys(target, propertyKey);

// 获取对象或属性的所有自己的元数据键
let result = Reflect.getOwnMetadataKeys(target);
let result = Reflect.getOwnMetadataKeys(target, propertyKey);

// 从对象或属性中删除元数据
let result = Reflect.deleteMetadata(metadataKey, target);
let result = Reflect.deleteMetadata(metadataKey, target, propertyKey);

// 通过修饰符将元数据应用于构造函数
@Reflect.metadata(metadataKey, metadataValue)
class C {
  // 通过修饰符将元数据应用于方法（属性）
  @Reflect.metadata(metadataKey, metadataValue)
  method() {
  }
}
```

>[reflect-metadata](https://rbuckton.github.io/reflect-metadata/#syntax)，更多的点，查看文档哦。

## 实现装饰器路由

下面就具体是实现下：`@Post` 、 `@Get`，最后实现`@Controller` ，首先需要安装`reflect-metadata`。

```bash
pnpm i reflect-metadata
```

### 请求方法装饰器

在`server/core/decorators`新建`request.ts`，来封装我们的请求方法装饰器。先看一个简单的：

```typescript
function Get(path: string){
  // 往方法上存上路径与请求方法
  return function (target: any, key: string) {
    Reflect.defineMetadata('path', path, target, key)
    Reflect.defineMetadata('method', 'get', target, key)
  }
}

function Post(path: string){
  return function (target: any, key: string) {
    Reflect.defineMetadata('path', path, target, key)
    Reflect.defineMetadata('method', 'post', target, key)
  }
}
```

这代码肯定不能忍受的，将请求方法、请求路径定义到方法的元数据上，上面的代码可以再做一层封装，将 get、post 当成参数传入，相当于再包一层工厂函数：

```typescript
import 'reflect-metadata'

function genRequestDecorator(type: string) {
  return function (path: string) {
    return function (target: any, key: string) {
      Reflect.defineMetadata('path', path, target, key)
      Reflect.defineMetadata('method', type, target, key)
    }
  }
}

export const Get = genRequestDecorator('get')
export const Gost = genRequestDecorator('post')
```

记得要在index中导出。

现在我们先把`BaseController.ts`的内容，清空：

```typescript
/**
 * 封装一个抽象的核心controller
 */
export abstract class BaseController {
}
```

修改 `controller/test/list.api.ts`:

```typescript
import { Response } from "@/server"
import { BaseController } from "../BaseController"
import { Post, Get } from '@/server'
import { AppContext } from '@/types';

/**
 * 测试api
 */
export default class Test extends BaseController {

  @Post('/testPost')
  public testPost(ctx: AppContext) {
    return Response.success(ctx.request.body)
  }

  @Get('/testGet')
  public testGet(ctx: AppContext) {
    return Response.success(ctx.request.query)
  }

  @Get('/test/get')
  public test2path () {
    return Response.success('success')
  }
}
```

到这里也只是把请求方法、请求路径定义到方法的元数据上，还没有将它们取出来并注册路由。

### @Controller 控制器装饰器完成路由注册

controller通常我们把它定义为一个业务模块的入口，`@Controller`就是标识模块的入口path

根据装饰器的特点，先执行方法装饰器，再执行类装饰器，我们在上面已经引入了方法装饰器，在执行类装饰器的时候，相关的信息已经添加至方法的元数据。然后类的装饰器的参数就是构造函数，类上的方法在存在构造函数的 prototype 上，所以我们在类装饰器中，通过参数同样可以取得定义在方法上的元数据，包括请求方法、请求路径，还有方法本身。

一个最基本的路由定义为, 这三个信息都可以拿到，所以在这里就可以完成路由注册。

```typescript
router[method](path, handler)
```

在`server/core/decorators`新建`controller.ts`:

```typescript
import 'reflect-metadata'
import router from '@/server/router/router'
import { logger, Response } from '@/server'
import { AppContext } from '@/types'
import { Next } from 'koa'
import { isDev } from '@/config'

export function Controller(root: string) {
  return function (target: new (...args: any[]) => any) {
    const handlerKeys = Object.getOwnPropertyNames(target.prototype).filter(
      key => key !== 'constructor'
    )
    handlerKeys.forEach(key => {
      const path: string = Reflect.getMetadata('path', target.prototype, key)
      const method: string = Reflect.getMetadata(
        'method',
        target.prototype,
        key
      )

      const handler = target.prototype[key]

      if (path && method) {
        const fullPath = root === '/' ? path : `${root}${path}`
        // 加载一些前置公共中间件
        ;(router as any)[method](fullPath, async (ctx: AppContext, next: Next) => {
            try {
              const result = await handler(ctx)
              ctx.body = result
            } catch (e) {
              console.log(e)
              const err = e as Error
              ctx.body = Response.error(err.message, isDev ? err.stack : null, 500)
            }
        })
        // 加载一些后置公共中间件

        // 打一条日志
        logger.warn(`✔ 加载 ~[HTTP接口]~{${method}}~{${fullPath}}`)
      }
    })
  }
}
```

接下来我们只需要把所有的controller文件做一次导入即可，删除之前的`server/router/initRouter.ts`，新建`importCtrl.ts`:

```typescript
import { isDev } from '@/config'
import { CONTROLLER_ROOT } from '@/constants'
import { readdirRecursive } from '@/utils'
import path from 'path'

const appendExt = isDev ? '.api.ts' : '.api.js'

export const importController = async () => {
  const filesAPP = readdirRecursive(CONTROLLER_ROOT)
  console.log(filesAPP)
  await filesAPP.filter((file) => file.endsWith(appendExt)).forEach(async(file) => {
    const filePath = path.join(CONTROLLER_ROOT, file)
    await import(filePath)
  })
}
```

重新修改`application.ts`，去除之前的路由加载方法，并把controller导入方法加上，并初始化路由挂载：

```typescript
import Koa from 'koa'
import { createServer, Server } from 'http'

import { LoggerNameSpace, NOT_FOUND_APPLICATION_CONFIG } from '@/constants'
import { ApplicationLogger, createLogger } from './logger'
import { useMiddlewares } from './core/middlewares/useMiddlewares'
import { loggerConfig } from '@/config'
import { importController } from './router'

import type { AppContext, Config } from '@/types'
import router from './router/router'

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

    importController()
    this.mountRouter()
    this.useMiddleware()
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

  /**
   * 挂载路由
   */
  mountRouter() {
    this.app.use(async (ctx: AppContext, next) => {
      ctx.$ = this
      ctx.server = this
      await next()
    })
    this.app.use(router.routes()).use(router.allowedMethods())
  }
}
```

启动服务：`pnpm dev`，此时可以看到如下日志：

```text
[2022-08-29T09:40:47.691] [20972] [INFO] - Application 服务已运行在http://127.0.0.1:4001 ✔
[2022-08-29T09:40:47.790] [20972] [WARN] - ✔ 加载 ~[HTTP接口]~{post}~{/test/testPost}
[2022-08-29T09:40:47.791] [20972] [WARN] - ✔ 加载 ~[HTTP接口]~{get}~{/test/testGet}
[2022-08-29T09:40:47.791] [20972] [WARN] - ✔ 加载 ~[HTTP接口]~{get}~{/test/test/get}
```

接口已经全部加载进来了，访问: `http://127.0.0.1:4001/api/test/test/get?name=1&b=2` 可见返回：

```json
{
    "data": "success",
    "code": 1,
    "message": "成功"
}
```

## 总结与预告

本篇主要内容点如下：

- 熟悉typescript的装饰器，分别熟悉了类装饰器、方法装饰器、属性装饰器以及参数装饰器；
- 熟悉了reflect-metadata这个仓库的作用，并介绍了它的api;
- 基于装饰器实现了请求方法装饰器、控制器装饰器，并基于此实现路由的自动注入。

下篇将会是本系列文章的重点，将进一步深入到IOC容器、依赖注入和控制反转这些设计理念中，并且将基于这些设计思想，重新封装我们的路由，并实现service依赖注入，service装饰器、请求参数装饰器、请求体装饰器、请求params装饰器、并引入`type-orm`，实现数据库实体自动注入。并且实现简单的IOC容器，解释容器的作用。

## GitHub地址

本篇【[GitHub地址](https://github.com/CavinHuang/koa-starter/tree/koa-router-1)】

## 博客

欢迎关注小博客，没啥特点只有一些记录，还不完善，正在调整中[博客地址](https://mrhuang.site)

## 系列地址

[从零开始实现一个koa-starter（三）](http://mrhuang.site/post/backend/node/implement-a-koa-starter-from-scratch-3.html)

[从零开始实现一个koa-starter（二）](http://mrhuang.site/post/backend/node/implement-a-koa-starter-from-scratch-2.html)

[从零开始实现一个koa-starter（一）](http://mrhuang.site/post/backend/node/implement-a-koa-starter-from-scratch-1.html)
