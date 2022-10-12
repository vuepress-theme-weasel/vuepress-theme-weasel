import{_ as n,e as s}from"./app.f3af98d4.js";const a={},e=s(`<p>\u4E3B\u9898\u53EF\u4EE5\u4E3A\u4F60\u6DFB\u52A0\u63D0\u793A\u3001\u6CE8\u91CA\u3001\u4FE1\u606F\u3001\u6CE8\u610F\u3001\u8B66\u544A\u548C\u8BE6\u60C5\u81EA\u5B9A\u4E49\u5BB9\u5668\u7684\u652F\u6301\u3002</p><h2 id="\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E" aria-hidden="true">#</a> \u914D\u7F6E</h2><p>:::: code-group</p><p>::: code-group-item TS</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token comment">// .vuepress/config.ts</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineUserConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vuepress&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> weaselTheme <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@mr-huang/vuepress-theme-weasel&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineUserConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  theme<span class="token operator">:</span> <span class="token function">weaselTheme</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    plugins<span class="token operator">:</span> <span class="token punctuation">{</span>
      mdEnhance<span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// this is the default option, so you can use it directly</span>
        container<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><div class="highlight-line">\xA0</div><div class="highlight-line">\xA0</div><div class="highlight-line">\xA0</div><div class="highlight-line">\xA0</div><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>:::</p><p>::: code-group-item JS</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// .vuepress/config.js</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> weaselTheme <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;@mr-huang/vuepress-theme-weasel&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">theme</span><span class="token operator">:</span> <span class="token function">weaselTheme</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">mdEnhance</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// this is the default option, so you can use it directly</span>
        <span class="token literal-property property">container</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><div class="highlight-line">\xA0</div><div class="highlight-line">\xA0</div><div class="highlight-line">\xA0</div><div class="highlight-line">\xA0</div><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>:::</p><p>::::</p><h2 id="\u6F14\u793A" tabindex="-1"><a class="header-anchor" href="#\u6F14\u793A" aria-hidden="true">#</a> \u6F14\u793A</h2><div class="custom-container info"><p class="custom-container-title">INFO</p><p>\u4FE1\u606F\u5BB9\u5668\u3002</p></div><div class="custom-container note"><p class="custom-container-title">NOTE</p><p>\u6CE8\u91CA\u5BB9\u5668\u3002</p></div><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>\u63D0\u793A\u5BB9\u5668</p></div><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>\u8B66\u544A\u5BB9\u5668</p></div><div class="custom-container danger"><p class="custom-container-title">DANGER</p><p>\u5371\u9669\u5BB9\u5668</p></div><details class="custom-block details"><summary>Details</summary><p>\u8BE6\u60C5\u5BB9\u5668</p></details><div class="custom-container info"><p class="custom-container-title">\u81EA\u5B9A\u4E49\u6807\u9898</p><p>\u4E00\u4E2A\u6709 <code>\u4EE3\u7801</code> \u548C <a href="#markdown">\u94FE\u63A5</a> \u7684\u4FE1\u606F\u5BB9\u5668\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div><div class="custom-container note"><p class="custom-container-title">\u81EA\u5B9A\u4E49\u6807\u9898</p><p>\u4E00\u4E2A\u6709 <code>\u4EE3\u7801</code> \u548C <a href="#markdown">\u94FE\u63A5</a> \u7684\u6CE8\u91CA\u5BB9\u5668\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div><div class="custom-container tip"><p class="custom-container-title">\u81EA\u5B9A\u4E49\u6807\u9898</p><p>\u4E00\u4E2A\u6709 <code>\u4EE3\u7801</code> \u548C <a href="#markdown">\u94FE\u63A5</a> \u7684\u63D0\u793A\u5BB9\u5668\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div><div class="custom-container warning"><p class="custom-container-title">\u81EA\u5B9A\u4E49\u6807\u9898</p><p>\u4E00\u4E2A\u6709 <code>\u4EE3\u7801</code> \u548C <a href="#markdown">\u94FE\u63A5</a> \u7684\u8B66\u544A\u5BB9\u5668\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div><div class="custom-container danger"><p class="custom-container-title">\u81EA\u5B9A\u4E49\u6807\u9898</p><p>\u4E00\u4E2A\u6709 <code>\u4EE3\u7801</code> \u548C <a href="#markdown">\u94FE\u63A5</a> \u7684\u5371\u9669\u5BB9\u5668\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div><details class="custom-block details"><summary>\u81EA\u5B9A\u4E49\u6807\u9898</summary><p>\u4E00\u4E2A\u6709 <code>\u4EE3\u7801</code> \u548C <a href="#markdown">\u94FE\u63A5</a> \u7684\u8BE6\u60C5\u5BB9\u5668\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details><div class="custom-container info"><p class="custom-container-title">\u81EA\u5B9A\u4E49\u4FE1\u606F</p></div><div class="custom-container note"><p class="custom-container-title">\u81EA\u5B9A\u4E49\u6CE8\u91CA</p></div><div class="custom-container tip"><p class="custom-container-title">\u81EA\u5B9A\u4E49\u63D0\u793A</p></div><div class="custom-container warning"><p class="custom-container-title">\u81EA\u5B9A\u4E49\u8B66\u544A</p></div><div class="custom-container danger"><p class="custom-container-title">\u81EA\u5B9A\u4E49\u5371\u9669</p></div><div class="language-markdown ext-md line-numbers-mode"><pre class="language-markdown"><code>::: info
\u4FE1\u606F\u5BB9\u5668\u3002
:::

::: note
\u6CE8\u91CA\u5BB9\u5668\u3002
:::

::: tip
\u63D0\u793A\u5BB9\u5668
:::

::: warning
\u8B66\u544A\u5BB9\u5668
:::

::: danger
\u5371\u9669\u5BB9\u5668
:::

::: details
\u8BE6\u60C5\u5BB9\u5668
:::

::: info \u81EA\u5B9A\u4E49\u6807\u9898

\u4E00\u4E2A\u6709 <span class="token code-snippet code keyword">\`\u4EE3\u7801\`</span> \u548C <span class="token url">[<span class="token content">\u94FE\u63A5</span>](<span class="token url">#markdown</span>)</span> \u7684\u4FE1\u606F\u5BB9\u5668\u3002

<span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">js</span>
<span class="token code-block language-js"><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="token punctuation">\`\`\`</span></span>

:::

::: note \u81EA\u5B9A\u4E49\u6807\u9898

\u4E00\u4E2A\u6709 <span class="token code-snippet code keyword">\`\u4EE3\u7801\`</span> \u548C <span class="token url">[<span class="token content">\u94FE\u63A5</span>](<span class="token url">#markdown</span>)</span> \u7684\u6CE8\u91CA\u5BB9\u5668\u3002

<span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">js</span>
<span class="token code-block language-js"><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="token punctuation">\`\`\`</span></span>

:::

::: tip \u81EA\u5B9A\u4E49\u6807\u9898

\u4E00\u4E2A\u6709 <span class="token code-snippet code keyword">\`\u4EE3\u7801\`</span> \u548C <span class="token url">[<span class="token content">\u94FE\u63A5</span>](<span class="token url">#markdown</span>)</span> \u7684\u63D0\u793A\u5BB9\u5668\u3002

<span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">js</span>
<span class="token code-block language-js"><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="token punctuation">\`\`\`</span></span>

:::

::: warning \u81EA\u5B9A\u4E49\u6807\u9898

\u4E00\u4E2A\u6709 <span class="token code-snippet code keyword">\`\u4EE3\u7801\`</span> \u548C <span class="token url">[<span class="token content">\u94FE\u63A5</span>](<span class="token url">#markdown</span>)</span> \u7684\u8B66\u544A\u5BB9\u5668\u3002

<span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">js</span>
<span class="token code-block language-js"><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="token punctuation">\`\`\`</span></span>

:::

::: danger \u81EA\u5B9A\u4E49\u6807\u9898

\u4E00\u4E2A\u6709 <span class="token code-snippet code keyword">\`\u4EE3\u7801\`</span> \u548C <span class="token url">[<span class="token content">\u94FE\u63A5</span>](<span class="token url">#markdown</span>)</span> \u7684\u5371\u9669\u5BB9\u5668\u3002

<span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">js</span>
<span class="token code-block language-js"><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="token punctuation">\`\`\`</span></span>

:::

::: details \u81EA\u5B9A\u4E49\u6807\u9898

\u4E00\u4E2A\u6709 <span class="token code-snippet code keyword">\`\u4EE3\u7801\`</span> \u548C <span class="token url">[<span class="token content">\u94FE\u63A5</span>](<span class="token url">#markdown</span>)</span> \u7684\u8BE6\u60C5\u5BB9\u5668\u3002

<span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">js</span>
<span class="token code-block language-js"><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="token punctuation">\`\`\`</span></span>

:::

::: info \u81EA\u5B9A\u4E49\u4FE1\u606F
:::

::: note \u81EA\u5B9A\u4E49\u6CE8\u91CA
:::

::: tip \u81EA\u5B9A\u4E49\u63D0\u793A
:::

::: warning \u81EA\u5B9A\u4E49\u8B66\u544A
:::

::: danger \u81EA\u5B9A\u4E49\u5371\u9669
:::
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,29);function i(l,c){return e}var t=n(a,[["render",i],["__file","container.html.vue"]]);export{t as default};
