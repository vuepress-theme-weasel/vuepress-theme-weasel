# 实用的vue指令结合(持续更新~~)

在 Vue 中，代码复用和抽象的主要形式是组件。然而，有的情况下，你仍然需要对普通 DOM 元素进行底层操作，这时候就会用到自定义指令。
你可以将一些 css 样式抽象到指令中，也可以将一些 js 操作放到指令中去执行。就使用上来说，指令不用像组件一样需要引入和注册，注册后使用非常简洁方便。
对于在项目中常用到的指令，在此做了一个合集介绍，附源码可以直接在项目中使用。

<!-- more -->
## 元素点击范围扩展指令 `v-expandClick`

使用该指令可以隐式的扩展元素的点击范围，由于借用伪元素实现，故不会影响元素在页面上的排列布局。

### 源码
```javascript
/**
 * 元素点击范围扩展指令
 */
export function expandClick(el, binding) {
  const s = document.styleSheets[document.styleSheets.length - 1]
  // 默认向外扩展10px
  const DEFAULT = -10
  const ruleStr = `content:"";position:absolute;top:-${top || DEFAULT}px;bottom:-${bottom || DEFAULT}px;right:-${right || DEFAULT}px;left:-${left || DEFAULT}px;`
  const [top, right, bottom, left] = binding.expression && binding.expression.split(',') || []
  const classNameList = el.className.split(' ')

  el.className = classNameList.includes('expand_click_range') ? classNameList.join(' ') : [...classNameList, 'expand_click_range'].join(' ')
  el.style.position = el.style.position || "relative"
  if (s.insertRule) {
    s.insertRule('.expand_click_range::before' + '{' + ruleStr + '}', s.cssRules.length)
  } else {
    /* IE */
    s.addRule('.expand_click_range::before', ruleStr, -1)
  }
}
```
### 参数 Attributes：
> 可传入的参数为：上右下左扩展的范围，单位 px，默认向外扩展 10px。

| 参数 | 说明 | 默认值 | 类型 | 必填 |
| ---  | --- | ---   | --- | --- |
| top, right, bottom, left | 上右下左扩展宽度（逗号分割），单位px | 10,10,10,10 | String | 否

然后你可以在模板中任何元素上使用新的 `v-expandClick`:

### 示例

```html
<div v-expandClick="20,30,40,50" @click="glabClickoutside"> 点击范围扩大</div>
```

## 文本内容复制指令 `v-copy`

使用该指令可以复制元素的文本内容,指令支持:
  - 单击复制 v-copy
  - 双击复制 v-copy.dblclick
  - 点击icon复制 v-copy.icon

三种模式，不传参数时，默认使用单击复制。

### 源码

```javascript
export default {
  bind (el, binding) {
    // 双击触发复制
    if (binding.modifiers.dblclick) {
      el.addEventListener('dblclick', () => handleClick(el.innerText))
      el.style.cursor = 'copy'
    } else if (binding.modifiers.icon) {
      // 点击icon触发复制
      if (el.hasIcon) return
      const iconElement = document.createElement('i')
      iconElement.setAttribute('class', 'el-icon-document-copy')
      iconElement.setAttribute('style', 'margin-left:5px')
      el.appendChild(iconElement)
      el.hasIcon = true
      iconElement.addEventListener('click', () => handleClick(el.innerText))
      iconElement.style.cursor = 'copy'
    } else {
      // 单击触发复制
      el.addEventListener('click', () => handleClick(el.innerText))
      el.style.cursor = 'copy'
    }
  }
}

function handleClick (text) {
  // 创建元素
  if (!document.getElementById('copyTarget')) {
    const copyTarget = document.createElement('input')
    copyTarget.setAttribute('style', 'position:fixed;top:0;left:0;opacity:0;z-index:-1000;')
    copyTarget.setAttribute('id', 'copyTarget')
    document.body.appendChild(copyTarget)
  }

  // 复制内容
  const input = document.getElementById('copyTarget')
  input.value = text
  input.select()
  document.execCommand('copy')
}
```

### 参数 Attributes：

| 参数 | 说明 | 默认值 | 类型 | 必填 |
| ---  | --- | ---   | --- | --- |
| dblclick | 双击复制文本内容 | 无 | String | 否 |
| icon | 单击icon复制文本内容 | 无 | String | 否 |

然后你可以在模板中任何元素上使用新的 `v-copy`

