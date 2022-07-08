---
title: centos7.0安装redis和php7.1 redis扩展
tag:
  - centos7
  - redis
  - php7.1 redis
category:
  - 服务器操作
  - centos7
---

## 基本知识

1、 Redis的数据类型：
　　字符串、列表（lists）、集合（sets）、有序集合（sorts sets）、哈希表（hashs）
<!--more-->
2、 Redis和memcache相比的独特之处：
　　（1）redis可以用来做存储（storge）、而memcache是来做缓存（cache）。这个特点主要是因为其有“持久化”功能
　　（2）存储的数据有“结构”，对于memcache来说，存储的数据，只有一种类型——“字符串”，而redis则可以存储字符串、链表、集合、有序集合、哈序结构

3、 持久化的两种方式：
　　Redis将数据存储于内存中，或被配置为使用虚拟内存。
　　实现数据持久化的两种方式：（1）使用截图的方式，将内存中的数据不断写入磁盘（性能高，但可能会引起一定程度的数据丢失）
　　　　　　　　　　　　　　　（2）使用类似mysql的方式，记录每次更新的日志

4、 Redis的主从同步：对提高读取性能非常有益
5、 Redis服务端的默认端口是6379

---
## 接下来我们来安装Redis
1、先到Redis官网(redis.io)下载redis安装包

2、将其下载到/usr/local/目录下

3、解压并进入其目录
```sh
tar -zxvf redis.tar.gz
```
4、编译源程序
```sh
　　make

　　cd src

　　make install PREFIX=/usr/local/redis
```
5、将配置文件移动到redis目录
```sh
mv redis.conf /usr/local/redis/etc/
```
6、启动redis服务
```sh
/usr/local/redis/bin/redis-server /usr/local/redis/etc/redis.conf
```
7、默认情况，Redis不是在后台运行，我们需要把redis放在后台运行
```sh
vim /usr/local/redis/etc/redis.conf
```
将daemonize的值改为yes

8、客户端连接
```
　　/usr/local/redis/bin/redis-cli
```
9、停止redis实例
```
　　/usr/local/redis/bin/redis-cli shutdown
```
　　或者
```
　　pkill redis-server
```
10、让redis开机自启
```
　　vim /etc/rc.local
```
　　加入
```
　　/usr/local/redis/bin/redis-server /usr/local/redis/etc/redis-conf
```
11、接下来我们看看/usr/local/redis/bin目录下的几个文件时什么
>
　　redis-benchmark：redis性能测试工具

　　redis-check-aof：检查aof日志的工具

　　redis-check-dump：检查rdb日志的工具

　　redis-cli：连接用的客户端

　　redis-server：redis服务进程

## Redis的配置

　　daemonize：如需要在后台运行，把该项的值改为yes

　　pdifile：把pid文件放在/var/run/redis.pid，可以配置到其他地址

　　bind：指定redis只接收来自该IP的请求，如果不设置，那么将处理所有请求，在生产环节中最好设置该项

　　port：监听端口，默认为6379

　　timeout：设置客户端连接时的超时时间，单位为秒

　　loglevel：等级分为4级，debug，revbose，notice和warning。生产环境下一般开启notice

　　logfile：配置log文件地址，默认使用标准输出，即打印在命令行终端的端口上

　　database：设置数据库的个数，默认使用的数据库是0

　　save：设置redis进行数据库镜像的频率

　　rdbcompression：在进行镜像备份时，是否进行压缩

　　dbfilename：镜像备份文件的文件名

　　dir：数据库镜像备份的文件放置的路径

　　slaveof：设置该数据库为其他数据库的从数据库

　　masterauth：当主数据库连接需要密码验证时，在这里设定

　　requirepass：设置客户端连接后进行任何其他指定前需要使用的密码

　　maxclients：限制同时连接的客户端数量

　　maxmemory：设置redis能够使用的最大内存

　　appendonly：开启appendonly模式后，redis会把每一次所接收到的写操作都追加到appendonly.aof文件中，当redis重新启动时，会从该文件恢复出之前的状态

　　appendfsync：设置appendonly.aof文件进行同步的频率

　　vm_enabled：是否开启虚拟内存支持

　　vm_swap_file：设置虚拟内存的交换文件的路径

　　vm_max_momery：设置开启虚拟内存后，redis将使用的最大物理内存的大小，默认为0

　　vm_page_size：设置虚拟内存页的大小

　　vm_pages：设置交换文件的总的page数量

　　vm_max_thrrads：设置vm IO同时使用的线程数量

---
## centos7下php7.1安装redis扩展
下载及解压php7的redis扩展包：
```
wget https://codeload.github.com/phpredis/phpredis/zip/php7
unzip php7
cd phpredis-php7
```
安装扩展：
```
/usr/local/php7/bin/phpize
./configure --with-php-config=/usr/local/php7/bin/php-config
make && make install
```
运行/usr/local/webserver/php/bin/phpize时出现：
```bash
Configuring for:
PHP Api Version:         20041225
Zend Module Api No:      20060613
Zend Extension Api No:   220060519
Cannot find autoconf. Please check your autoconf installation and the
$PHP_AUTOCONF environment variable. Then, rerun this script.
```
解决办法是：
```bash
# cd /usr/loacl/src
# wget http://ftp.gnu.org/gnu/m4/m4-1.4.9.tar.gz
# tar -zvxf m4-1.4.9.tar.gz
# cd m4-1.4.9/
# ./configure && make && make install
# cd ../
# wget http://ftp.gnu.org/gnu/autoconf/autoconf-2.62.tar.gz
# tar -zvxf autoconf-2.62.tar.gz
# cd autoconf-2.62/
# ./configure && make && make install
```

可爱的yum让我更容易把没安装的包安装好

```bash
 yum install m4
 yum install autoconf
```
接着将 extension=redis.so 写入到 php.ini 文件中，最后重启服务器即可。
如果使用的是php-rpm，则需要重启php-rpm：

```bash
ps aux|grep php-fpm #查看fpm进程号
kill -USR2 fpm进程号 #平滑重启php-fpm
```
注：如果执行完 /usr/local/php7/bin/phpize 后没有生成 configure 文件，则可以使用 autoconf 来生成。
