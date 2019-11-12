---
title: wsl 搭建 php 环境请求超时的问题解决方案
date: 2019-03-28 16:42:53
tags: [wsl,nginx,php-fpm]
categories: "php"
top: 0
---

### 一、出现问题

今天在公司电脑安装了 wsl, 在部署 php 环境的时候发现由 nginx 转发到 php-fpm 的请求非常慢，查看 nginx 错误日志显示

```bash
[error] 3383#3383: *74 upstream timed out (110: Connection timed out) while reading upstream, client: 127.0.0.1, server: demo, request: "POST /pms/login HTTP/1.1", upstream: "fastcgi://
    unix:/var/run/php/php7.2-fpm.sock:", host: "demo"
```

nginx 和 fastcgi 的通信方式有两种，一种是 TCP socket 的方式，一种是 unix socket 方式，因为 wsl 安装的 php-fpm 默认是 unix socket，我就没改动了
1.TCP 是使用 TCP 端口连接 127.0.0.1:9000

``` bash
 fastcgi_pass 127.0.0.1:9000;
```

2.Socket 是使用 unix domain socket 连接套接字 php-fpm.sock

``` bash
 fastcgi_pass unix:/var/run/php/php7.2-fpm.sock;
```

### 二、两种通信方式的分析和总结

从原理上来说，unix socket 方式肯定要比 tcp 的方式快而且消耗资源少，因为 socket 之间在 nginx 和 php-fpm 的进程之间通信，而 tcp 需要经过本地回环驱动，还要申请临时端口和 tcp 相关资源。
当然还是从原理上来说，unix socket 会显得不是那么稳定，当并发连接数爆发时，会产生大量的长时缓存，在没有面向连接协议支撑的情况下，大数据包很有可能就直接出错并不会返回异常。而 TCP 这样的面向连接的协议，多少可以保证通信的正确性和完整性。
因为我是作为开发环境使用，所以直接用 unix socket, 而服务器上用 tcp, 用于负载均衡。

### 三、解决方案

在 nginx 的配置文件中加入

```bash
 fastcgi_buffering off;
```

这个配置是否启用读取 fastcgi 服务器消息的缓冲功能。 如果配置为 on，nginx 在接收到 fastcgi 服务器的响应结果时尽快将响应写到缓冲区（由 fastcgi_buffer_size 和 fastcgi_buffering 指令控制）中，如果响应结果超过了缓冲区的大小，nginx 会将超出部分写到临时文件（由 fastcgi_max_temp_file_size 和 fastcgi_temp_file_write_size 指令控制）中。 如果配置为 off，nginx 在接收到 fastcgi 服务器的响应结果时，会将结果同步发送给客户端，不等到所有的响应结果接收完成时，一次性读取响应结果的最大值为 fastcgi_buffer_size 配置的大小

### 欢迎扫描下方二维码，持续关注：

![](https://ww1.sinaimg.cn/large/a616b9a4gy1g4xzv954a4j20760763yo.jpg)

互联网工程师（id:phpstcn），我们一起学习，一起进步
