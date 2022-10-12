import{_ as i,r as e,o as p,c as u,a as n,b as t,w as o,F as d,e as a,d as s}from"./app.f3af98d4.js";const r={},m=a(`<p>\u8BA9\u4F60\u7684 VuePress \u7AD9\u70B9\u4E2D\u7684 Markdown \u6587\u4EF6\u652F\u6301\u4EE3\u7801\u6848\u4F8B\u3002</p><h2 id="\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E" aria-hidden="true">#</a> \u914D\u7F6E</h2><p>:::: code-group</p><p>::: code-group-item TS</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token comment">// .vuepress/config.ts</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> mdEnhance <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@mr-huang/vuepress-plugin-md-extention&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token function">mdEnhance</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token comment">// \u542F\u7528\u4EE3\u7801\u6F14\u793A</span>
      demo<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><div class="highlight-line">\xA0</div><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>:::</p><p>::: code-group-item JS</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// .vuepress/config.js</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> mdEnhance <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;@mr-huang/vuepress-plugin-md-extention&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token function">mdEnhance</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token comment">// \u542F\u7528\u4EE3\u7801\u6F14\u793A</span>
      <span class="token literal-property property">demo</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><div class="highlight-line">\xA0</div><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>:::</p><p>::::</p><h2 id="\u8BED\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u8BED\u6CD5" aria-hidden="true">#</a> \u8BED\u6CD5</h2><p>\u8BF7\u4F7F\u7528\u4EE5\u4E0B\u8BED\u6CD5\uFF1A</p><div class="language-markdown ext-md line-numbers-mode"><pre class="language-markdown"><code>::: demo [\u7C7B\u578B] \u53EF\u9009\u7684\u6807\u9898\u6587\u5B57

<span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">html</span>
<span class="token code-block language-html language-html"><span class="token comment">&lt;!-- \u2191 \u4F7F\u7528\u53EF\u7528\u7684\u8BED\u8A00 --&gt;</span>
<span class="token comment">&lt;!-- \u5728\u4EE3\u7801\u5757\u4E2D\u653E\u7F6E\u4F60\u5BF9\u5E94\u8BED\u8A00\u7684\u4EE3\u7801\uFF0C\u4E00\u4E2A\u8BED\u8A00\u4E0D\u80FD\u51FA\u73B0\u591A\u4E2A\u5757 --&gt;</span>
<span class="token comment">&lt;!-- \u4F60\u53EF\u4EE5\u6709\u591A\u4E2A\u4EE3\u7801\u5757\uFF0C\u5E76\u4E14 html, js, css \u90FD\u662F\u89C6\u60C5\u51B5\u53EF\u9009\u7684 --&gt;</span></span>
<span class="token punctuation">\`\`\`</span></span>

<span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">json</span>
<span class="token code-block language-json language-json"><span class="token comment">// json block \u4F5C\u4E3A\u63D2\u4EF6\u914D\u7F6E\u5B58\u653E\u5904</span>
<span class="token punctuation">{</span>
  <span class="token comment">// \u653E\u7F6E\u4F60\u7684\u914D\u7F6E (\u53EF\u9009\u7684)</span>
<span class="token punctuation">}</span></span>
<span class="token punctuation">\`\`\`</span></span>

:::
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13),v={class:"custom-container tip"},k=n("p",{class:"custom-container-title"},"TIP",-1),b=s("JSON \u5757\u662F\u53EF\u9009\u7684\uFF0C\u53EF\u7528\u7684\u914D\u7F6E\u8BE6\u89C1 "),g=s("\u914D\u7F6E"),h=s("\u3002"),_=a('<p>\u8BE5\u63D2\u4EF6\u652F\u6301\u4E09\u79CD\u7C7B\u578B\uFF1A</p><ul><li>normal (\u9ED8\u8BA4)</li><li>vue</li></ul><h2 id="\u53EF\u7528\u7684\u8BED\u8A00" tabindex="-1"><a class="header-anchor" href="#\u53EF\u7528\u7684\u8BED\u8A00" aria-hidden="true">#</a> \u53EF\u7528\u7684\u8BED\u8A00</h2><p>\u4F60\u53EF\u4EE5\u5728\u6F14\u793A\u5757\u4E2D\u4F7F\u7528\u4E0D\u540C\u8BED\u8A00\u3002</p><p>\u5F53\u4F60\u8BBE\u7F6E\u4E00\u4E9B\u4E0D\u80FD\u5728\u6D4F\u89C8\u5668\u4E0A\u76F4\u63A5\u8FD0\u884C\u7684\u8BED\u8A00\u65F6\uFF0C\u7531\u4E8E\u63D2\u4EF6\u65E0\u6CD5\u89E3\u6790\u5B83\u4EEC\uFF0C\u56E0\u6B64\u7F51\u9875\u6F14\u793A\u5C06\u88AB\u7981\u7528\u3002\u63D2\u4EF6\u53EA\u663E\u793A\u4EE3\u7801\u3002\u540C\u65F6\u63D0\u4F9B\u4E00\u4E2A &quot;\u5728 CodePen \u4E2D\u6253\u5F00&quot; \u6309\u94AE\u5141\u8BB8\u7528\u6237\u76F4\u63A5\u5728 CodePen \u6253\u5F00\u5E76\u6D4F\u89C8\u4EE3\u7801\u3002(\u5F85\u5B8C\u5584\u3002\u3002)</p><p>\u53EF\u7528\u7684 HTML \u8BED\u8A00:</p><ul><li><code>&quot;html&quot;</code> (\u9ED8\u8BA4)</li><li><code>&quot;markdown&quot;</code></li></ul><blockquote><p>\u4F60\u4E5F\u53EF\u4EE5\u5728\u4EE3\u7801\u5757\u4E2D\u4F7F\u7528 <code>md</code>\u3002</p></blockquote><p>\u53EF\u7528\u7684 JS \u8BED\u8A00:</p><ul><li><code>&quot;javascript&quot;</code> (default)</li><li><code>&quot;typescript&quot;</code></li></ul><blockquote><p>\u4F60\u4E5F\u53EF\u4EE5\u5728\u4EE3\u7801\u5757\u4E2D\u4F7F\u7528 <code>js</code>, <code>ts</code>, <code>coffee</code> \u548C <code>ls</code>\u3002</p></blockquote><p>\u53EF\u7528\u7684 CSS \u8BED\u8A00:</p><ul><li><code>&quot;css&quot;</code> (default)</li><li><code>&quot;less&quot;</code></li><li><code>&quot;scss&quot;</code></li><li><code>&quot;sass&quot;</code></li><li><code>&quot;stylus&quot;</code></li></ul><blockquote><p>\u4F60\u4E5F\u53EF\u4EE5\u5728\u4EE3\u7801\u5757\u4E2D\u4F7F\u7528 <code>styl</code>\u3002</p></blockquote><h3 id="\u4E0D\u652F\u6301\u7684\u8BED\u8A00\u6F14\u793A" tabindex="-1"><a class="header-anchor" href="#\u4E0D\u652F\u6301\u7684\u8BED\u8A00\u6F14\u793A" aria-hidden="true">#</a> \u4E0D\u652F\u6301\u7684\u8BED\u8A00\u6F14\u793A</h3>',15),q=n("div",{class:"language-markdown ext-md line-numbers-mode"},[n("pre",{class:"language-markdown"},[n("code",null,[n("span",{class:"token title important"},[n("span",{class:"token punctuation"},"#"),s(" \u6807\u9898")]),s(`

\u975E\u5E38\u7684\u5DF4\u9002
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),f=n("div",{class:"language-typescript ext-ts line-numbers-mode"},[n("pre",{class:"language-typescript"},[n("code",null,[n("span",{class:"token keyword"},"const"),s(" message"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token builtin"},"string"),s(),n("span",{class:"token operator"},"="),s(),n("span",{class:"token string"},'"VuePress Theme Weasel"'),n("span",{class:"token punctuation"},";"),s(`

document`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"querySelector"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"h1"'),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"."),s("innerHTML "),n("span",{class:"token operator"},"="),s(" message"),n("span",{class:"token punctuation"},";"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),y=n("div",{class:"language-scss ext-scss line-numbers-mode"},[n("pre",{class:"language-scss"},[n("code",null,[n("span",{class:"token selector"},"h1 "),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token property"},"font-style"),n("span",{class:"token punctuation"},":"),s(" italic"),n("span",{class:"token punctuation"},";"),s(`

  `),n("span",{class:"token selector"},"+ p "),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token property"},"color"),n("span",{class:"token punctuation"},":"),s(" red"),n("span",{class:"token punctuation"},";"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),E=a(`<div class="language-markdown ext-md line-numbers-mode"><pre class="language-markdown"><code>::: demo \u4E00\u4E2A\u4F7F\u7528\u6D4F\u89C8\u5668\u4E0D\u652F\u6301\u89E3\u6790\u8BED\u8A00 Demo

<span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">md</span>
<span class="token code-block language-md language-md"><span class="token title important"><span class="token punctuation">#</span> \u6807\u9898</span>

\u975E\u5E38\u7684\u5DF4\u9002</span>
<span class="token punctuation">\`\`\`</span></span>

<span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">ts</span>
<span class="token code-block language-ts language-ts"><span class="token keyword">const</span> message<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">&quot;VuePress Theme Weasel&quot;</span><span class="token punctuation">;</span>

document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&quot;h1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> message<span class="token punctuation">;</span></span>
<span class="token punctuation">\`\`\`</span></span>

<span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">scss</span>
<span class="token code-block language-scss language-scss"><span class="token selector">h1 </span><span class="token punctuation">{</span>
  <span class="token property">font-style</span><span class="token punctuation">:</span> italic<span class="token punctuation">;</span>

  <span class="token selector">+ p </span><span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span></span>
<span class="token punctuation">\`\`\`</span></span>

:::
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function C(x,B){const c=e("RouterLink"),l=e("CodeDemo");return p(),u(d,null,[m,n("div",v,[k,n("p",null,[b,t(c,{to:"/cookbook/markdown/code-demo/"},{default:o(()=>[g]),_:1}),h])]),_,t(l,{id:"code-demo-72dd8328",title:"%E4%B8%80%E4%B8%AA%E4%BD%BF%E7%94%A8%E6%B5%8F%E8%A7%88%E5%99%A8%E4%B8%8D%E6%94%AF%E6%8C%81%E8%A7%A3%E6%9E%90%E8%AF%AD%E8%A8%80%20Demo",code:"%7B%22md%22%3A%22%23%20%E6%A0%87%E9%A2%98%5Cn%5Cn%E9%9D%9E%E5%B8%B8%E7%9A%84%E5%B7%B4%E9%80%82%5Cn%22%2C%22ts%22%3A%22const%20message%3A%20string%20%3D%20%5C%22VuePress%20Theme%20Weasel%5C%22%3B%5Cn%5Cndocument.querySelector(%5C%22h1%5C%22).innerHTML%20%3D%20message%3B%5Cn%22%2C%22scss%22%3A%22h1%20%7B%5Cn%20%20font-style%3A%20italic%3B%5Cn%5Cn%20%20%2B%20p%20%7B%5Cn%20%20%20%20color%3A%20red%3B%5Cn%20%20%7D%5Cn%7D%5Cn%22%7D"},{default:o(()=>[q,f,y]),_:1}),E],64)}var w=i(r,[["render",C],["__file","index.html.vue"]]);export{w as default};
