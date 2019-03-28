---
title: Nginx配置https出现no"ssl_certificate" is defined
date: 2019-03-28 16:43:50
tags: [nginx, https, ssl]

---
### 一、问题
今天在配置nginx的https发现报错：
```
2019/01/21 11:21:15 [error] 11593#0: *204154 no "ssl_certificate" is defined in server listening on SSL port while SSL handshaking, client: 175.9.181.35, server: 0.0.0.0:443
2019/01/21 11:21:15 [error] 11593#0: *204155 no "ssl_certificate" is defined in server listening on SSL port while SSL handshaking, client: 175.9.181.35, server: 0.0.0.0:443
2019/01/21 11:21:15 [error] 11593#0: *204156 no "ssl_certificate" is defined in server listening on SSL port while SSL handshaking, client: 175.9.181.35, server: 0.0.0.0:443
```
意思是ssl_certificate没有配置，可是ssl_certificate和ssl_certificate_key都已经配置，网上搜索ssl_certificate必须在http段中先定义， 在server段才配置ssl_certificate已经来不及了， 检查我的nginx配置，ssl_certificate确实只在server段定义，而在http段未定义，加到http段即可。
### 二、解决方案
nginx的配置文件中nginx.conf中加入
```
http {
  ssl_certificate  xxx.pem;
  ssl_certificate_key xx.key;
}

```


### 欢迎扫描下方二维码，持续关注：
![](https://user-gold-cdn.xitu.io/2019/3/17/1698b447d75fb9bb?w=258&h=258&f=jpeg&s=28010)

互联网工程师（id:phpstcn），我们一起学习，一起进步