---
title: vue自定义指令jsx语法
layout: Blog
---

vue中自定义指令使用jsx语法实现

```javascript
hide () {
  this.visible = false
},
render () {
  const directives = [
    {
      name: 'clickoutside',
      value: this.hide
    }
  ]
  return (
    <div{ ...{ directives } }></div>
  )
}
```

<!-- more -->
