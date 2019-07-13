---
title: nginx负载均衡模式
date: 2019-03-29 14:48:42
tags: [nginx]
categories: "nginx"
top: 0
---
Nginx的几种负载均衡模式

### 一、默认轮询

把每个请求逐一分配到不同的server，如果分配到的server不可用，则分配到下一个，直到可用。

```shell
 upstream ng {
        server 127.0.0.1:83;
        server 127.0.0.1:82;
    }
server {
    listen       80;
    server_name  localhost;
    charset utf-8;
    root   /usr/share/nginx/html;
    index  index.html index.htm;
    location / {
       proxy_pass http://ng;
    }
}
```

### 二、权重

weight默认值为1，值越大则代表被访问的几率越大

```
 upstream ng {
        server 127.0.0.1:83 weight=1;
        server 127.0.0.1:82 weight=2;
    }
```

### 三、ip_hash

采用ip_hash指令能解决一个问题，如果客户已经访问了某个服务器，当用户再次访问时，会将该请求通过哈希算法，自动定位到该服务器。
每个请求按访问ip的hash结果分配，这样每个访客固定访问一个后端服务器，可以解决session的问题。否则，用户在某台服务器上登录了，那么该用户第二次请求的时候，负载均衡系统中每次请求都会重新定位到服务器集群中的某一个，那么已经登录某一个服务器的用户再重新定位到另一个服务器，其登录信息将会丢失。

```
upstream ng {
    ip_hash;
    server 127.0.0.1:83;
    server 127.0.0.1:82;
}
```

### 四、least_conn

把请求分配到连接数最少的server

```
upstream test.cc {
    least_conn;
    server 192.168.8.143;
    server 192.168.8.144;
}
```
### 欢迎扫描下方二维码，持续关注：
![](http://ww1.sinaimg.cn/large/a616b9a4gy1g4xzv954a4j20760763yo.jpg)

互联网工程师（id:phpstcn），我们一起学习，一起进步