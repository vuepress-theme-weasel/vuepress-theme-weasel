---
title: linux php-fpm 启动/重启/kill 方式
tag:
  - php
  - php-fpm
  - 服务器操作
category:
  - 服务器操作
  - php
---

## 启动

启动 php-fpm 最简单的操作：

```bash
/usr/local/php/sbin/php-fpm
```

master进程可以理解以下信号：

```text
`INT, TERM`      立刻终止

`QUIT`           平滑终止

`USR1`           重新打开日志文件

`USR2`           平滑重载所有worker进程并重新载入配置和二进制模块
```

## 重新启动

先查看php-fpm的master进程号

```bash
ps -ef|grep php-fpm

root27556 1 0 15:57 ? 00:00:00 php-fpm: master process (/usr/local/php/etc/php-fpm.conf)
www27557 27556 0 15:57 ? 00:00:00 php-fpm: pool www
www27558 27556 0 15:57 ? 00:00:00 php-fpm: pool www
www27559 27556 0 15:57 ? 00:00:00 php-fpm: pool www
www27560 27556 0 15:57 ? 00:00:00 php-fpm: pool www
root27733 26938 0 16:35 pts/0 00:00:00 grep php-fpm

```

继续执行

```bash
kill -USR2 27556
```
