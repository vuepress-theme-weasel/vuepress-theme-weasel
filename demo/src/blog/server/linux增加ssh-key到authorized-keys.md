---
title: linux增加ssh-key到authorized_keys
tag:
  - linux
  - ssh
  - ssh-key
category:
  - 服务器操作
---

## 原因

在linux系统下

有些配置文件是不允许被任何人（包括root）修改的
为了防止被误修改或删除
可以设定该文件的不可修改位：immutable

## 解决办法 ：chattr

防止关键文件被修改：

```bash
  chattr +i authorized_keys
```

如果需要修改文件则：

```bash
　　chattr -i authorized_keys
```
