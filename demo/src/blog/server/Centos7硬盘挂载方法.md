---
title: Centos7硬盘挂载方法
tag:
  - linux
  - centos
  - 服务器
category:
  - 服务器操作
---

## 查看新添加的磁盘
```bash
fdisk -l //或者cat /proc/partitions
```
<!-- more -->
## 新建分区
```bash
fdisk /dev/sdb //这里的sdb是新添加出来的硬盘

n //添加新分区
p //创建主分区
1 分区号1
按回车 //起始扇区选择默认
也是回车默认 //为了不浪费空间
p //查看创建出来的分区
w //保存
```
## 格式化分区 格式化为ext4
```bash
mkfs.ext4 /dev/sdb1d //或者mkfs -t ext4 /dev/sdb1
```

## 编辑配置文件 实现开机自动挂载
```bash
vim /etc/fstab
```

### 末尾添加
```
/dev/sdb1 /mnt/daobin ext4 defaults 0 0
```
注意：第一个表示磁盘分区路径 第二个表示需要挂载到文件到哪个位置 第三个是文件格式

## 重启之后验证
```bash
reboot
df -h
```
