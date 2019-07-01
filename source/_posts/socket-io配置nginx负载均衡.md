---
title: socket.io配置nginx负载均衡
date: 2019-05-07 07:57:34
tags: ["node","nginx"]
categories: "node"
---
nginx配置
```shell
upstream nodes {
            ip_hash;
       		server 192.168.1.114:3000;
            server 192.168.1.114:3001;
            server 192.168.1.114:3002;
}
server {
    listen 80;
    server_name ws;
    index index.html index.htm index.php;

    location /{
		proxy_pass http://nodes; #反向代理集群
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header Host $http_host;
		proxy_set_header X-NginX-Proxy true;
		proxy_redirect off;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection "upgrade";
    }
}
```
socket.io
```js
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log('Server listening at port %d', port);
});

```