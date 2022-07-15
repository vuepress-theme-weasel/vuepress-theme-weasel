---
title: CentOS7安装iptables防火墙
comments: true
tag:
  - centos7
  - iptables
category:
  - 服务器操作
  - centos7
---

CentOS7默认的防火墙不是iptables,而是firewalle.

## 安装iptable iptable-service

```bash
#先检查是否安装了iptables
service iptables status
#安装iptables
yum install -y iptables
#升级iptables
yum update iptables
#安装iptables-services
yum install iptables-services
```
<!--more-->
## 禁用/停止自带的firewalld服务

```bash
#停止firewalld服务
systemctl stop firewalld
#禁用firewalld服务
systemctl mask firewalld
```

1、直接关闭防火墙
systemctl stop firewalld.service #停止firewall
systemctl disable firewalld.service #禁止firewall开机启动

2、设置 iptables service
yum -y install iptables-services

如果要修改防火墙配置，如增加防火墙端口3306
vi /etc/sysconfig/iptables

增加规则
-A INPUT -m state –state NEW -m tcp -p tcp –dport 3306 -j ACCEPT
保存退出后。

systemctl restart iptables.service #重启防火墙使配置生效
systemctl enable iptables.service #设置防火墙开机启动
最后重启系统使设置生效即可。

在linux中关闭防火墙有两种状态一种永久关闭防火墙，另一种是暂时关闭防火墙的方法，下面我们一起来看看具体的操作步骤。
关闭虚拟机防火墙：
关闭命令：  service iptables stop
永久关闭防火墙：chkconfig iptables off
两个命令同时运行，运行完成后查看防火墙关闭状态
service iptables status
1 关闭防火墙-----service iptables stop
2 启动防火墙-----service iptables start
3 重启防火墙-----service iptables restart
4 查看防火墙状态--service iptables status
5 永久关闭防火墙--chkconfig iptables off
6 永久关闭后启用--chkconfig iptables on

## 设置现有规则

```bash
#查看iptables现有规则
iptables -L -n
#先允许所有,不然有可能会杯具
iptables -P INPUT ACCEPT
#清空所有默认规则
iptables -F
#清空所有自定义规则
iptables -X
#所有计数器归0
iptables -Z
#允许来自于lo接口的数据包(本地访问)
iptables -A INPUT -i lo -j ACCEPT
#开放22端口
iptables -A INPUT -p tcp --dport 22 -j ACCEPT
#开放21端口(FTP)
iptables -A INPUT -p tcp --dport 21 -j ACCEPT
#开放80端口(HTTP)
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
#开放443端口(HTTPS)
iptables -A INPUT -p tcp --dport 443 -j ACCEPT
#允许ping
iptables -A INPUT -p icmp --icmp-type 8 -j ACCEPT
#允许接受本机请求之后的返回数据 RELATED,是为FTP设置的
iptables -A INPUT -m state --state  RELATED,ESTABLISHED -j ACCEPT
#其他入站一律丢弃
iptables -P INPUT DROP
#所有出站一律绿灯
iptables -P OUTPUT ACCEPT
#所有转发一律丢弃
iptables -P FORWARD DROP
```

# 其他规则设定

```bash
#如果要添加内网ip信任（接受其所有TCP请求）
iptables -A INPUT -p tcp -s 45.96.174.68 -j ACCEPT
#过滤所有非以上规则的请求
iptables -P INPUT DROP
#要封停一个IP，使用下面这条命令：
iptables -I INPUT -s ***.***.***.*** -j DROP
#要解封一个IP，使用下面这条命令:
iptables -D INPUT -s ***.***.***.*** -j DROP
```

## 保存规则设定

```bash
#保存上述规则
service iptables save
```

## 开启iptables服务

```bash
#注册iptables服务
#相当于以前的chkconfig iptables on
systemctl enable iptables.service
#开启服务
systemctl start iptables.service
#查看状态
systemctl status iptables.service
```

解决vsftpd在iptables开启后,无法使用被动模式的问题

1.首先在/etc/sysconfig/iptables-config中修改或者添加以下内容

```bash
#添加以下内容,注意顺序不能调换
IPTABLES_MODULES="ip_conntrack_ftp"
IPTABLES_MODULES="ip_nat_ftp"
```

2.重新设置iptables设置

```bash
iptables -A INPUT -m state --state  RELATED,ESTABLISHED -j ACCEPT
```

以下为完整设置脚本

```bash
#!/bin/sh
iptables -P INPUT ACCEPT
iptables -F
iptables -X
iptables -Z
iptables -A INPUT -i lo -j ACCEPT
iptables -A INPUT -p tcp --dport 22 -j ACCEPT
iptables -A INPUT -p tcp --dport 21 -j ACCEPT
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT
iptables -A INPUT -p icmp --icmp-type 8 -j ACCEPT
iptables -A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT
iptables -P INPUT DROP
iptables -P OUTPUT ACCEPT
iptables -P FORWARD DROP
service iptables save
systemctl restart iptables.service
```

参数说明:

–A 参数就看成是添加一条规则
–p 指定是什么协议，我们常用的tcp 协议，当然也有udp，例如53端口的DNS
–dport 就是目标端口，当数据从外部进入服务器为目标端口
–sport 数据从服务器出去，则为数据源端口使用
–j 就是指定是 ACCEPT -接收 或者 DROP 不接收
