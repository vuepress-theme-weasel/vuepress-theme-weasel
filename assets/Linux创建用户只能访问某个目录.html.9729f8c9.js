import{_ as s,e as n}from"./app.f3af98d4.js";const a={},e=n(`<h2 id="\u4E00\u3001\u76F4\u63A5\u521B\u5EFA" tabindex="-1"><a class="header-anchor" href="#\u4E00\u3001\u76F4\u63A5\u521B\u5EFA" aria-hidden="true">#</a> \u4E00\u3001\u76F4\u63A5\u521B\u5EFA</h2><p>1\u3001\u521B\u5EFA\u4E00\u4E2A\u7528\u6237</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">useradd</span> test2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2\u3001\u8BBE\u7F6E\u7528\u6237\u5BC6\u7801</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">passwd</span> test2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>3\u3001\u4FEE\u6539\u767B\u5F55\u540E\u6587\u4EF6\u76EE\u5F55\u548C\u53EA\u5141\u8BB8\u8BBF\u95EE\u67D0\u4E00\u4E2A\u76EE\u5F55 \u4FEE\u6539/etc/ssh/sshd_config \u6587\u4EF6</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment">#Subsystem      sftp    /usr/libexec/openssh/sftp-server</span>
 <span class="token comment">#\u8FD9\u884C\u6307\u5B9A\u4F7F\u7528sftp\u670D\u52A1\u4F7F\u7528\u7CFB\u7EDF\u81EA\u5E26\u7684internal-sftp</span>
Subsystem <span class="token function">sftp</span> internal-sftp
 <span class="token comment">#\u8FD9\u884C\u7528\u6765\u5339\u914D\u7528\u6237</span>
Match User test1
<span class="token comment">#\u7528chroot\u5C06\u7528\u6237\u7684\u6839\u76EE\u5F55\u6307\u5B9A\u5230/usr/local/sftp\uFF0C\u8FD9\u6837\u7528\u6237\u5C31\u53EA\u80FD\u5728/usr/local/sftp\u4E0B\u6D3B\u52A8</span>
ChrootDirectory  /usr/local/sftp

Match User test2<span class="token comment">#\u8BBE\u7F6E\u4E24\u4E2A\u8D26\u53F7</span>
ChrootDirectory /home/aa

X11Forwarding no
AllowTcpForwarding no
ForceCommand internal-sftp <span class="token comment">#\u6307\u5B9Asftp\u547D\u4EE4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4\u3001\u67E5\u770B\u662F\u5426\u767B\u5F55</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sftp</span> -oPort<span class="token operator">=</span><span class="token number">22</span> test2:192.168.2.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u7279\u522B\u6CE8\u610F\uFF1A /usr/local/sftp \u76EE\u5F55\u6240\u5C5E\u662Froot\u3002\u3002\u786E\u4FDD\u76EE\u5F55\u6743\u9650755\u6216\u8005750</p><h2 id="\u4E8C\u3001ftp\u521B\u5EFA" tabindex="-1"><a class="header-anchor" href="#\u4E8C\u3001ftp\u521B\u5EFA" aria-hidden="true">#</a> \u4E8C\u3001ftp\u521B\u5EFA</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>yum -y <span class="token function">install</span> vsftpd  <span class="token comment">#\u901A\u8FC7yum\u6765\u5B89\u88C5vsftpd</span>
<span class="token function">chkconfig</span> vsftpd on <span class="token comment">##\u8BBE\u7F6E\u4E3A\u5F00\u673A\u542F\u52A8</span>
<span class="token function">vi</span> /etc/vsftpd/vsftpd.conf <span class="token comment">#\u8BBE\u7F6E\u914D\u7F6E\u6587\u4EF6</span>

<span class="token assign-left variable">anonymous_enable</span><span class="token operator">=</span>YES    <span class="token comment">#\u8BBE\u7F6E\u662F\u5426\u5141\u8BB8\u533F\u540D\u7528\u6237\u767B\u5F55</span>
<span class="token assign-left variable">local_enable</span><span class="token operator">=</span>YES        <span class="token comment">#\u8BBE\u7F6E\u662F\u5426\u5141\u8BB8\u672C\u5730\u7528\u6237\u767B\u5F55</span>
<span class="token assign-left variable">local_root</span><span class="token operator">=</span>/home        <span class="token comment">#\u8BBE\u7F6E\u672C\u5730\u7528\u6237\u7684\u6839\u76EE\u5F55</span>
<span class="token assign-left variable">write_enable</span><span class="token operator">=</span>YES        <span class="token comment">#\u662F\u5426\u5141\u8BB8\u7528\u6237\u6709\u5199\u6743\u9650</span>
<span class="token assign-left variable">local_umask</span><span class="token operator">=</span>022        <span class="token comment">#\u8BBE\u7F6E\u672C\u5730\u7528\u6237\u521B\u5EFA\u6587\u4EF6\u65F6\u7684umask\u503C</span>
<span class="token assign-left variable">anon_upload_enable</span><span class="token operator">=</span>YES    <span class="token comment">#\u8BBE\u7F6E\u662F\u5426\u5141\u8BB8\u533F\u540D\u7528\u6237\u4E0A\u4F20\u6587\u4EF6</span>
<span class="token assign-left variable">anon_other_write_enable</span><span class="token operator">=</span>YES    <span class="token comment">#\u8BBE\u7F6E\u533F\u540D\u7528\u6237\u662F\u5426\u6709\u4FEE\u6539\u7684\u6743\u9650</span>
<span class="token assign-left variable">anon_world_readable_only</span><span class="token operator">=</span>YES    <span class="token comment">#\u5F53\u4E3AYES\u65F6\uFF0C\u6587\u4EF6\u7684\u5176\u4ED6\u4EBA\u5FC5\u987B\u6709\u8BFB\u7684\u6743\u9650\u624D\u5141\u8BB8\u533F\u540D\u7528\u6237\u4E0B\u8F7D\uFF0C\u5355\u5355\u6240\u6709\u4EBA\u4E3Aftp\u4E14\u6709\u8BFB\u6743\u9650\u662F\u65E0\u6CD5\u4E0B\u8F7D\u7684\uFF0C\u5FC5\u987B\u5176\u4ED6\u4EBA\u4E5F\u6709\u8BFB\u6743\u9650\uFF0C\u624D\u5141\u8BB8\u4E0B\u8F7D</span>
<span class="token assign-left variable">download_enbale</span><span class="token operator">=</span>YES    <span class="token comment">#\u662F\u5426\u5141\u8BB8\u4E0B\u8F7D</span>
<span class="token assign-left variable">chown_upload</span><span class="token operator">=</span>YES        <span class="token comment">#\u8BBE\u7F6E\u533F\u540D\u7528\u6237\u4E0A\u4F20\u6587\u4EF6\u540E\u4FEE\u6539\u6587\u4EF6\u7684\u6240\u6709\u8005</span>
<span class="token assign-left variable">chown_username</span><span class="token operator">=</span>ftpuser    <span class="token comment">#\u4E0E\u4E0A\u9762\u9009\u9879\u8FDE\u7528\uFF0C\u8868\u793A\u4FEE\u6539\u540E\u7684\u6240\u6709\u8005\u4E3Aftpuser</span>
<span class="token assign-left variable">ascii_upload_enable</span><span class="token operator">=</span>YES    <span class="token comment">#\u8BBE\u7F6E\u662F\u5426\u5141\u8BB8\u4F7F\u7528ASCII\u6A21\u5F0F\u4E0A\u4F20\u6587\u4EF6</span>
<span class="token assign-left variable">ascii_download_enable</span><span class="token operator">=</span>YES    <span class="token comment">#\u8BBE\u7F6E\u662F\u5426\u5141\u8BB8\u7528ASCII\u6A21\u5F0F\u4E0B\u8F7D\u6587\u4EF6</span>

<span class="token assign-left variable">chroot_local_user</span><span class="token operator">=</span>YES        <span class="token comment">#\u8BBE\u7F6E\u662F\u5426\u9501\u5B9A\u672C\u5730\u7528\u6237\u5728\u81EA\u5DF1\u7684\u4E3B\u76EE\u5F55\u4E2D\uFF0C\uFF08\u767B\u5F55\u540E\u65E0\u6CD5cd\u5230\u7236\u76EE\u5F55\u6216\u540C\u7EA7\u76EE\u5F55\u4E2D\uFF09</span>
<span class="token assign-left variable">chroot_list_enable</span><span class="token operator">=</span>YES        <span class="token comment">#\u8BBE\u7F6E\u662F\u5426\u5C06\u7528\u6237\u9501\u5B9A\u5728\u81EA\u5DF1\u7684\u4E3B\u76EE\u5F55\u4E2D</span>
<span class="token assign-left variable">chroot_list_file</span><span class="token operator">=</span>/etc/vsftpd/chroot_list    <span class="token comment">#\u5B9A\u4E49\u54EA\u4E9B\u7528\u6237\u5C06\u4F1A\u9501\u5B9A\u5728\u81EA\u5DF1\u7684\u4E3B\u76EE\u5F55\u4E2D</span>
<span class="token assign-left variable">userlist_enable</span><span class="token operator">=</span>YES    <span class="token comment">#\u5F53\u4E3AYES\u65F6\u8868\u793A\u7531userlist_file\u6587\u4EF6\u4E2D\u6307\u5B9A\u7684\u7528\u6237\u624D\u80FD\u767B\u5F55ftp\u670D\u52A1\u5668</span>
<span class="token assign-left variable">userlist_file</span><span class="token operator">=</span>/etc/vsftpd/user_list    <span class="token comment">#\u5F53userlist_enable\u4E3AYES\u65F6\u624D\u751F\u6548</span>

<span class="token function">service</span> vsftpd restart  <span class="token comment">#\u91CD\u542Fvsftpd</span>

<span class="token function">useradd</span> -d /home/www -m /home/www \u7528\u6237 <span class="token comment">##-d \u76EE\u5F55 \u6307\u5B9A\u7528\u6237\u4E3B\u76EE\u5F55\uFF0C\u5982\u679C\u6B64\u76EE\u5F55\u4E0D\u5B58\u5728\uFF0C\u5219\u540C\u65F6\u4F7F\u7528-m\u9009\u9879\uFF0C\u53EF\u4EE5\u521B\u5EFA\u4E3B\u76EE\u5F55\u3002</span>
<span class="token function">passwd</span> \u7528\u6237\u540D <span class="token comment">##\u8BBE\u7F6E\u5BC6\u7801</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5982\u6B64\u914D\u7F6E\u5B8C\u6210\u3002\u3002\u3002\u3002\u3002 \u8BBE\u7F6E\u9632\u706B\u5899</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">vi</span> /etc/sysconfig/iptables-config

<span class="token comment">#\u4FEE\u6539</span>
<span class="token assign-left variable">IPTABLES_MODULES</span><span class="token operator">=</span><span class="token string">&quot;ip_conntrack_ftp&quot;</span>

<span class="token comment">#\u5F00\u653E21\u7AEF\u53E3</span>
<span class="token function">vi</span> /etc/sysconfig/iptables

<span class="token comment">#\u6DFB\u52A0</span>
 -A INPUT -m state --state NEW -m tcp -p tcp --dport <span class="token number">21</span> -j ACCEPT
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u91CD\u542F</p><p>\u5982\u679C\u6B64\u65F6\u8FD8\u4E0D\u80FD\u4E0A\u4F20\u6587\u4EF6\u6743\u9650\uFF0C\u4FEE\u6539SELinux \u6B64\u5904\u4E0D\u5F00\u542FSELinux\uFF0C</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">chmod</span> <span class="token number">755</span> /home/www

<span class="token function">chown</span> -R ftp\u7528\u6237\u540D:root \u76EE\u5F55
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,17);function l(i,t){return e}var o=s(a,[["render",l],["__file","Linux\u521B\u5EFA\u7528\u6237\u53EA\u80FD\u8BBF\u95EE\u67D0\u4E2A\u76EE\u5F55.html.vue"]]);export{o as default};