### 示例

```html
<div v-copy> 单击复制 </div>
<div v-copy.dblclick> 双击复制 </div>
<div v-copy.icon> icon复制 </div>
```

## 元素全屏指令 `v-screenfull`

全屏指令，点击元素进行全屏/退出全屏的操作。支持元素后面是否插入 element-ui 的全屏图标 el-icon-full-screen。

### 源码

```javascript
import screenfull from 'screenfull'

export default {
  bind (el, binding) {
    if (binding.modifiers.icon) {
      if (el.hasIcon) return
      // 创建全屏图标
      const iconElement = document.createElement('i')
      iconElement.setAttribute('class', 'el-icon-full-screen')
      iconElement.setAttribute('style', 'margin-left:5px')
      el.appendChild(iconElement)
      el.hasIcon = true
    }
    el.style.cursor = el.style.cursor || 'pointer'
    // 监听点击全屏事件
    el.addEventListener('click', () => handleClick())
  }
}

function handleClick () {
if (!screenfull.isEnabled) {
    alert('浏览器不支持全屏')
return
  }
  screenfull.toggle()
}
```

### 参数 Attributes：

| 参数 | 说明 | 默认值 | 类型 | 必填 |
| ---  | --- | ---   | --- | --- |
| icon | 是否添加 icon | 无 | String | 否 |

### 示例

```html
<div v-screenfull.icon> 全屏 </div>
```

## 元素说明指令 `v-tooltip`

为元素添加说明，如同 `element-ui` 的 `el-tooltip`（问号 `icon` 在鼠标覆盖后，展示说明文字）。

### 源码

```javascript
import Vue from 'vue'
export default function (el, binding) {
if (el.hasIcon) return
const iconElement = structureIcon(binding.arg, binding.value)
  el.appendChild(iconElement)
  el.hasIcon = true
}

function structureIcon (content, attrs) {
  // 拼接绑定属性
  let attrStr = ''
  for (let key in attrs) {
    attrStr += `${key}=${attrs[key]} `
  }
  const a = `<el-tooltip content=${content} ${attrStr}><i class="el-icon-question" style="margin:0 10px"></i></el-tooltip>`
  // 创建构造器
  const tooltip = Vue.extend({
    template: a
  })
  // 创建一个 tooltip 实例并返回 dom 节点
  const component = new tooltip().$mount()
  return component.$el
}
```

### 参数 Attributes：

| 参数 | 说明 | 默认值 | 类型 | 必填 |
| ---  | --- | ---   | --- | --- |
| content | 传给指令的参数。例如 `v-tooltip:content` 中，参数为 "content" ，tooltip中展示的内容为："content" | 无 | String | 否 |
| tootipParams | element-ui 支持的 tooltip 属性" | 无 | String | 否 |

### 示例

```html
<div v-tooltip:content='tootipParams'> 提示 </div>
<div v-tooltip:提示内容为XXX1> 提示1</div>
<div v-tooltip:提示内容为XXX='tootipParams'> 提示2 </div>

```

为指令传入 element-ui 支持的参数：

```javascript
data() {
  return {
    tootipParams: {
      placement: 'top',
      effect: 'light',
    }
  }
}
```

## 文字超出省略指令 `v-ellipsis`

使用该指令当文字内容超出宽度（默认 100 px）时自动变为省略形式。等同于使用 css：
```css
width: 100px;
whiteSpace: nowrap
overflow: hidden;
textOverflow: ellipsis;
```

### 源码

```javascript
export default function (el, binding) {
  el.style.width = binding.arg || 100 + 'px'
  el.style.whiteSpace = 'nowrap'
  el.style.overflow = 'hidden';
  el.style.textOverflow = 'ellipsis';
}

```

### 参数 Attributes：

| 参数 | 说明 | 默认值 | 类型 | 必填 |
| ---  | --- | ---   | --- | --- |
| width | 元素宽度 | 100 | Number | 否 |

### 示例

```html
<div v-ellipsis:100> 需要省略的文字是阿萨的副本阿萨的副本阿萨的副本阿萨的副本</div>
```

## 回到顶部指令 `v-backtop`

使用该指令可以让页面或指定元素回到顶部。

可选指定元素，如果不指定则全局页面回到顶部。可选在元素偏移多少 `px` 后显示 `backtop` 元素，例如在滚动 `400px` 后显示回到顶部按钮。

