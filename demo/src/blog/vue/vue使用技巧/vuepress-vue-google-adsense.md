---
title: vuepress 配置谷歌广告-通过 vue-google-adsense 库
category:
  - vue3
tag:
  - vue
  - 谷歌广告
  - vuepress
---
=====================================================================================

本文讲述如何为 vuepress 站点配置"按广告单元"申请的 adsense 谷歌广告，从而可以在文章的任意位置插入广告。这里采用的技术方案是 vue-google-adsense 依赖库。
![](https://gitee.com/wangshibiao/blog_picBed2/raw/master/images/20200901182808.png)

提示

本文仅介绍"vue-google-adsense 库"的使用, 作为基础教程[vuepress 配置谷歌广告 adsense](/vuepress-adsense.html)的补充。
建议您先阅读完[vuepress 配置谷歌广告 adsense](/vuepress-adsense.html)后再回到本教程。

## 1. 申请广告代码
--------------------------

前往[adsense 官网 (opens new window)](https://www.google.com/adsense/)申请广告代码，本文以”文章内嵌广告“为例。
```js
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <ins class="adsbygoogle"
         style="display:block; text-align:center;"
         data-ad-layout="in-article"
         data-ad-format="fluid"
         data-ad-client="ca-pub-2310202030754639"
         data-ad-slot="1631732635"></ins>
    <script>
         (adsbygoogle = window.adsbygoogle || []).push({});
    </script>

```

提示

记录广告代码中的 data-ad-client 和 data-ad-slot, 后续步骤用到。

## 2. 安装依赖

```bash
yarn add -D vue-script2 vue-google-adsense

```

## 3. 修改 docs/.vuepress/enhanceApp.js

```js
export default ({
      Vue,
      options,
      router,
      siteData
    }) => {
      if (typeof window !== 'undefined') {
        import('vue-google-adsense')
          .then(module => {
            const Ads = module.default
            Vue.use(require('vue-script2'))
            Vue.use(Ads.Adsense)
            Vue.use(Ads.InArticleAdsense)
            Vue.use(Ads.InFeedAdsense)
          })
          .catch(e => {
            console.log(e)
          })
      }
    }
```


## 4. 插入广告

编辑想要插入广告的 md 文档, 在合适的位置插入如下代码即可。
```html
<InArticleAdsense
        data-ad-client="ca-pub-id"
        data-ad-slot="slot_id">
    </InArticleAdsense>
```

提示

将 data-ad-client 和 data-ad-slot 替换为第 1 步得到的值即可。

![](https://gitee.com/wangshibiao/blog_picBed2/raw/master/images/20200901182435.png)

## 5. 自定义广告位组件

提示

为了方便文档的书写，以及方便广告的管理，建议将广告代码进一步封装为广告位组件。
我们可以定义多个广告位组件, 每个广告位组件唯一对应 adsense 广告的 1 个 slotId。这样就可以把 data-ad-client 和 data-ad-slot 的取值都封装到组件中。
当站点申请了很多的 slotId 时，通过"自定义广告位组件"的方法实现插入广告, 管理或修改广告数据会非常方便。

本章节假定您已掌握"如何自定义组件"，否则请先阅读完[vuepress 自定义 vue 组件](/vuepress-custom-component.html)后, 再浏览本章节。

### 1. 创建广告位组件，如 ArticleTopAd.vue, 内容如下:
```vue
 <template>
      <InArticleAdsense data-ad-client="ca-pub-2310202030754639" data-ad-slot="1631732639"></InArticleAdsense>
    </template>

    <script>
    export default {};
    </script>

```

提示

将 data-ad-client 和 data-ad-slot 的参数值替换为实际取值。

### 2. 插入广告

在文档的对应广告位处, 注入广告位组件 ArticleTopAd 即可。
```vue
   # js 模板引擎 mustache 用法

    <ArticleTopAd></ArticleTopAd>

    ## 一. 使用步骤

    ### 1. 引入 mustachejs 库

```

## 6. Pin码

当您的收入达到10美元后，谷歌会要求您验证PIN码，否则会终止向您的网站投放广告。

**详情如下**: 当您的广告收入达到10美元后，谷歌会通过email通知您，正在向您账号中指定的付款地址邮递一个PIN码，收到PIN码后，点击email中的“验证您的地址”，在显示的页面中，填写收到的PIN码完成验证。若您当前的收货地址已无效，那么只能等**3周后**再申请新的PIN码。具体事宜请前往[官方文档 (opens new window)](https://support.google.com/adsense/answer/157667?hl=zh-Hans&ref_topic=1348132)。

填写PIN码的页面路径：登录[adsense (opens new window)](https://www.google.com/adsense) -\> [付款 (opens new window)](https://www.google.com/adsense/new/u/0/pub-2310202030754638/payments) -\> [验证检查 (opens new window)](https://www.google.com/adsense/new/u/0/pub-2310202030754638/payments/verification)

 > 注意：PIN 码是指在您的帐号余额达到进行验证所需的最低限额时生成的 6 位数字。PIN 码与发布商 ID 不同。请仅在 PIN 码验证卡片中输入正确的 PIN 码。请勿输入随机数字。如果 PIN 码输错三次，您的帐号将停止展示广告。
