---
title: 问题2 nginx 配置 https 出现 no"ssl_certificate" is defined
date: 2018-03-28 16:43:50
tags: [nginx, https, ssl]
categories: "nginx"
top: 0
---

## 一、问题

今天在配置 nginx 的 https 发现报错：

```
2019/01/21 11:21:15 [error] 11593#0: *204154 no "ssl_certificate" is defined in server listening on SSL port while SSL handshaking, client: 175.9.181.35, server: 0.0.0.0:443
2019/01/21 11:21:15 [error] 11593#0: *204155 no "ssl_certificate" is defined in server listening on SSL port while SSL handshaking, client: 175.9.181.35, server: 0.0.0.0:443
2019/01/21 11:21:15 [error] 11593#0: *204156 no "ssl_certificate" is defined in server listening on SSL port while SSL handshaking, client: 175.9.181.35, server: 0.0.0.0:443
```

意思是 ssl_certificate 没有配置，可是 ssl_certificate 和 ssl_certificate_key 都已经配置，网上搜索 ssl_certificate 必须在 http 段中先定义， 在 server 段才配置 ssl_certificate 已经来不及了， 检查我的 nginx 配置，ssl_certificate 确实只在 server 段定义，而在 http 段未定义，加到 http 段即可。

## 二、解决方案

nginx 的配置文件中 nginx.conf 中加入

```
http {
  ssl_certificate  xxx.pem;
  ssl_certificate_key xx.key;
}

```

## 欢迎扫描下方二维码，持续关注：

![](https://ww1.sinaimg.cn/large/a616b9a4gy1g4xzv954a4j20760763yo.jpg)

互联网工程师（id:phpstcn），我们一起学习，一起进步
