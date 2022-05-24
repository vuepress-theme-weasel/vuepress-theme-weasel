---
title: Vue 代码演示
icon: vue
---

## 格式

````md
::: demo [vue] 可选的标题文字

```vue
<!-- ↑ 你也可以使用 html -->
<template>
  <!-- vue 模板 -->
</template>
<script>
export default {
  // vue 组件
};
</script>
<style>
/* css 代码 */
</style>
```

```json
// 配置 (可选)
```

:::
````

::: warning 注意事项

- 你只能使用 Vue3。
- 必须将组件通过 `export default` 默认导出
- 我们使用 "ShadowDOM" 进行样式隔离，并已经将 `document` 替换为了 `shadowRoot` 对象。如果需要访问页面的 document，请访问 `window.document`。

:::

## 演示

::: demo [vue] 一个 Vue Composition 演示

```vue
<template>
  <div class="box">
    <code>非常的巴适</code> is
    <span @click="handler">{{ message }}</span
    >!
  </div>
</template>
<script>
const { ref } = Vue;

export default {
  setup() {
    const message = ref("巴适");

    const handler = () => {
      message.value = "very " + message.value;
    };

    return {
      message,
      handler,
    };
  },
};
</script>
<style>
.box span {
  color: red;
}
</style>
```

:::

````md
::: demo [vue] 一个 Vue Composition 演示

```vue
<template>
  <div class="box">
    <code>非常的巴适</code> is
    <span @click="handler">{{ message }}</span
    >!
  </div>
</template>
<script>
const { ref } = Vue;

export default {
  setup() {
    const message = ref("巴适");

    const handler = () => {
      message.value = "very " + message.value;
    };

    return {
      message,
      handler,
    };
  },
};
</script>
<style>
.box span {
  color: red;
}
</style>
```

:::
````

::: demo [vue] 一个 Vue Option 演示

```vue
<template>
  <div class="box">
    <code>非常的巴适</code> is
    <span @click="handler">{{ message }}</span
    >!
  </div>
</template>
<script>
export default {
  data: () => ({ message: "巴适" }),
  methods: {
    handler() {
      this.message = "very " + this.message;
    },
  },
};
</script>
<style>
.box span {
  color: red;
}
</style>
```

:::

````md
::: demo [vue] 一个 Vue Option 演示

```vue
<template>
  <div class="box">
    <code>非常的巴适</code> is
    <span @click="handler">{{ message }}</span
    >!
  </div>
</template>
<script>
export default {
  data: () => ({ message: "巴适" }),
  methods: {
    handler() {
      this.message = "very " + this.message;
    },
  },
};
</script>
<style>
.box span {
  color: red;
}
</style>
```

:::
````
