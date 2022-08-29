---
title: linux操作记录(持续记录)
tag:
  - linux
category:
  - 服务器操作
---

## 重启php-fpm

### 查看php-fpm的master进程号

```bash
# ps aux|grep php-fpm
root     21891  0.0  0.0 112660   960 pts/3    R+   16:18   0:00 grep --color=auto php-fpm
root     42891  0.0  0.1 182796  1220 ?        Ss   4月18   0:19 php-fpm: master process (/Data/apps/php7/etc/php-fpm.conf)
nobody   42892  0.0  0.6 183000  6516 ?        S    4月18   0:07 php-fpm: pool www
nobody   42893  0.0  0.6 183000  6508 ?        S    4月18   0:17 php-fpm: pool www
```

### 重启php-fpm:

```bash
kill -USR2 42891
```
<!--more-->

## redis操作

### 检测是否有安装redis-cli和redis-server

```bash
[root@localhost bin] # whereis redis-cli
redis-cli: /usr/bin/redis-cli

[root@localhost bin] # whereis redis-server
redis-server: /usr/bin/redis-server
```

### 检测后台进程是否存在

```bash
ps -ef |grep redis
```

### 检测redis端口

```bash
netstat -lntp | grep 6379
```

### 使用redis-cli客户端检测连接是否正常

```bash
redis-cli
127.0.0.1:6379> keys *
(empty list or set)
127.0.0.1:6379> set key "hello world"
OK
127.0.0.1:6379> get key
"hello world"
```

### 停止redis

#### 使用客户端

```bash
redis-cli shutdown
```

#### 因为Redis可以妥善处理SIGTERM信号，所以直接kill -9也是可以的

```bash
kill -9 PID
```

## iptables简单配置方法

### 修改方式一: 直接修改配置文件

```bash
vim /etc/sysconfig/iptables
```

### 修改方式二：通过iptables命令添加

```bash
iptables -A INPUT -p tcp --dport 8080 -j ACCEPT
```

### 重启iptables

```bash
service iptables restart
```

### 配置文件解释

```bash
*filter
#默认INPUT 的策略是DROP 即拒绝所有的外来请求
:INPUT DROP [0:0]
#一般情况下用不到FORWARD 可以配置为默认DROP
:FORWARD DROP [0:0]
#本机对其他机器访问设置为默认ACCEPT
:OUTPUT ACCEPT [0:0]
#允许已经建立和相关的连接
-A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT
#允许icmp协议(即ping)
-A INPUT -p icmp -j ACCEPT
#允许回环请求
-A INPUT -i lo -j ACCEPT
#开放端口22 80(如果要开放其他端口 继续添加开放规则即可)
-A INPUT -p tcp -m state --state NEW -m tcp --dport 22 -j ACCEPT
-A INPUT -p tcp -m state --state NEW -m tcp --dport 80 -j ACCEPT
COMMIT
```

### chmod: 更改'authorized_keys' 的权限: 不允许的操作

原因
在linux系统下

有些配置文件是不允许被任何人（包括root）修改的
为了防止被误修改或删除
可以设定该文件的不可修改位：immutable

解决办法 ：chattr
防止关键文件被修改：
　　chattr +i authorized_keys
如果需要修改文件则：
　　chattr -i authorized_keys
