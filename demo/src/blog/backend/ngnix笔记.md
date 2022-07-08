---
title: ngnix笔记
tag:
  - nginx
  - 服务器纪实
category:
  - 服务器操作
  - nginx
---

> 服务器安装折腾纪实，包括nginx、php、Apache、node、mysql等

## nginx+fastcgi修改php.ini后重启
<!-- more -->

- 1.停止nginx
```bash
/usr/local/nginx/sbin/nginx -s stop
```
- 2.停止并重启php-fpm
pkill php-fpm
```bash
/usr/local/php/sbin/php-fpm
```
- 3.启动nginx
```bash
/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
```
ps：若仅仅修改了nginx的配置文件，则不需重启php-fpm，则只需平滑重启nginx即可：
```base
/usr/local/nginx/sbin/nginx -s reload
```

## php proc_open没有开启
今天在部署服务器的时候，使用composer来安装依赖。遇到了

　　The Process class relies on proc_open, which is not available on your PHP installation.

开始的时候，我有些不知所措，于是冷静下来思考一番，然后goolge了一下

在php.ini中，找到disable_functions选项，看看后面是否有proc_open函数被禁用了，如果有的话，去掉即可

其实如果php的文档熟悉的话，你应该马上就能知道proc_open实际上是一个函数，是php用来和shell交互的函数，一般这种可以直接作用于操作系统的函数是非常不安全的，对于这种不安全的函数，总是要做一些措施来进行保护

正如在google上寻找找的答案一样，在php.ini的配置中，找到disable_functions选项，这个选项就是专门用来禁止某些不安全函数的，尤其在命令行运行时，很可能对操作系统带来安全隐患

## MySQL出现1030-Got error 28 from storage engine错误
在根目录/下执行命令：df -h
```bash
  [root@localhost ~]# df -h
  Filesystem                    Size  Used Avail Use% Mounted on
  /dev/mapper/VolGroup-lv_root   50G   48G     0 100% /
  tmpfs                         1.9G  448K  1.9G   1% /dev/shm
  /dev/sda1                     485M   39M  421M   9% /boot
  /dev/mapper/VolGroup-lv_home  534G  916M  506G   1% /home
```
果然，100%了，删除了一些不必要的文件，腾出点空间了就好了。

未完待续...
