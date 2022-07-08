---
title: mysql创建远程用户并授权
tag:
  - mysql
category:
  - 服务器操作
  - mysql
---

# mysql授权远程用户

先用ssh登录远程服务器，用root连上数据库看看情况；
<!--more-->

```bash
mysql> select Host,User,Password from mysql.user;
+----------------+------------------+-------------------------------------------+
| Host           | User             | Password                                  |
+----------------+------------------+-------------------------------------------+
| localhost      | root             | *836E233974EBE6EA32F95F890A91363F8427F78B |
| iz94926clkiz   | root             | *836E233974EBE6EA32F95F890A91363F8427F78B |
| 127.0.0.1      | root             | *836E233974EBE6EA32F95F890A91363F8427F78B |
| ::1            | root             | *836E233974EBE6EA32F95F890A91363F8427F78B |
| localhost      | debian-sys-maint | *1460ED3535ABDBB887F9E5F57F40A2354610CDF3 |
+----------------+------------------+-------------------------------------------+
5 rows in set (0.00 sec)
```
一共有5个mysql账号，Host列可以看出来，这些账号都只支持服务器本机连接，现在我们来创建一个远程用户；

```bash
create user test identified by '123456';
```

```bash
+----------------+------------------+-------------------------------------------+
| Host           | User             | Password                                  |
+----------------+------------------+-------------------------------------------+
| localhost      | root             | *836E283974EBE6EA32F95F890A91363F8427F78B |
| iz949s6clkiz   | root             | *836E283974EBE6EA32F95F890A91363F8427F78B |
| 127.0.0.1      | root             | *836E283974EBE6EA32F95F890A91363F8427F78B |
| ::1            | root             | *836E283974EBE6EA32F95F890A91363F8427F78B |
| localhost      | debian-sys-maint | *1460ED35E5ABDBB887F9E5F57F40A2354610CDF3 |
| %              | test             | *6BB4837EB74329105EE4568DDA7DC67ED2CA2AD9 |
+----------------+------------------+-------------------------------------------+
6 rows in set (0.00 sec)
```
## 创建用户
创建完成了，在程序里面连接发现还是没有权限，刚才我们只是创建了用户，还没有对这个用户分配权限；
```bash
grant all privileges on *.* to 'test'@'%'identified by '123456' with grant option;
```

all代表接受所有操作，比如 select,insert,delete....; *.* 代表所有库下面的所有表;% 代表这个用户允许从任何地方登录；为了安全期间，这个%可以替换为你允许的ip地址；
## 刷新权限
然后刷新mysql用户权限相关表；
```bash
flush privileges ;
```

我以为就此收工了，等等，程序怎么还是连不上去，还是 access deny ;

难道端口不是3306吗，打开 mysql配置文件，是默认的3306，接着往下面看，发现一个关键地方；
```bash
bind-address           = 127.0.0.1
```

原来这里mysql默认绑定了本地ip，不接受其他来源；注释掉，重启mysql 一切OK；

还有两个常用操作；

## 修改指定用户密码
```bash
update mysql.user set password=password('新密码') where User="test" and Host="localhost";
```

## 删除用户
```bash
delete from user where User='test' and Host='localhost';
```
