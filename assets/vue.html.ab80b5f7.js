import{_ as c,r as i,o,c as u,b as t,w as l,F as p,e as a,a as n,d as s}from"./app.f3af98d4.js";const d={},r=a(`<h2 id="\u683C\u5F0F" tabindex="-1"><a class="header-anchor" href="#\u683C\u5F0F" aria-hidden="true">#</a> \u683C\u5F0F</h2><div class="language-markdown ext-md line-numbers-mode"><pre class="language-markdown"><code>::: demo [vue] \u53EF\u9009\u7684\u6807\u9898\u6587\u5B57

<span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">vue</span>
<span class="token code-block language-vue language-vue">&lt;!-- \u2191 \u4F60\u4E5F\u53EF\u4EE5\u4F7F\u7528 html --&gt;
&lt;template&gt;
  &lt;!-- vue \u6A21\u677F --&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
  // vue \u7EC4\u4EF6
};
&lt;/script&gt;
&lt;style&gt;
/* css \u4EE3\u7801 */
&lt;/style&gt;</span>
<span class="token punctuation">\`\`\`</span></span>

<span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">json</span>
<span class="token code-block language-json language-json"><span class="token comment">// \u914D\u7F6E (\u53EF\u9009)</span></span>
<span class="token punctuation">\`\`\`</span></span>

:::
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">\u6CE8\u610F\u4E8B\u9879</p><ul><li>\u4F60\u53EA\u80FD\u4F7F\u7528 Vue3\u3002</li><li>\u5FC5\u987B\u5C06\u7EC4\u4EF6\u901A\u8FC7 <code>export default</code> \u9ED8\u8BA4\u5BFC\u51FA</li><li>\u6211\u4EEC\u4F7F\u7528 &quot;ShadowDOM&quot; \u8FDB\u884C\u6837\u5F0F\u9694\u79BB\uFF0C\u5E76\u5DF2\u7ECF\u5C06 <code>document</code> \u66FF\u6362\u4E3A\u4E86 <code>shadowRoot</code> \u5BF9\u8C61\u3002\u5982\u679C\u9700\u8981\u8BBF\u95EE\u9875\u9762\u7684 document\uFF0C\u8BF7\u8BBF\u95EE <code>window.document</code>\u3002</li></ul></div><h2 id="\u6F14\u793A" tabindex="-1"><a class="header-anchor" href="#\u6F14\u793A" aria-hidden="true">#</a> \u6F14\u793A</h2>`,4),v=n("div",{class:"language-vue ext-vue line-numbers-mode"},[n("pre",{class:"language-vue"},[n("code",null,[n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("template")]),n("span",{class:"token punctuation"},">")]),s(`
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("div")]),s(),n("span",{class:"token attr-name"},"class"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("box"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("code")]),n("span",{class:"token punctuation"},">")]),s("\u975E\u5E38\u7684\u5DF4\u9002"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("code")]),n("span",{class:"token punctuation"},">")]),s(` is
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("span")]),s(),n("span",{class:"token attr-name"},"@click"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("handler"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},">")]),s("{{ message }}"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("span")]),s(`
    `),n("span",{class:"token punctuation"},">")]),s(`!
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("div")]),n("span",{class:"token punctuation"},">")]),s(`
`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("template")]),n("span",{class:"token punctuation"},">")]),s(`
`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("script")]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token script"},[n("span",{class:"token language-javascript"},[s(`
`),n("span",{class:"token keyword"},"const"),s(),n("span",{class:"token punctuation"},"{"),s(" ref "),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token operator"},"="),s(" Vue"),n("span",{class:"token punctuation"},";"),s(`

`),n("span",{class:"token keyword"},"export"),s(),n("span",{class:"token keyword"},"default"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token function"},"setup"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token keyword"},"const"),s(" message "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"ref"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"\u5DF4\u9002"'),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`

    `),n("span",{class:"token keyword"},"const"),s(),n("span",{class:"token function-variable function"},"handler"),s(),n("span",{class:"token operator"},"="),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token punctuation"},"{"),s(`
      message`),n("span",{class:"token punctuation"},"."),s("value "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token string"},'"very "'),s(),n("span",{class:"token operator"},"+"),s(" message"),n("span",{class:"token punctuation"},"."),s("value"),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},";"),s(`

    `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token punctuation"},"{"),s(`
      message`),n("span",{class:"token punctuation"},","),s(`
      handler`),n("span",{class:"token punctuation"},","),s(`
    `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},";"),s(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},";"),s(`
`)])]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("script")]),n("span",{class:"token punctuation"},">")]),s(`
`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("style")]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token style"},[n("span",{class:"token language-css"},[s(`
`),n("span",{class:"token selector"},".box span"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token property"},"color"),n("span",{class:"token punctuation"},":"),s(" red"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("style")]),n("span",{class:"token punctuation"},">")]),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),k=a(`<div class="language-markdown ext-md line-numbers-mode"><pre class="language-markdown"><code>::: demo [vue] \u4E00\u4E2A Vue Composition \u6F14\u793A

<span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">vue</span>
<span class="token code-block language-vue language-vue">&lt;template&gt;
  &lt;div class=&quot;box&quot;&gt;
    &lt;code&gt;\u975E\u5E38\u7684\u5DF4\u9002&lt;/code&gt; is
    &lt;span @click=&quot;handler&quot;&gt;{{ message }}&lt;/span
    &gt;!
  &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
const { ref } = Vue;

export default {
  setup() {
    const message = ref(&quot;\u5DF4\u9002&quot;);

    const handler = () =&gt; {
      message.value = &quot;very &quot; + message.value;
    };

    return {
      message,
      handler,
    };
  },
};
&lt;/script&gt;
&lt;style&gt;
.box span {
  color: red;
}
&lt;/style&gt;</span>
<span class="token punctuation">\`\`\`</span></span>

:::
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),m=n("div",{class:"language-vue ext-vue line-numbers-mode"},[n("pre",{class:"language-vue"},[n("code",null,[n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("template")]),n("span",{class:"token punctuation"},">")]),s(`
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("div")]),s(),n("span",{class:"token attr-name"},"class"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("box"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},">")]),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("code")]),n("span",{class:"token punctuation"},">")]),s("\u975E\u5E38\u7684\u5DF4\u9002"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("code")]),n("span",{class:"token punctuation"},">")]),s(` is
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("span")]),s(),n("span",{class:"token attr-name"},"@click"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("handler"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},">")]),s("{{ message }}"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("span")]),s(`
    `),n("span",{class:"token punctuation"},">")]),s(`!
  `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("div")]),n("span",{class:"token punctuation"},">")]),s(`
`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("template")]),n("span",{class:"token punctuation"},">")]),s(`
`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("script")]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token script"},[n("span",{class:"token language-javascript"},[s(`
`),n("span",{class:"token keyword"},"export"),s(),n("span",{class:"token keyword"},"default"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token function-variable function"},"data"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"{"),s(),n("span",{class:"token literal-property property"},"message"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"\u5DF4\u9002"'),s(),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"methods"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token function"},"handler"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token keyword"},"this"),n("span",{class:"token punctuation"},"."),s("message "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token string"},'"very "'),s(),n("span",{class:"token operator"},"+"),s(),n("span",{class:"token keyword"},"this"),n("span",{class:"token punctuation"},"."),s("message"),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},";"),s(`
`)])]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("script")]),n("span",{class:"token punctuation"},">")]),s(`
`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("style")]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token style"},[n("span",{class:"token language-css"},[s(`
`),n("span",{class:"token selector"},".box span"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token property"},"color"),n("span",{class:"token punctuation"},":"),s(" red"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("style")]),n("span",{class:"token punctuation"},">")]),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),b=a(`<div class="language-markdown ext-md line-numbers-mode"><pre class="language-markdown"><code>::: demo [vue] \u4E00\u4E2A Vue Option \u6F14\u793A

<span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">vue</span>
<span class="token code-block language-vue language-vue">&lt;template&gt;
  &lt;div class=&quot;box&quot;&gt;
    &lt;code&gt;\u975E\u5E38\u7684\u5DF4\u9002&lt;/code&gt; is
    &lt;span @click=&quot;handler&quot;&gt;{{ message }}&lt;/span
    &gt;!
  &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
  data: () =&gt; ({ message: &quot;\u5DF4\u9002&quot; }),
  methods: {
    handler() {
      this.message = &quot;very &quot; + this.message;
    },
  },
};
&lt;/script&gt;
&lt;style&gt;
.box span {
  color: red;
}
&lt;/style&gt;</span>
<span class="token punctuation">\`\`\`</span></span>

:::
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function g(C,h){const e=i("CodeDemo");return o(),u(p,null,[r,t(e,{id:"code-demo-bfc28fc8",type:"vue",title:"%E4%B8%80%E4%B8%AA%20Vue%20Composition%20%E6%BC%94%E7%A4%BA",code:"%7B%22vue%22%3A%22%3Ctemplate%3E%5Cn%20%20%3Cdiv%20class%3D%5C%22box%5C%22%3E%5Cn%20%20%20%20%3Ccode%3E%E9%9D%9E%E5%B8%B8%E7%9A%84%E5%B7%B4%E9%80%82%3C%2Fcode%3E%20is%5Cn%20%20%20%20%3Cspan%20%40click%3D%5C%22handler%5C%22%3E%7B%7B%20message%20%7D%7D%3C%2Fspan%5Cn%20%20%20%20%3E!%5Cn%20%20%3C%2Fdiv%3E%5Cn%3C%2Ftemplate%3E%5Cn%3Cscript%3E%5Cnconst%20%7B%20ref%20%7D%20%3D%20Vue%3B%5Cn%5Cnexport%20default%20%7B%5Cn%20%20setup()%20%7B%5Cn%20%20%20%20const%20message%20%3D%20ref(%5C%22%E5%B7%B4%E9%80%82%5C%22)%3B%5Cn%5Cn%20%20%20%20const%20handler%20%3D%20()%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20message.value%20%3D%20%5C%22very%20%5C%22%20%2B%20message.value%3B%5Cn%20%20%20%20%7D%3B%5Cn%5Cn%20%20%20%20return%20%7B%5Cn%20%20%20%20%20%20message%2C%5Cn%20%20%20%20%20%20handler%2C%5Cn%20%20%20%20%7D%3B%5Cn%20%20%7D%2C%5Cn%7D%3B%5Cn%3C%2Fscript%3E%5Cn%3Cstyle%3E%5Cn.box%20span%20%7B%5Cn%20%20color%3A%20red%3B%5Cn%7D%5Cn%3C%2Fstyle%3E%5Cn%22%7D"},{default:l(()=>[v]),_:1}),k,t(e,{id:"code-demo-1c6515aa",type:"vue",title:"%E4%B8%80%E4%B8%AA%20Vue%20Option%20%E6%BC%94%E7%A4%BA",code:"%7B%22vue%22%3A%22%3Ctemplate%3E%5Cn%20%20%3Cdiv%20class%3D%5C%22box%5C%22%3E%5Cn%20%20%20%20%3Ccode%3E%E9%9D%9E%E5%B8%B8%E7%9A%84%E5%B7%B4%E9%80%82%3C%2Fcode%3E%20is%5Cn%20%20%20%20%3Cspan%20%40click%3D%5C%22handler%5C%22%3E%7B%7B%20message%20%7D%7D%3C%2Fspan%5Cn%20%20%20%20%3E!%5Cn%20%20%3C%2Fdiv%3E%5Cn%3C%2Ftemplate%3E%5Cn%3Cscript%3E%5Cnexport%20default%20%7B%5Cn%20%20data%3A%20()%20%3D%3E%20(%7B%20message%3A%20%5C%22%E5%B7%B4%E9%80%82%5C%22%20%7D)%2C%5Cn%20%20methods%3A%20%7B%5Cn%20%20%20%20handler()%20%7B%5Cn%20%20%20%20%20%20this.message%20%3D%20%5C%22very%20%5C%22%20%2B%20this.message%3B%5Cn%20%20%20%20%7D%2C%5Cn%20%20%7D%2C%5Cn%7D%3B%5Cn%3C%2Fscript%3E%5Cn%3Cstyle%3E%5Cn.box%20span%20%7B%5Cn%20%20color%3A%20red%3B%5Cn%7D%5Cn%3C%2Fstyle%3E%5Cn%22%7D"},{default:l(()=>[m]),_:1}),b],64)}var E=c(d,[["render",g],["__file","vue.html.vue"]]);export{E as default};
