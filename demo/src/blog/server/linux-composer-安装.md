---
title: linux composer 安装
tag:
  - linux
  - composer
  - php
category:
  - 服务器操作
  - php
---
## 下载composer
```bash
curl -sS https://getcomposer.org/installer | php
```
<!--more-->

> 注意： 如果上述方法由于某些原因失败了，你还可以通过 php >下载安装器：
```bash
php -r "readfile('https://getcomposer.org/installer');" | php
```
这将检查一些 PHP 的设置，然后下载 composer.phar 到你的工作目录中。这是 Composer 的二进制文件。这是一个 PHAR 包（PHP 的归档），这是 PHP 的归档格式可以帮助用户在命令行中执行一些操作。

你可以通过 --install-dir 选项指定 Composer 的安装目录（它可以是一个绝对或相对路径）：
```bash
curl -sS https://getcomposer.org/installer | php -- --install-dir=bin
```

## 将composer.phar文件移动到bin目录以便全局使用composer命令
```bash
mv composer.phar /usr/local/bin/composer
```

## 切换国内源
### 方法一： 修改 composer 的全局配置文件（推荐方式）
打开命令行窗口（windows用户）或控制台（Linux、Mac 用户）并执行如下命令：
```bash
composer config -g repo.packagist composer https://packagist.phpcomposer.com
```
### 方法二： 修改当前项目的 composer.json 配置文件：

打开命令行窗口（windows用户）或控制台（Linux、Mac 用户），进入你的项目的根目录（也就是 composer.json 文件所在目录），执行如下命令：
```bash
composer config repo.packagist composer https://packagist.phpcomposer.com
```
上述命令将会在当前项目中的 composer.json 文件的末尾自动添加镜像的配置信息（你也可以自己手工添加）
