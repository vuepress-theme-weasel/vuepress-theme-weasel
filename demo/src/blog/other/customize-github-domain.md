---
title: 为 Github 上的 vuepress 博客绑定个性域名
category:
  - vuepress
tag:
  - vuepress
  - github
---

* * *

使用 vuepress 部署博客之后，尽管可以通过 [https://你的用户名.github.io](https://你的用户名.github.io) 来访问，但由于各种各样的原因，博主们通常倾向于更换这个教条式的域名，使用属于自己的个性域名。以下就是一个简单的教程。

* * *

## 域名购买

推荐到 [namesilo](https://www.namesilo.com) 上注册账号购买，不仅比 [Godaddy](https://www.godaddy.com) 便宜，本身还免费提供隐私服务（即不公开域名持有者的信息）。对了， [namesilo](https://www.namesilo.com) 支持支付宝付款。

* * *

## 创建 CNAME 文件

在 `/public` 目录下新建 `CNAME` 文件

```bash
  $ cd ./public
  $ touch CNAME
```


编辑 `CNAME` 文件，输入你购买的域名，比如 `mrhuang.site`（没错，整个 `CNAME` 文件只有一个顶级域名，没有别的内容）

然后把 `CNAME` 文件部署到 Github 上

* * *

## 设置域名

访问 [namesilo](https://www.namesilo.com)（或是你购买域名的网站），登陆你的账户，进入设置域名的控制台，做如下设置

```
  @          A             192.30.252.153
  @          A             192.30.252.154
  www      CNAME           chpwang.github.io
```

其中 `192.30.252.153` 和 `192.30.252.154` 都是 Github 的地址（该地址现已改变，Github 最新的 IP 地址参见[这里](https://help.github.com/en/articles/troubleshooting-custom-domains#dns-configuration-errors)），而最后一行的 `vuepress-theme-weasel.github.io` 你要换成 `你的用户名.github.io`（更多详细内容参见 Github [官方文档](https://help.github.com/en/articles/troubleshooting-custom-domains#dns-configuration-errors)）。

至此，个性域名设置完毕，只需等待生效即可。

### 阿里云转DNSPod


阿里云万网域名带的免费版云解析一直不太给力，小白也是直接使用腾讯云的DNSPod。刚好今天有小朋友问阿里云域名怎么解析到dnspod上。那就写个图文教程吧。

DNSPod免费版比阿里云域名解析

1.  解析线路DNSPod多了境内、有道搜索、搜狗搜索、奇虎360搜索、全部搜索引擎。当然DNSPod在解析专业度上更强。
2.  DNSPod生效速度更快，基本上7秒就可以覆盖全球。
3.  DNSPod 有API 可以提供自动SSL证书申请。
4.  多线路负载也略有区别。

阿里云域名使用dnspod解析教程

1、[点击进入 阿里云DNS云解析控制面板](https://dc.console.aliyun.com/) ，找到需要修改NS的域名，点击管理。
![阿里云万网域名控制台](https://img.pc6a.com/images/2019/12/26/95fa1d7d06e8d9168960f5508921f0e1.png)2、找到基本信息 – 修改DNS，修改为DNSPod免费版的NS，f1g1ns1.dnspod.net ，f1g1ns2.dnspod.net 。阿里云NS生效速度比较慢。可能得1-2小时，最晚48小时肯定能生效。（接下来的操作不用等待，直接进行下一步即可）

![阿里云万网域名修改DNS](https://img.pc6a.com/images/2019/12/26/35e4846c5ad4bd89bc4cc2cbfcc66c8c.png)

3、来到[DNSPod DNS管理页面](https://console.dnspod.cn/dns/list)，添加域名，添加后状态为“错误”。不用担心，等待阿里云的NS生效后自动会变“正常”。
![dnspod DNS控制台](https://img.pc6a.com/images/2019/12/26/30fdca08fa9bf71284955aae4e81bd13.png)
4、不用等待状态到“正常”，就可以进行下一步。按正常添加记录即可。带状态正常后DNS就自动生效。

上图 Type 一栏说明

```
  A：  用来指定域名为 IPv4 的地址（如：8.8.8.8），如果需要将域名指向一个IP地址，就需要添加 A 记录
  AAAA：  与上述 A 记录的区别是，AAAA 记录用来指定域名为 IPv6 的地址（如：2001:DB8:2de:0:0:0:0:e13）
  CNAME：  如果需要将域名指向另一个域名，再由另一个域名提供 ip 地址，就需要添加 CNAME 记录

```

解释：

*   总的来说，设置 A 记录的意思是，当我输入 `mrhuang.site` 这个域名的时候，访问的是 `192.30.252.153` 这个地址；
*   而设置 `CNAME` 的意思是说，当我访问 `vuepress-theme-weasel.github.io` 这个地址的时候，会跳转到 `mrhuang.site`，之后的过程就和 A 记录相同了，即访问 `192.30.252.153`

* * *

P.S.
1、如果你希望将博客部署在国内，可以考虑使用 [Coding](http://coding.net)；
2、部署在国内的博客，要注意 CSS 里的字体调用可能因网络问题加载失败；
3、可以用 [DNSPod](https://www.dnspod.cn) 而不是自带的域名解析服务，参考[这里](http://shaojunxiao.com/2017/04/01/Hexo-blog-域名解析/)；
4、知乎上的[这个回答](https://www.zhihu.com/question/31377141/answer/103056861)也描述了绑定域名的事，也可以看看；

关于这里域名设置的更多知识和详情，还可参考以下两个链接：

*   [从 DNS 到 github pages 自定义域名 — 漫谈域名那些事](http://winterttr.me/2015/10/23/from-dns-to-github-custom-domain/)
*   [How to setup Github Pages to redirect DNS requests](http://stackoverflow.com/questions/23375422/how-to-setup-github-pages-to-redirect-dns-requests-from-subdomain-e-g-www-to)
