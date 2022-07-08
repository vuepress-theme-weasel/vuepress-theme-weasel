---
title: linux centos 7 下安装nginx1.13+php7.0环境
tag:
  - linux
  - php
  - 服务器
  - 环境安装
category:
  - 服务器操作
  - nginx
---
# Nginx1.13   安装

## 安装 nginx 需要的扩展gcc，pcre-devel，zlib-devel， openssl openssl-devel
```bash
　yum -y install gcc-c++ pcre-devel zlib-devel openssl openssl-devel
```
<!--more-->

## 安装Nginx
```bash
　cd /usr/local/src;
　wget http://nginx.org/download/nginx-1.13.8.tar.gz
　tar -zxvf nginx-1.13.8.tar.gz -C /usr/local/src
　cd /usr/local/src/nginx-1.13.8
　./configure    #默认安装到/usr/local/nginx目录下
　make    #编译
　make install    #安装
```
## 启动Nginx
```bash
　/usr/local/nginx/sbin/nginx   开启Nginx
```
## Nginx设置开机自启
```bash
　vim /etc/rc.local中添加/usr/local/nginx/sbin/nginx，保存并推出
　chmod -R 777 /etc/rc.local
```
## Nginx 配置文件所在目录
```bash
　/usr/local/nginx/conf
```
## nginx编译扩展参考https://www.cnblogs.com/zhang-shijie/p/5294162.html

# php7编译安装
```bash
　　cd /usr/local/src/
　　wget http://cn2.php.net/distributions/php-7.0.2.tar.gz
　　tar -xzxvf php-7.0.2.tar.gz
　　cd php-7.0.2
　　# 检查php所需要的全部扩展 ,没有的话执行
　　yum -y install libxml2 libxml2-devel openssl openssl-devel curl-devel  libjpeg.x86_64 libpng.x86_64 freetype.x86_64 libjpeg-devel.x86_64 libpng-devel.x86_64 freetype-devel.x86_64 libjpeg-devel bzip2-devel.x86_64 libXpm-devel install gmp-devel icu libicu libicu-devel  php-mcrypt  libmcrypt  libmcrypt-devel  postgresql-devel libxslt-devel
　　# 注：因为改为用nginx了，所以编译参数中的--with-apxs2=/usr/bin/apxs去掉了，如果要配置apache用，安装PHP前，请先安装apache。
 　　#编译参数配置
　　./configure --prefix=/usr/local/php --with-pdo-pgsql --with-zlib-dir --with-freetype-dir --enable-mbstring --with-libxml-dir=/usr --enable-soap --enable-calendar --with-curl --with-mcrypt --with-gd --with-pgsql --disable-rpath --enable-inline-optimization --with-bz2 --with-zlib --enable-sockets --enable-sysvsem --enable-sysvshm --enable-pcntl --enable-mbregex --enable-exif --enable-bcmath --with-mhash --enable-zip --with-pcre-regex --with-pdo-mysql --with-mysqli --with-jpeg-dir=/usr --with-png-dir=/usr --enable-gd-native-ttf --with-openssl --with-fpm-user=www-data --with-fpm-group=www-data --with-libdir=/lib/x86_64-linux-gnu/ --enable-ftp --with-gettext --with-xmlrpc --with-xsl --enable-opcache --enable-fpm --with-iconv --with-xpm-dir=/usr
```
> configure: error: mcrypt.h not found. Please reinstall libmcrypt. 报错这个的时候参考 http://blog.csdn.net/l_yangliu/article/details/53018117

　　配置的checking 结束后，执行：    make clean && make && make install（如果出现错误：--ENABLE-OPCACHE=NO时执行export LD_LIBRARY_PATH=/usr/local/mysql/lib或export LD_LIBRARY_PATH=/lib/:/usr/lib/:/usr/local/lib）

　　装完成后，我们要把源码包中的配置文件复制到PHP安装目录下，源码包中有两个配置  php.ini-development  php.ini-production  ，看名字就知道，一个是开发环境，一个是生产环境，我们这里就复制开发环境的
```bash
  cp php.ini-development /usr/local/php/lib/php.ini
```
　　另外还需要设置环境变量 ：修改vim /etc/profile文件使其永久性生效，并对所有系统用户生效，在文件末尾加上如下两行代码
```bash
　PATH=$PATH:/usr/local/php/bin
　export PATH
```
　然后执行 命令 source /etc/profile

　php -v 就可以看到PHP版本信息了。

　此时还需要配置PHP-fpm:
```bash
　cp /usr/local/php/etc/php-fpm.conf.default /usr/local/php/etc/php-fpm.conf
　cp /usr/local/php/etc/php-fpm.d/www.conf.default /usr/local/php/etc/php-fpm.d/www.conf
　cp /usr/local/src/php-7.0.2/sapi/fpm/init.d.php-fpm /etc/init.d/php-fpm
　chmod +x /etc/init.d/php-fpm
```
　　启动php-fpm:
```bash
  useradd www-data;
  /usr/local/php/sbin/php-fpm
```
　　php-fpm设置开机自启
```bash
  systemctl enable php-fpm
```
