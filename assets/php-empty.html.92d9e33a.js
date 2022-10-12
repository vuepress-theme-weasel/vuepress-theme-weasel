import{_ as n,e as s}from"./app.f3af98d4.js";const a={},p=s(`<h2 id="empty\u4F7F\u7528\u7684\u8BEF\u533A" tabindex="-1"><a class="header-anchor" href="#empty\u4F7F\u7528\u7684\u8BEF\u533A" aria-hidden="true">#</a> empty\u4F7F\u7528\u7684\u8BEF\u533A</h2><p>\u6700\u8FD1\u5728\u5B66\u4E60php\u6B63\u5219\u8868\u8FBE\u5F0F\uFF0C\u5B66\u4E60\u5B8C\u6210\u4E4B\u540E\u5728\u5199\u4E00\u4E2A\u9A8C\u8BC1\u7C7B\u5DE5\u5177\u7684\u65F6\u5019\u6709\u4E00\u6BB5\u4EE3\u7801\u5982\u4E0B\uFF1A</p><div class="language-php ext-php line-numbers-mode"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">isUrl</span><span class="token punctuation">(</span><span class="token variable">$subject</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
   <span class="token variable">$res</span> <span class="token operator">=</span> <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token function">regex</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;url&#39;</span> <span class="token punctuation">,</span> <span class="token variable">$subject</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token keyword">return</span> <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token function">changeBool</span><span class="token punctuation">(</span><span class="token variable">$res</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">protected</span> <span class="token keyword">function</span> <span class="token function-definition function">changeBool</span><span class="token punctuation">(</span><span class="token variable">$res</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span> <span class="token keyword">empty</span><span class="token punctuation">(</span><span class="token variable">$res</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token variable">$res</span> <span class="token operator">===</span> <span class="token constant boolean">false</span> <span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token constant boolean">false</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
     <span class="token keyword">return</span> <span class="token constant boolean">true</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5176\u4E2DisUrl\u662F\u5224\u65AD\u662F\u5426\u662Furl\uFF0C\u8FD4\u56DEbool\u7C7B\u578B\uFF0C\u5176\u4E2D\u7684regex()\u65B9\u6CD5\u4F1A\u6839\u636E\u5B9E\u4F8B\u5316\u65F6\u9884\u5B9A\u4E49\u7684\u53D8\u91CF\u6765\u786E\u5B9A\u7684\u503C\u5B9Epreg_match\u7684\u8FD4\u56DE\u503C\u8FD8\u662Fpreg_match_all\u7684\u5339\u914D\u7ED3\u679C\u3002\u5B9E\u4F8B\u5316\u51FD\u6570\u5982\u4E0B\uFF1A</p><div class="language-php ext-php line-numbers-mode"><pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">__construct</span><span class="token punctuation">(</span> <span class="token variable">$isReturnRes</span> <span class="token operator">=</span> <span class="token constant boolean">false</span> <span class="token punctuation">,</span> <span class="token variable">$modifier</span> <span class="token operator">=</span> <span class="token string single-quoted-string">&#39;&#39;</span> <span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">isReturnRes</span> <span class="token operator">=</span> <span class="token variable">$isReturnRes</span><span class="token punctuation">;</span>
    <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">modifier</span> <span class="token operator">=</span> <span class="token variable">$modifier</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5176\u4E2DisReturnRes\u4EE3\u8868\u662F\u5426\u8FD4\u56DE\u7ED3\u679C\u96C6\uFF0Cmodifier\u662F\u6B63\u5219\u7684\u4FEE\u6B63\u7B26\uFF0C\u5373Ui\u7B49\u3002 \u5F53\u5B9E\u4F8B\u5316isReturnRes\u4E3Atrue\u5E76\u4E14\u65E0\u7ED3\u679C\u5339\u914D\u65F6\uFF0Cres\u4F1A\u8FD4\u56DE\u4E00\u4E2A\u7A7A\u7684\u4E8C\u7EF4\u6570\u7EC4\u3002\u5982\u4E0B\uFF1A</p><div class="language-php ext-php line-numbers-mode"><pre class="language-php"><code><span class="token keyword">array</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">=&gt;</span>
     <span class="token keyword">array</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
     <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u800C\u6B64\u65F6\u4F7F\u7528empty()\u5224\u65AD\u8FD9\u4E2A\u503C\u662F\u5426\u4E3A\u7A7A\u65F6\uFF0C\u5219\u8FD4\u56DEfalse</p><div class="language-php ext-php line-numbers-mode"><pre class="language-php"><code><span class="token variable">$subject</span> <span class="token operator">=</span> <span class="token string double-quoted-string">&quot;aaaa@qq.com&quot;</span><span class="token punctuation">;</span>

<span class="token function">preg_match_all</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;/d+/&#39;</span><span class="token punctuation">,</span>subject<span class="token punctuation">,</span>matches<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">var_dump</span><span class="token punctuation">(</span>matches<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token function">vardump</span><span class="token punctuation">(</span><span class="token keyword">empty</span><span class="token punctuation">(</span>matches<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">array</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">=&gt;</span> <span class="token keyword">array</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span> <span class="token keyword type-declaration">bool</span><span class="token punctuation">(</span><span class="token constant boolean">false</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6240\u4EE5\uFF0Cempty\u662F\u4E0D\u80FD\u5224\u65AD\u4E8C\u7EF4\u6216\u8005\u591A\u7EF4\u6570\u7EC4\u662F\u5426\u4E3A\u7A7A\u7684\u3002 empty\u5224\u65AD\u4E3A\u7A7A\u7684\u6761\u4EF6\u5982\u4E0B\uFF1A</p><div class="language-php ext-php line-numbers-mode"><pre class="language-php"><code><span class="token constant">NULL</span>
<span class="token number">0</span> \uFF08<span class="token keyword type-declaration">int</span>\u4E0B\u4E3A<span class="token number">0</span>\u7684\u503C\uFF09
<span class="token number">0.0</span> <span class="token punctuation">(</span><span class="token keyword type-declaration">float</span>\u4E0B\u4E3A<span class="token number">0</span>\u7684\u503C\uFF0C\u5F53\u7136<span class="token number">0.00000</span>\u4E5F\u662F\u4E3A\u7A7A\u7684<span class="token punctuation">)</span>
<span class="token string double-quoted-string">&quot;0&quot;</span> <span class="token punctuation">(</span><span class="token keyword type-declaration">string</span>\u4E0B\u4E3A<span class="token number">0</span>\u7684\u503C\uFF0C<span class="token number">0.0</span>\u5C31\u4E0D\u662F\u7A7A\u4E86<span class="token punctuation">)</span>
<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">(</span>\u7A7A\u6570\u7EC4\uFF09
<span class="token string double-quoted-string">&quot;&quot;</span> <span class="token punctuation">(</span>\u7A7A\u503C<span class="token punctuation">)</span>
<span class="token constant boolean">false</span> <span class="token punctuation">(</span><span class="token keyword type-declaration">bool</span>\u4E3A<span class="token constant boolean">false</span><span class="token punctuation">)</span>
<span class="token keyword">var</span><span class="token punctuation">(</span>\u58F0\u660E\u8FC7<span class="token keyword">var</span><span class="token punctuation">)</span>
<span class="token variable">$var</span><span class="token punctuation">;</span>
<span class="token function">var_dump</span><span class="token punctuation">(</span><span class="token keyword">empty</span><span class="token punctuation">(</span><span class="token string double-quoted-string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// bool(true)</span>
<span class="token function">var_dump</span><span class="token punctuation">(</span><span class="token keyword">empty</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// bool(true)</span>
<span class="token function">var_dump</span><span class="token punctuation">(</span><span class="token keyword">empty</span><span class="token punctuation">(</span><span class="token number">0.0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// bool(true)</span>
<span class="token function">var_dump</span><span class="token punctuation">(</span><span class="token keyword">empty</span><span class="token punctuation">(</span><span class="token string double-quoted-string">&quot;0&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// bool(true)</span>
<span class="token function">var_dump</span><span class="token punctuation">(</span><span class="token keyword">empty</span><span class="token punctuation">(</span><span class="token constant">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// bool(true)</span>
<span class="token function">var_dump</span><span class="token punctuation">(</span><span class="token keyword">empty</span><span class="token punctuation">(</span><span class="token constant boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// bool(true)</span>
<span class="token function">var_dump</span><span class="token punctuation">(</span><span class="token keyword">empty</span><span class="token punctuation">(</span><span class="token variable">$var</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// bool(true)</span>
<span class="token function">var_dump</span><span class="token punctuation">(</span><span class="token keyword">empty</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// bool(true)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6240\u4EE5\uFF0C\u8981\u60F3\u5224\u65AD\u4E8C\u7EF4\u6570\u7EC4\u662F\u5426\u4E3A\u7A7A\uFF0C\u53EF\u4EE5\u4F7F\u7528\u5982\u4E0B\u65B9\u6CD5</p><div class="language-php ext-php line-numbers-mode"><pre class="language-php"><code>array_filter\u51FD\u6570\u6765\u8FC7\u6EE4\u7A7A\u503C\uFF0C\u7136\u540E\u4F7F\u7528<span class="token keyword">empty</span>\u6216\u8005count\u51FD\u6570
<span class="token keyword">var</span><span class="token operator">=</span><span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token function">echocount</span><span class="token punctuation">(</span><span class="token keyword">var</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3</span>
<span class="token keyword">echo</span> <span class="token string double-quoted-string">&quot;&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">echo</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token function">array_filter</span><span class="token punctuation">(</span><span class="token keyword">var</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//0echo&quot;&quot;;vardump(empty(arrayfilter(var))); // true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="empty\u548Cisset\u7684\u4F7F\u7528\u573A\u666F" tabindex="-1"><a class="header-anchor" href="#empty\u548Cisset\u7684\u4F7F\u7528\u573A\u666F" aria-hidden="true">#</a> empty\u548Cisset\u7684\u4F7F\u7528\u573A\u666F</h2><p>\u76F8\u4FE1\u4F5C\u4E3A\u65B0\u624B\u7684\u6211\u4EEC\uFF0C\u6BCF\u6B21\u7528\u5230empty()\u548Cisset()\u65F6\u7B49\u90FD\u4F1A\u6709\u8FD9\u6837\u7684\u7591\u60D1\uFF1A\u8FD9\u4E8C\u8005\u6709\u4F55\u533A\u522B\uFF1F\u4EC0\u4E48\u65F6\u5019\u9700\u8981\u7528empty()\uFF1F\u4EC0\u4E48\u65F6\u5019\u7528isset()? \u9996\u5148\uFF0Cisset()\u7684\u8FD4\u56DE\u503C\u5982\u4E0B\uFF1A</p><p>\u5982\u679C var \u5B58\u5728\u5E76\u4E14\u503C\u4E0D\u662F NULL \u5219\u8FD4\u56DE TRUE \uFF0C\u5426\u5219\u8FD4\u56DE FALSE \u3002 empty\u7684\u8FD4\u56DE\u503C\u5982\u4E0B\uFF1A</p><p>\u5F53var\u5B58\u5728\uFF0C\u5E76\u4E14\u662F\u4E00\u4E2A\u975E\u7A7A\u975E\u96F6\u7684\u503C\u65F6\u8FD4\u56DE FALSE \u5426\u5219\u8FD4\u56DE TRUE . \u4EE5\u4E0B\u7684\u4E1C\u897F\u88AB\u8BA4\u4E3A\u662F\u7A7A\u7684\uFF1A</p><div class="language-php ext-php line-numbers-mode"><pre class="language-php"><code><span class="token number">1.</span> <span class="token string double-quoted-string">&quot;&quot;</span> <span class="token punctuation">(</span>\u7A7A\u5B57\u7B26\u4E32<span class="token punctuation">)</span>
<span class="token number">2.</span> <span class="token number">0</span> <span class="token punctuation">(</span>\u4F5C\u4E3A\u6574\u6570\u7684<span class="token number">0</span><span class="token punctuation">)</span>
<span class="token number">3.</span> <span class="token number">0.0</span> <span class="token punctuation">(</span>\u4F5C\u4E3A\u6D6E\u70B9\u6570\u7684<span class="token number">0</span><span class="token punctuation">)</span>
<span class="token number">4.</span> <span class="token string double-quoted-string">&quot;0&quot;</span> <span class="token punctuation">(</span>\u4F5C\u4E3A\u5B57\u7B26\u4E32\u7684<span class="token number">0</span><span class="token punctuation">)</span>
<span class="token number">5.</span> <span class="token constant">NULL</span>
<span class="token number">6.</span> <span class="token constant boolean">FALSE</span>
<span class="token number">7.</span> <span class="token keyword">array</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>\u4E00\u4E2A\u7A7A\u6570\u7EC4<span class="token punctuation">)</span>
<span class="token number">8.</span> <span class="token variable">$var</span><span class="token punctuation">;</span> <span class="token punctuation">(</span>\u4E00\u4E2A\u58F0\u660E\u4E86\uFF0C\u4F46\u662F\u6CA1\u6709\u503C\u7684\u53D8\u91CF<span class="token punctuation">)</span>

<span class="token variable">$var</span><span class="token punctuation">;</span>
<span class="token function">var_dump</span><span class="token punctuation">(</span><span class="token keyword">empty</span><span class="token punctuation">(</span><span class="token string double-quoted-string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// bool(true)</span>
<span class="token function">var_dump</span><span class="token punctuation">(</span><span class="token keyword">empty</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// bool(true)</span>
<span class="token function">var_dump</span><span class="token punctuation">(</span><span class="token keyword">empty</span><span class="token punctuation">(</span><span class="token number">0.0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// bool(true)</span>
<span class="token function">var_dump</span><span class="token punctuation">(</span><span class="token keyword">empty</span><span class="token punctuation">(</span><span class="token string double-quoted-string">&quot;0&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// bool(true)</span>
<span class="token function">var_dump</span><span class="token punctuation">(</span><span class="token keyword">empty</span><span class="token punctuation">(</span><span class="token constant">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// bool(true)</span>
<span class="token function">var_dump</span><span class="token punctuation">(</span><span class="token keyword">empty</span><span class="token punctuation">(</span><span class="token constant boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// bool(true)</span>
<span class="token function">var_dump</span><span class="token punctuation">(</span><span class="token keyword">empty</span><span class="token punctuation">(</span><span class="token variable">$var</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// bool(true)</span>
<span class="token function">var_dump</span><span class="token punctuation">(</span><span class="token keyword">empty</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// bool(true)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6839\u636E\u4EE5\u4E0A\u53EF\u4EE5\u770B\u51FA\uFF0C\u53EA\u8981$var\u5B58\u5728\u4E14\u4E0D\u4E3Anull,isset\u5C31\u4F1A\u8FD4\u56DEtrue\u3002 \u4F8B\u5B50\u5982\u4E0B\uFF1A</p><div class="language-php ext-php line-numbers-mode"><pre class="language-php"><code><span class="token variable">$var</span><span class="token punctuation">;</span>
<span class="token function">var_dump</span><span class="token punctuation">(</span><span class="token keyword">isset</span><span class="token punctuation">(</span><span class="token variable">$var</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// false</span>
<span class="token variable">$var</span> <span class="token operator">=</span> <span class="token string double-quoted-string">&quot;&quot;</span><span class="token punctuation">;</span>
<span class="token function">var_dump</span><span class="token punctuation">(</span><span class="token keyword">isset</span><span class="token punctuation">(</span><span class="token variable">$var</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// true</span>
<span class="token variable">$var</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token function">var_dump</span><span class="token punctuation">(</span><span class="token keyword">isset</span><span class="token punctuation">(</span><span class="token variable">$var</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// true</span>
<span class="token variable">$var</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token function">var_dump</span><span class="token punctuation">(</span><span class="token keyword">isset</span><span class="token punctuation">(</span><span class="token variable">$var</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// true</span>
<span class="token variable">$var</span> <span class="token operator">=</span> <span class="token constant">null</span><span class="token punctuation">;</span>
<span class="token function">var_dump</span><span class="token punctuation">(</span><span class="token keyword">isset</span><span class="token punctuation">(</span><span class="token variable">$var</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// false</span>
<span class="token variable">$var</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;a&#39;</span> <span class="token operator">=&gt;</span> <span class="token number">1</span> <span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;b&#39;</span> <span class="token operator">=&gt;</span> <span class="token number">2</span> <span class="token punctuation">,</span> <span class="token string double-quoted-string">&quot;c&quot;</span> <span class="token operator">=&gt;</span> <span class="token number">3</span> <span class="token punctuation">,</span> <span class="token string double-quoted-string">&quot;d&quot;</span> <span class="token operator">=&gt;</span> <span class="token string double-quoted-string">&quot;&quot;</span> <span class="token punctuation">,</span> <span class="token string double-quoted-string">&quot;e&quot;</span> <span class="token operator">=&gt;</span> <span class="token constant">null</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token function">var_dump</span><span class="token punctuation">(</span><span class="token keyword">isset</span><span class="token punctuation">(</span><span class="token variable">$var</span><span class="token punctuation">[</span><span class="token string double-quoted-string">&quot;d&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// true</span>
<span class="token function">var_dump</span><span class="token punctuation">(</span><span class="token keyword">isset</span><span class="token punctuation">(</span><span class="token variable">$var</span><span class="token punctuation">[</span><span class="token string double-quoted-string">&quot;e&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// false</span>
<span class="token function">var_dump</span><span class="token punctuation">(</span><span class="token keyword">isset</span><span class="token punctuation">(</span><span class="token variable">$var</span><span class="token punctuation">[</span><span class="token string double-quoted-string">&quot;f&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// false</span>
<span class="token keyword">unset</span><span class="token punctuation">(</span><span class="token variable">$var</span><span class="token punctuation">[</span><span class="token string double-quoted-string">&quot;d&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">var_dump</span><span class="token punctuation">(</span><span class="token keyword">isset</span><span class="token punctuation">(</span><span class="token variable">$var</span><span class="token punctuation">[</span><span class="token string double-quoted-string">&quot;d&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7531\u6B64\u53EF\u4EE5\u770B\u51FA\uFF0Cisset()\u5224\u65AD\u7684\u53D8\u91CF\uFF0C\u8981\u662F\u4E0D\u5B58\u5728\u3001\u6CA1\u6709\u88AB\u8D4B\u503C\u6216\u8005\u8D4B\u503C\u4E3Anull\u6216\u8005\u88ABunset\u65F6\uFF0C\u4F1A\u8FD4\u56DEfalse,\u5176\u4F59\u60C5\u51B5\u90FD\u4F1A\u8FD4\u56DEtrue\uFF1B\u800Cempty()\u5728\u503C\u4E3A0\u30010.0\u6216\u8005\u4E3A\u7A7A\u65F6\u90FD\u4F1A\u8FD4\u56DEtrue\uFF0C\u8FD9\u610F\u5473\u7740\uFF0C\u6211\u4EEC\u5728\u4F7F\u7528\u53D8\u91CF\u5904\u7406\u51FD\u6570\u65F6\uFF0C\u5F53\u8BE5\u53D8\u91CF\u53EF\u80FD\u51FA\u73B00\u6216\u8005\u7A7A\u7684\u7684\u503C\uFF0C\u4F7F\u7528 empty() \u8981\u5C0F\u5FC3\uFF0C\u8FD9\u4E2A\u65F6\u5019\u7528 isset \u53D6\u4EE3\u5B83\u66F4\u660E\u667A\u4E00\u4E9B\u3002 \u56E0\u6B64\u53EF\u4EE5\u5F97\u51FA\u7ED3\u8BBA\uFF1A</p><p>\u5F53\u8981\u5224\u65AD\u4E00\u4E2A\u53D8\u91CF\u662F\u5426\u5DF2\u7ECF\u58F0\u660E\u7684\u65F6\u5019\u53EF\u4EE5\u4F7F\u7528isset\u51FD\u6570\u3002 \u5F53\u8981\u5224\u65AD\u4E00\u4E2A\u53D8\u91CF\u662F\u5426\u5DF2\u7ECF\u8D4B\u4E88\u6570\u636E\u4E14\u8865\u4F4D\u7A7A\uFF0C\u53EF\u4EE5\u7528empty\u51FD\u6570\u3002 \u5F53\u8981\u5224\u65AD\u4E00\u4E2A\u53D8\u91CF\u5B58\u5728\u4E14\u4E0D\u4E3A\u7A7A\uFF0C\u5148isset\u51FD\u6570\uFF0C\u518D\u7528empty\u51FD\u6570\u3002</p>`,22);function t(e,o){return p}var u=n(a,[["render",t],["__file","php-empty.html.vue"]]);export{u as default};