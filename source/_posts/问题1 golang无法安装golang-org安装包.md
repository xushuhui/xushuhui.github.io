---
layout: vscode
title: 问题1 golang无法安装golang.org安装包
date: 2018-03-28 16:44:37
tags: [vscode,golang]
categories: "golang"
top: 0
---
### 一、问题
今天在安装vscode时，报错
```bash 
github.com/ramya-rao-a/go-outline (download)
Fetching https://golang.org/x/tools/go/buildutil?go-get=1
https fetch failed: Get https://golang.org/x/tools/go/buildutil?go-get=1: dial tcp 216.239.37.1:443: connect: connection refused
```
golang.org在国内被墙了，根本无法下载golang.org的安装包和源码包，以及类库。
### 二、解决方式
在[github](https://github.com/golang/lint/issues/288)中找到解决方法，

``` bash
mkdir -p $GOPATH/src/golang.org/x/  
cd $GOPATH/src/golang.org/x/
git clone https://github.com/golang/tools.git
```
然后可以安装了
``` go
go get -v -u github.com/ramya-rao-a/go-outline
```


### 欢迎扫描下方二维码，持续关注：
![](https://ww1.sinaimg.cn/large/a616b9a4gy1g4xzv954a4j20760763yo.jpg)

互联网工程师（id:phpstcn），我们一起学习，一起进步