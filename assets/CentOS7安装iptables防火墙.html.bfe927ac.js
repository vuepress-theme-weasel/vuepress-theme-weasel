import{_ as s,e}from"./app.f3af98d4.js";const n={},a=e(`<p>CentOS7\u9ED8\u8BA4\u7684\u9632\u706B\u5899\u4E0D\u662Fiptables,\u800C\u662Ffirewalle.</p><h2 id="\u5B89\u88C5iptable-iptable-service" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5iptable-iptable-service" aria-hidden="true">#</a> \u5B89\u88C5iptable iptable-service</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment">#\u5148\u68C0\u67E5\u662F\u5426\u5B89\u88C5\u4E86iptables</span>
<span class="token function">service</span> iptables status
<span class="token comment">#\u5B89\u88C5iptables</span>
yum <span class="token function">install</span> -y iptables
<span class="token comment">#\u5347\u7EA7iptables</span>
yum update iptables
<span class="token comment">#\u5B89\u88C5iptables-services</span>
yum <span class="token function">install</span> iptables-services
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u7981\u7528-\u505C\u6B62\u81EA\u5E26\u7684firewalld\u670D\u52A1" tabindex="-1"><a class="header-anchor" href="#\u7981\u7528-\u505C\u6B62\u81EA\u5E26\u7684firewalld\u670D\u52A1" aria-hidden="true">#</a> \u7981\u7528/\u505C\u6B62\u81EA\u5E26\u7684firewalld\u670D\u52A1</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment">#\u505C\u6B62firewalld\u670D\u52A1</span>
systemctl stop firewalld
<span class="token comment">#\u7981\u7528firewalld\u670D\u52A1</span>
systemctl mask firewalld
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>1\u3001\u76F4\u63A5\u5173\u95ED\u9632\u706B\u5899 systemctl stop firewalld.service #\u505C\u6B62firewall systemctl disable firewalld.service #\u7981\u6B62firewall\u5F00\u673A\u542F\u52A8</p><p>2\u3001\u8BBE\u7F6E iptables service yum -y install iptables-services</p><p>\u5982\u679C\u8981\u4FEE\u6539\u9632\u706B\u5899\u914D\u7F6E\uFF0C\u5982\u589E\u52A0\u9632\u706B\u5899\u7AEF\u53E33306 vi /etc/sysconfig/iptables</p><p>\u589E\u52A0\u89C4\u5219 -A INPUT -m state \u2013state NEW -m tcp -p tcp \u2013dport 3306 -j ACCEPT \u4FDD\u5B58\u9000\u51FA\u540E\u3002</p><p>systemctl restart iptables.service #\u91CD\u542F\u9632\u706B\u5899\u4F7F\u914D\u7F6E\u751F\u6548 systemctl enable iptables.service #\u8BBE\u7F6E\u9632\u706B\u5899\u5F00\u673A\u542F\u52A8 \u6700\u540E\u91CD\u542F\u7CFB\u7EDF\u4F7F\u8BBE\u7F6E\u751F\u6548\u5373\u53EF\u3002</p><p>\u5728linux\u4E2D\u5173\u95ED\u9632\u706B\u5899\u6709\u4E24\u79CD\u72B6\u6001\u4E00\u79CD\u6C38\u4E45\u5173\u95ED\u9632\u706B\u5899\uFF0C\u53E6\u4E00\u79CD\u662F\u6682\u65F6\u5173\u95ED\u9632\u706B\u5899\u7684\u65B9\u6CD5\uFF0C\u4E0B\u9762\u6211\u4EEC\u4E00\u8D77\u6765\u770B\u770B\u5177\u4F53\u7684\u64CD\u4F5C\u6B65\u9AA4\u3002 \u5173\u95ED\u865A\u62DF\u673A\u9632\u706B\u5899\uFF1A \u5173\u95ED\u547D\u4EE4\uFF1A service iptables stop \u6C38\u4E45\u5173\u95ED\u9632\u706B\u5899\uFF1Achkconfig iptables off \u4E24\u4E2A\u547D\u4EE4\u540C\u65F6\u8FD0\u884C\uFF0C\u8FD0\u884C\u5B8C\u6210\u540E\u67E5\u770B\u9632\u706B\u5899\u5173\u95ED\u72B6\u6001 service iptables status 1 \u5173\u95ED\u9632\u706B\u5899-----service iptables stop 2 \u542F\u52A8\u9632\u706B\u5899-----service iptables start 3 \u91CD\u542F\u9632\u706B\u5899-----service iptables restart 4 \u67E5\u770B\u9632\u706B\u5899\u72B6\u6001--service iptables status 5 \u6C38\u4E45\u5173\u95ED\u9632\u706B\u5899--chkconfig iptables off 6 \u6C38\u4E45\u5173\u95ED\u540E\u542F\u7528--chkconfig iptables on</p><h2 id="\u8BBE\u7F6E\u73B0\u6709\u89C4\u5219" tabindex="-1"><a class="header-anchor" href="#\u8BBE\u7F6E\u73B0\u6709\u89C4\u5219" aria-hidden="true">#</a> \u8BBE\u7F6E\u73B0\u6709\u89C4\u5219</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment">#\u67E5\u770Biptables\u73B0\u6709\u89C4\u5219</span>
iptables -L -n
<span class="token comment">#\u5148\u5141\u8BB8\u6240\u6709,\u4E0D\u7136\u6709\u53EF\u80FD\u4F1A\u676F\u5177</span>
iptables -P INPUT ACCEPT
<span class="token comment">#\u6E05\u7A7A\u6240\u6709\u9ED8\u8BA4\u89C4\u5219</span>
iptables -F
<span class="token comment">#\u6E05\u7A7A\u6240\u6709\u81EA\u5B9A\u4E49\u89C4\u5219</span>
iptables -X
<span class="token comment">#\u6240\u6709\u8BA1\u6570\u5668\u5F520</span>
iptables -Z
<span class="token comment">#\u5141\u8BB8\u6765\u81EA\u4E8Elo\u63A5\u53E3\u7684\u6570\u636E\u5305(\u672C\u5730\u8BBF\u95EE)</span>
iptables -A INPUT -i lo -j ACCEPT
<span class="token comment">#\u5F00\u653E22\u7AEF\u53E3</span>
iptables -A INPUT -p tcp --dport <span class="token number">22</span> -j ACCEPT
<span class="token comment">#\u5F00\u653E21\u7AEF\u53E3(FTP)</span>
iptables -A INPUT -p tcp --dport <span class="token number">21</span> -j ACCEPT
<span class="token comment">#\u5F00\u653E80\u7AEF\u53E3(HTTP)</span>
iptables -A INPUT -p tcp --dport <span class="token number">80</span> -j ACCEPT
<span class="token comment">#\u5F00\u653E443\u7AEF\u53E3(HTTPS)</span>
iptables -A INPUT -p tcp --dport <span class="token number">443</span> -j ACCEPT
<span class="token comment">#\u5141\u8BB8ping</span>
iptables -A INPUT -p icmp --icmp-type <span class="token number">8</span> -j ACCEPT
<span class="token comment">#\u5141\u8BB8\u63A5\u53D7\u672C\u673A\u8BF7\u6C42\u4E4B\u540E\u7684\u8FD4\u56DE\u6570\u636E RELATED,\u662F\u4E3AFTP\u8BBE\u7F6E\u7684</span>
iptables -A INPUT -m state --state  RELATED,ESTABLISHED -j ACCEPT
<span class="token comment">#\u5176\u4ED6\u5165\u7AD9\u4E00\u5F8B\u4E22\u5F03</span>
iptables -P INPUT DROP
<span class="token comment">#\u6240\u6709\u51FA\u7AD9\u4E00\u5F8B\u7EFF\u706F</span>
iptables -P OUTPUT ACCEPT
<span class="token comment">#\u6240\u6709\u8F6C\u53D1\u4E00\u5F8B\u4E22\u5F03</span>
iptables -P FORWARD DROP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="\u5176\u4ED6\u89C4\u5219\u8BBE\u5B9A" tabindex="-1"><a class="header-anchor" href="#\u5176\u4ED6\u89C4\u5219\u8BBE\u5B9A" aria-hidden="true">#</a> \u5176\u4ED6\u89C4\u5219\u8BBE\u5B9A</h1><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment">#\u5982\u679C\u8981\u6DFB\u52A0\u5185\u7F51ip\u4FE1\u4EFB\uFF08\u63A5\u53D7\u5176\u6240\u6709TCP\u8BF7\u6C42\uFF09</span>
iptables -A INPUT -p tcp -s <span class="token number">45.96</span>.174.68 -j ACCEPT
<span class="token comment">#\u8FC7\u6EE4\u6240\u6709\u975E\u4EE5\u4E0A\u89C4\u5219\u7684\u8BF7\u6C42</span>
iptables -P INPUT DROP
<span class="token comment">#\u8981\u5C01\u505C\u4E00\u4E2AIP\uFF0C\u4F7F\u7528\u4E0B\u9762\u8FD9\u6761\u547D\u4EE4\uFF1A</span>
iptables -I INPUT -s ***.***.***.*** -j DROP
<span class="token comment">#\u8981\u89E3\u5C01\u4E00\u4E2AIP\uFF0C\u4F7F\u7528\u4E0B\u9762\u8FD9\u6761\u547D\u4EE4:</span>
iptables -D INPUT -s ***.***.***.*** -j DROP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u4FDD\u5B58\u89C4\u5219\u8BBE\u5B9A" tabindex="-1"><a class="header-anchor" href="#\u4FDD\u5B58\u89C4\u5219\u8BBE\u5B9A" aria-hidden="true">#</a> \u4FDD\u5B58\u89C4\u5219\u8BBE\u5B9A</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment">#\u4FDD\u5B58\u4E0A\u8FF0\u89C4\u5219</span>
<span class="token function">service</span> iptables save
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u5F00\u542Fiptables\u670D\u52A1" tabindex="-1"><a class="header-anchor" href="#\u5F00\u542Fiptables\u670D\u52A1" aria-hidden="true">#</a> \u5F00\u542Fiptables\u670D\u52A1</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment">#\u6CE8\u518Ciptables\u670D\u52A1</span>
<span class="token comment">#\u76F8\u5F53\u4E8E\u4EE5\u524D\u7684chkconfig iptables on</span>
systemctl <span class="token builtin class-name">enable</span> iptables.service
<span class="token comment">#\u5F00\u542F\u670D\u52A1</span>
systemctl start iptables.service
<span class="token comment">#\u67E5\u770B\u72B6\u6001</span>
systemctl status iptables.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u89E3\u51B3vsftpd\u5728iptables\u5F00\u542F\u540E,\u65E0\u6CD5\u4F7F\u7528\u88AB\u52A8\u6A21\u5F0F\u7684\u95EE\u9898</p><p>1.\u9996\u5148\u5728/etc/sysconfig/iptables-config\u4E2D\u4FEE\u6539\u6216\u8005\u6DFB\u52A0\u4EE5\u4E0B\u5185\u5BB9</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment">#\u6DFB\u52A0\u4EE5\u4E0B\u5185\u5BB9,\u6CE8\u610F\u987A\u5E8F\u4E0D\u80FD\u8C03\u6362</span>
<span class="token assign-left variable">IPTABLES_MODULES</span><span class="token operator">=</span><span class="token string">&quot;ip_conntrack_ftp&quot;</span>
<span class="token assign-left variable">IPTABLES_MODULES</span><span class="token operator">=</span><span class="token string">&quot;ip_nat_ftp&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.\u91CD\u65B0\u8BBE\u7F6Eiptables\u8BBE\u7F6E</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>iptables -A INPUT -m state --state  RELATED,ESTABLISHED -j ACCEPT
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u4EE5\u4E0B\u4E3A\u5B8C\u6574\u8BBE\u7F6E\u811A\u672C</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>
iptables -P INPUT ACCEPT
iptables -F
iptables -X
iptables -Z
iptables -A INPUT -i lo -j ACCEPT
iptables -A INPUT -p tcp --dport <span class="token number">22</span> -j ACCEPT
iptables -A INPUT -p tcp --dport <span class="token number">21</span> -j ACCEPT
iptables -A INPUT -p tcp --dport <span class="token number">80</span> -j ACCEPT
iptables -A INPUT -p tcp --dport <span class="token number">443</span> -j ACCEPT
iptables -A INPUT -p icmp --icmp-type <span class="token number">8</span> -j ACCEPT
iptables -A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT
iptables -P INPUT DROP
iptables -P OUTPUT ACCEPT
iptables -P FORWARD DROP
<span class="token function">service</span> iptables save
systemctl restart iptables.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53C2\u6570\u8BF4\u660E:</p><p>\u2013A \u53C2\u6570\u5C31\u770B\u6210\u662F\u6DFB\u52A0\u4E00\u6761\u89C4\u5219 \u2013p \u6307\u5B9A\u662F\u4EC0\u4E48\u534F\u8BAE\uFF0C\u6211\u4EEC\u5E38\u7528\u7684tcp \u534F\u8BAE\uFF0C\u5F53\u7136\u4E5F\u6709udp\uFF0C\u4F8B\u598253\u7AEF\u53E3\u7684DNS \u2013dport \u5C31\u662F\u76EE\u6807\u7AEF\u53E3\uFF0C\u5F53\u6570\u636E\u4ECE\u5916\u90E8\u8FDB\u5165\u670D\u52A1\u5668\u4E3A\u76EE\u6807\u7AEF\u53E3 \u2013sport \u6570\u636E\u4ECE\u670D\u52A1\u5668\u51FA\u53BB\uFF0C\u5219\u4E3A\u6570\u636E\u6E90\u7AEF\u53E3\u4F7F\u7528 \u2013j \u5C31\u662F\u6307\u5B9A\u662F ACCEPT -\u63A5\u6536 \u6216\u8005 DROP \u4E0D\u63A5\u6536</p>`,28);function i(l,t){return a}var d=s(n,[["render",i],["__file","CentOS7\u5B89\u88C5iptables\u9632\u706B\u5899.html.vue"]]);export{d as default};
