---
title: Linux创建用户只能访问某个目录
tag:
  - linux
category:
  - 服务器操作
  - 文件系统
---

## 一、直接创建

1、创建一个用户
```sh
useradd test2
```
<!--more-->

2、设置用户密码
```sh
passwd test2
```
3、修改登录后文件目录和只允许访问某一个目录
修改/etc/ssh/sshd_config 文件
```sh
#Subsystem      sftp    /usr/libexec/openssh/sftp-server
 #这行指定使用sftp服务使用系统自带的internal-sftp
Subsystem sftp internal-sftp
 #这行用来匹配用户
Match User test1
#用chroot将用户的根目录指定到/usr/local/sftp，这样用户就只能在/usr/local/sftp下活动
ChrootDirectory  /usr/local/sftp

Match User test2#设置两个账号
ChrootDirectory /home/aa

X11Forwarding no
AllowTcpForwarding no
ForceCommand internal-sftp #指定sftp命令
```
4、查看是否登录
```sh
sftp -oPort=22 test2:192.168.2.1
```
特别注意：
/usr/local/sftp 目录所属是root。。确保目录权限755或者750

## 二、ftp创建
```sh
yum -y install vsftpd  #通过yum来安装vsftpd
chkconfig vsftpd on ##设置为开机启动
vi /etc/vsftpd/vsftpd.conf #设置配置文件

anonymous_enable=YES    #设置是否允许匿名用户登录
local_enable=YES        #设置是否允许本地用户登录
local_root=/home        #设置本地用户的根目录
write_enable=YES        #是否允许用户有写权限
local_umask=022        #设置本地用户创建文件时的umask值
anon_upload_enable=YES    #设置是否允许匿名用户上传文件
anon_other_write_enable=YES    #设置匿名用户是否有修改的权限
anon_world_readable_only=YES    #当为YES时，文件的其他人必须有读的权限才允许匿名用户下载，单单所有人为ftp且有读权限是无法下载的，必须其他人也有读权限，才允许下载
download_enbale=YES    #是否允许下载
chown_upload=YES        #设置匿名用户上传文件后修改文件的所有者
chown_username=ftpuser    #与上面选项连用，表示修改后的所有者为ftpuser
ascii_upload_enable=YES    #设置是否允许使用ASCII模式上传文件
ascii_download_enable=YES    #设置是否允许用ASCII模式下载文件

chroot_local_user=YES        #设置是否锁定本地用户在自己的主目录中，（登录后无法cd到父目录或同级目录中）
chroot_list_enable=YES        #设置是否将用户锁定在自己的主目录中
chroot_list_file=/etc/vsftpd/chroot_list    #定义哪些用户将会锁定在自己的主目录中
userlist_enable=YES    #当为YES时表示由userlist_file文件中指定的用户才能登录ftp服务器
userlist_file=/etc/vsftpd/user_list    #当userlist_enable为YES时才生效

service vsftpd restart  #重启vsftpd

useradd -d /home/www -m /home/www 用户 ##-d 目录 指定用户主目录，如果此目录不存在，则同时使用-m选项，可以创建主目录。
passwd 用户名 ##设置密码

```
如此配置完成。。。。。
设置防火墙
```sh
vi /etc/sysconfig/iptables-config

#修改
IPTABLES_MODULES="ip_conntrack_ftp"

#开放21端口
vi /etc/sysconfig/iptables

#添加
 -A INPUT -m state --state NEW -m tcp -p tcp --dport 21 -j ACCEPT
```
重启

如果此时还不能上传文件权限，修改SELinux
此处不开启SELinux，
```sh
chmod 755 /home/www

chown -R ftp用户名:root 目录
```