### 源码

```javascript
export default {
  bind (el, binding, vnode) {
    // 响应点击后滚动到元素顶部
    el.addEventListener('click', () => {
      const target = binding.arg ? document.getElementById(binding.arg) : window
      target.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    })
  },
  update (el, binding, vnode) {
    // 滚动到达参数值才出现绑定指令的元素
    const target = binding.arg ? document.getElementById(binding.arg) : window
    if (binding.value) {
      target.addEventListener('scroll', (e) => {
        if (e.srcElement.scrollTop > binding.value) {
          el.style.visibility = 'unset'
        } else {
          el.style.visibility = 'hidden'
        }
      })
    }
    // 判断初始化状态
    if (target.scrollTop < binding.value) {
      el.style.visibility = 'hidden'
    }
  },
  unbind (el) {
    const target = binding.arg ? document.getElementById(binding.arg) : window
    target.removeEventListener('scroll')
    el.removeEventListener('click')
  }
}
```

### 参数 Attributes：

| 参数 | 说明 | 默认值 | 类型 | 必填 |
| ---  | --- | ---   | --- | --- |
| id | 给需要回到顶部的元素添加的`id` | 无 | String | 否 |
| offset | 偏移距离为 `height` 时显示指令绑定的元素 | 无 | Number | 否 |

然后你可以在模板中任何元素上使用新的 `v-backtop` ，如下表示在 id 为 `app` 的元素滚动 `400px` 后显示绑定指令的元素

### 示例

```html
<div  v-backtop:app="400"> 回到顶部 </div>
<div  v-backtop> 回到顶部 </div>
```

## 空状态指令 `v-empty`

使用该指令可以显示缺省的空状态。可以传入默认图片（可选，默认无图片）、默认文字内容（可选，默认为暂无数据）、以及标示是否显示空状态（必选）。

### 源码

```javascript
import Vue from "vue";
export default {
  update (el, binding, vnode) {
    el.style.position = el.style.position || 'relative'
    const { offsetHeight, offsetWidth } = el
    const { visible, content, img } = binding.value
    const image = img ? `<img src="${img}" height="30%" width="30%"></img>` : ''
    const defaultStyle = "position:absolute;top:0;left:0;z-index:9999;background:#fff;display:flex;justify-content: center;align-items: center;"
    const empty = Vue.extend({
      template: `<div style="height:${offsetHeight}px;width:${offsetWidth}px;${defaultStyle}">
        <div style="text-align:center">
          <div>${image}</div>
          <div>${content || '暂无数据'}</div>
        </div>
      </div>`
    })
    const component = new empty().$mount().$el
    if (visible) {
      el.appendChild(component)
    } else {
      el.removeChild(el.lastChild)
    }
  }
}
```

### 参数 Attributes：

| 参数 | 说明 | 默认值 | 类型 | 必填 |
| ---  | --- | ---   | --- | --- |
| emptyValue | 包含文字内容 content、图片 img、是否显示 visible，仅 visible 必传 | 无 | Object | 否 |

然后你可以在模板中任何元素上使用新的 `v-empty` ，如下传入对象 `emptyValue`：

### 示例

```html
<div style="height:500px;width:500px" v-empty="emptyValue"> 原本内容</div>
```

需要传入一个参数对象，例如显示文字为：暂无列表，图片路径为 `../../assets/images/blue_big.png`，控制标示 `visible`：

```javascript
emptyValue = {
  content: '暂无列表',
  img: require('../../assets/images/blue_big.png'),
  visible: true,
}
```

## 徽标指令 `v-badge`

使用该指令在元素右上角显示徽标。
支持配置徽标的背景颜色、徽标形状；支持传入徽标上显示的数字。

### 源码

