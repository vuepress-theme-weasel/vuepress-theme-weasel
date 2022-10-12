import{_ as n,e as s}from"./app.f3af98d4.js";const e={},a=s(`<h2 id="\u542F\u52A8" tabindex="-1"><a class="header-anchor" href="#\u542F\u52A8" aria-hidden="true">#</a> \u542F\u52A8</h2><p>\u542F\u52A8 php-fpm \u6700\u7B80\u5355\u7684\u64CD\u4F5C\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>/usr/local/php/sbin/php-fpm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>master\u8FDB\u7A0B\u53EF\u4EE5\u7406\u89E3\u4EE5\u4E0B\u4FE1\u53F7\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\`INT, TERM\`      \u7ACB\u523B\u7EC8\u6B62

\`QUIT\`           \u5E73\u6ED1\u7EC8\u6B62

\`USR1\`           \u91CD\u65B0\u6253\u5F00\u65E5\u5FD7\u6587\u4EF6

\`USR2\`           \u5E73\u6ED1\u91CD\u8F7D\u6240\u6709worker\u8FDB\u7A0B\u5E76\u91CD\u65B0\u8F7D\u5165\u914D\u7F6E\u548C\u4E8C\u8FDB\u5236\u6A21\u5757
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u91CD\u65B0\u542F\u52A8" tabindex="-1"><a class="header-anchor" href="#\u91CD\u65B0\u542F\u52A8" aria-hidden="true">#</a> \u91CD\u65B0\u542F\u52A8</h2><p>\u5148\u67E5\u770Bphp-fpm\u7684master\u8FDB\u7A0B\u53F7</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">ps</span> -ef<span class="token operator">|</span><span class="token function">grep</span> php-fpm

root27556 <span class="token number">1</span> <span class="token number">0</span> <span class="token number">15</span>:57 ? 00:00:00 php-fpm: master process <span class="token punctuation">(</span>/usr/local/php/etc/php-fpm.conf<span class="token punctuation">)</span>
www27557 <span class="token number">27556</span> <span class="token number">0</span> <span class="token number">15</span>:57 ? 00:00:00 php-fpm: pool www
www27558 <span class="token number">27556</span> <span class="token number">0</span> <span class="token number">15</span>:57 ? 00:00:00 php-fpm: pool www
www27559 <span class="token number">27556</span> <span class="token number">0</span> <span class="token number">15</span>:57 ? 00:00:00 php-fpm: pool www
www27560 <span class="token number">27556</span> <span class="token number">0</span> <span class="token number">15</span>:57 ? 00:00:00 php-fpm: pool www
root27733 <span class="token number">26938</span> <span class="token number">0</span> <span class="token number">16</span>:35 pts/0 00:00:00 <span class="token function">grep</span> php-fpm

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7EE7\u7EED\u6267\u884C</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">kill</span> -USR2 <span class="token number">27556</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,10);function p(i,l){return a}var c=n(e,[["render",p],["__file","php-fpm-actions.html.vue"]]);export{c as default};
