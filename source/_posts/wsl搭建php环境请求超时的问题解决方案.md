---
title: wsl搭建php环境请求超时的问题解决方案
date: 2019-03-28 16:42:53
tags: [wsl,nginx,php-fpm]
categories: "php"
top: 0
---
### 一、出现问题
今天在公司电脑安装了wsl,在部署php环境的时候发现由nginx转发到php-fpm的请求非常慢，查看nginx错误日志显示
```
[error] 3383#3383: *74 upstream timed out (110: Connection timed out) while reading upstream, client: 127.0.0.1, server: demo, request: "POST /pms/login HTTP/1.1", upstream: "fastcgi://
    unix:/var/run/php/php7.2-fpm.sock:", host: "demo"
```
nginx和fastcgi的通信方式有两种，一种是TCP socket的方式，一种是unix socket方式,因为wsl安装的php-fpm默认是unix socket，我就没改动了
1.TCP是使用TCP端口连接127.0.0.1:9000
``` bash
 fastcgi_pass 127.0.0.1:9000;
```
2.Socket是使用unix domain socket连接套接字php-fpm.sock

``` bash
 fastcgi_pass unix:/var/run/php/php7.2-fpm.sock;
```

### 二、两种通信方式的分析和总结

从原理上来说，unix socket方式肯定要比tcp的方式快而且消耗资源少，因为socket之间在nginx和php-fpm的进程之间通信，而tcp需要经过本地回环驱动，还要申请临时端口和tcp相关资源。
当然还是从原理上来说，unix socket会显得不是那么稳定，当并发连接数爆发时，会产生大量的长时缓存，在没有面向连接协议支撑的情况下，大数据包很有可能就直接出错并不会返回异常。而TCP这样的面向连接的协议，多少可以保证通信的正确性和完整性。
因为我是作为开发环境使用，所以直接用unix socket,而服务器上用tcp,用于负载均衡。

### 三、解决方案
在nginx的配置文件中加入
```bash
 fastcgi_buffering off;
```
这个配置是否启用读取fastcgi服务器消息的缓冲功能。 如果配置为on，nginx在接收到fastcgi服务器的响应结果时尽快将响应写到缓冲区（由fastcgi_buffer_size和fastcgi_buffering指令控制）中，如果响应结果超过了缓冲区的大小，nginx会将超出部分写到临时文件（由fastcgi_max_temp_file_size和fastcgi_temp_file_write_size指令控制）中。 如果配置为off，nginx在接收到fastcgi服务器的响应结果时，会将结果同步发送给客户端，不等到所有的响应结果接收完成时，一次性读取响应结果的最大值为fastcgi_buffer_size配置的大小


### 欢迎扫描下方二维码，持续关注：
![](http://ww1.sinaimg.cn/large/a616b9a4gy1g4xzv954a4j20760763yo.jpg)

互联网工程师（id:phpstcn），我们一起学习，一起进步