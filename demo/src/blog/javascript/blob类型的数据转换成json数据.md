---
title: Blob类型数据转换Json数据类型
layout: Blog
category:
  - JavaScript
tag:
  - JavaScript
  - Blob
  - 数据处理
---

> 'FileReader'对象允许Web应用程序异步读取存储在用户计算机上的文件的内容，使用'File'或'Blob'对象指定要读取的文件或数据。

<!-- more -->

## 代码示例

```javascript
// 定义JSON数据
let data = { "name": "小明" };

// 转换成字符串数组
let string = JSON.stringify(data);

// 转换成Blob类型数据
let blobData = new Blob([string]);

// 打印Blob结果： Blob { size: 17, type: "" }
console.log(blobData)

 // 创建读取文件对象
let reader = new FileReader();
reader.addEventListener("loadend", function () {

  // 返回的数据
  let res = JSON.parse(reader.result);
  console.log(res,'返回结果数据') // { name: "小明" }
});

// 设置读取的数据以及返回的数据类型为utf-8
reader.readAsText(blobData, 'utf-8');
```