```javascript
import Vue from 'vue'

const SUCCESS = '#72c140'
const ERROR = '#ed5b56'
const WARNING = '#f0af41'
const INFO = '#4091f7'
const HEIGHT = 20
let flag = false
export default {
  update (el, binding, vnode) {
    const { modifiers, value } = binding
    const modifiersKey = Object.keys(modifiers)
    let isDot = modifiersKey.includes('dot')
    let backgroundColor = ''
    if (modifiersKey.includes('success')) {
      backgroundColor = SUCCESS
    } else if (modifiersKey.includes('warning')) {
      backgroundColor = WARNING
    } else if (modifiersKey.includes('info')) {
      backgroundColor = INFO
    } else {
      backgroundColor = ERROR
    }

    const targetTemplate = isDot
        ? `<div style="position:absolute;top:-5px;right:-5px;height:10px;width:10px;border-radius:50%;background:${backgroundColor}"></div>`
        : `<div style="background:${backgroundColor};position:absolute;top:-${HEIGHT / 2}px;right:-${HEIGHT / 2}px;height:${HEIGHT}px;min-width:${HEIGHT}px;border-radius:${HEIGHT / 2}px;text-align:center;line-height:${HEIGHT}px;color:#fff;padding:0 5px;">${value}</div>`

    el.style.position = el.style.position || 'relative'
    const badge = Vue.extend({
      template: targetTemplate
    })
    const component = new badge().$mount().$el
    if (flag) {
      el.removeChild(el.lastChild)
    }
    el.appendChild(component)
    flag = true
  }
}
```

### 参数 Attributes：

| 参数 | 说明 | 默认值 | 类型 | 必填 |
| ---  | --- | ---   | --- | --- |
| normal、dot | 徽标形状normal为正常徽标；dot 仅为一个点 | normal | String | 否 |
| success、error、info、warning | 徽标颜色 | error | String | 否 |
| normal、dot | 徽标形状normal为正常徽标；dot 仅为一个点 | normal | String | 否 |
| number | 徽标上显示的数字 | 无 | Number | 否 |

### 示例

```html
<div v-badge.dot.info="badgeCount" style="height:50px;width:50px;background:#999"> </div>
```

## 拖拽指令 `v-drag`

使用该指令可以对元素进行拖拽。

```javascript
export default {
  let _el = el
  document.onselectstart = function() {
    return false  //禁止选择网页上的文字
  }

  _el.onmousedown = e => {
    let disX = e.clientX - _el.offsetLeft //鼠标按下，计算当前元素距离可视区的距离
    let disY = e.clientY - _el.offsetTop
    document.onmousemove = function(e){
      let l = e.clientX - disX
      let t = e.clientY - disY;
      _el.style.left = l + "px"
      _el.style.top = t + "px"
    }
    document.onmouseup = e => {
      document.onmousemove = document.onmouseup = null
    }
    return false
  }
}
```

### 示例

```html
<div v-drag> 支持拖拽的元素 </div>
```

## 响应缩放指令 `v-resize`

使用该指令可以响应元素宽高改变时执行的方法。

### 源码

```javascript
export default {
  bind(el, binding) {
  let width = '', height = '';
  function isReize() {
    const style = document.defaultView.getComputedStyle(el);
    if (width !== style.width || height !== style.height) {
      binding.value();  // 执行传入的方法
    }
    width = style.width;
    height = style.height;
  }
    el.__timer__ = setInterval(isReize, 300); // 周期性监听元素是否改变
  },
  unbind(el) {
    clearInterval(el.__timer__);
  }
}
```

### 参数 Attributes：

| 参数 | 说明 | 默认值 | 类型 | 必填 |
| ---  | --- | ---   | --- | --- |
| resize() | 传入元素改变 size 后执行的方法 | 无 | Function | 是 |

### 示例

```html
<!--传入 resize() 方法-->
<div v-resize="resize"></div>
```

## 使用方式

如何使用这些指令？

为了便于管理指令，我们将每个指令都存在于单独的 `js` 文件中，你可以像这样将指令 `import` 进来后注册指令：

```javascript

import Vue from 'vue'
import ellipsis from './ellipsis' // 引入指令
// import other directives

const directives = {
  ellipsis
// other directives
}

Object.keys(directives).forEach(name => Vue.directive(name, directives[name]))
```

或者你可以直接使用 `Vue.directive` 进行注册：

```javascript
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
  // 聚焦元素
    el.focus()
  }
})
```
这样就可以正常使用这些指令了：

```html
<div v-指令名称 />
```

我们常常在引入全局功能时，主要都是写于 js 文件、组件中。不同于他们在使用时每次需要引用或注册，在使用上指令更加简洁。

除了将功能封装成组件，还可以多多考虑将一些简洁实用的功能放到 directive 中。例如：常用的 css 样式、js 的一些操作、utils 中的一些工具方法、甚至是一个完整的组件都可以放进去（不过需要考虑一下性能和复杂度）。
