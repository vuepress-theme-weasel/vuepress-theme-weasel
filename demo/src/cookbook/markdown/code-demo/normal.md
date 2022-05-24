---
title: 普通代码演示
icon: code
---

## 格式

````md
::: demo 可选的标题文字

```html
<!-- html code -->
```

```js
// js code
```

```css
/* css code */
```

```json
// 配置 (可选)
{
  "jsLib": [
    ...
  ],
  "cssLib":[
    ...
  ]
}
```

:::
````

::: warning 注意事项

- 我们使用 "ShadowDOM" 进行样式隔离，并已经将 `document` 替换为了 `shadowRoot` 对象。如果需要访问页面的 document，请访问 `window.document`。

:::

## 例子

::: demo Demo 演示

```html
<h1>VuePress Theme Weasel</h1>
<p><span id="app">非常</span>一般!</p>
```

```js
document.querySelector("#app").addEventListener("click", () => {
  alert("非常一般");
});
```

```css
span {
  color: red;
}
```

:::

````md
::: demo Demo 演示

```html
<h1>VuePress Theme Weasel</h1>
<p><span id="app">非常</span>一般!</p>
```

```js
document.querySelector("#app").addEventListener("click", () => {
  alert("非常一般");
});
```

```css
span {
  color: red;
}
```

:::
````
