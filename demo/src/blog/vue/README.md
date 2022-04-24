---
title: Test
layout: Blog
---

::: codeDemo 使用`size`、`style`属性来定义 Card 的样式

```js
console.log(1);
function sum(a,b,c) {
  return a + b + c
}
console.log(sum(1, 2, 3))
```

:::

::: codeDemo 使用`size`、`style`属性来定义 Card 的样式。

```vue
<template>
  <div class="card-wrap">
    <div class="card">{{ title }}</div>
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const title = ref('vitepress-theme-demoblock')
    return { title }
  }
})
</script>

<style lang="less">
.card-wrap {
  text-align: center;
  .card {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 500;
    color: var(--c-brand);
    background: #fff;
    border: 1px solid var(--c-brand);
    height: 80px;
    width: 600px;
  }
}
</style>
```
:::
