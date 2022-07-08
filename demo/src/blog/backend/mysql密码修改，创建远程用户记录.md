---
title: mysql密码修改，创建远程用户记录
tag:
  - linux
  - mysql
category:
  - 服务器操作
  - mysql
---


# 方法1： 用SET PASSWORD命令
```bash
　　mysql -u root

　　mysql> SET PASSWORD FOR 'root'@'localhost' = PASSWORD('newpass');
```
<!--more-->

# 方法2：用mysqladmin
```bash
　　mysqladmin -u root password "newpass"
```
　　如果root已经设置过密码，采用如下方法
```bash
　　mysqladmin -u root password oldpass "newpass"
```

# 方法3： 用UPDATE直接编辑user表
```bash
　　mysql -u root

　　mysql> use mysql;

　　mysql> UPDATE user SET Password = PASSWORD('newpass') WHERE user = 'root';

　　mysql> FLUSH PRIVILEGES;
```
# 丢失root密码
```bash
　　mysqld_safe --skip-grant-tables&

　　mysql -u root mysql

　　mysql> UPDATE user SET password=PASSWORD("new password") WHERE user='root';

　　mysql> FLUSH PRIVILEGES;
```

# 创建远程用户并授权
## 创建用户
```bash
create user test identified by '123456';
```
## 远程授权
```bash
 grant all privileges on *.* to 'test'@'%'identified by '123456' with grant option;
# grant all privileges on database.table to user@ip identified by password with grant option;

```
## 刷新权限
```bash
flush privileges ;
```

## 开启Linux 防火墙
```bash
iptables -I INPUT 4 -p tcp -m state --state NEW -m tcp --dport 3306 -j ACCEPT     #允许 3306  端口

service iptables save
```
