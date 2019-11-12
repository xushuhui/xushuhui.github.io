---
title: 'PHP 写入文件权限失败 file_put_contents: failed to open stream: Permission denied'
date: 2019-06-08 18:16:44
tags: [php]
categories: "php"
top: 0
---

### 问题

写日志的方法中用到 file_put_contents 这个方法，今天在执行回调方法的写日志的时候提示没有写入文件权限，报错提示

```php
file_put_contents: failed to open stream: Permission denied
```

### 解决过程

检查日志文件夹权限，因为是按天生成的，有个定时任务定时执行，执行用户是 root，所以生成文件夹用户和用户组都是 root，而回调方法中执行用户是 www，写入日志方法中

```php
  if(!is_dir($dir)){
        mkdir($dir,0777,true);
    }
```

如果目录不存在，创建目录，但是在 php 的 mkdir 函数创建文件夹设置 777 权限，实际上创建的文件还是 755 的权限。
在 linux 系统中在创建文件 / 文件夹时有一个默认权限，此权限受 umask 设置影响，在 /etc/bashrc 配置文件中我们可以找到如下配置：

```shell
if [ $UID -gt 99 ] && [ "`id -gn`" = "`id -un`" ]; then
        umask 002
else
        umask 022
fi
```

linux 系统中默认的 umask 为 022，与我们的 777& 运算之后，就变成了 755，这就是原因所在了。
这里的设置直接影响到 linux 系统的默认权限设置，不仅仅是 PHP 的问题。所以不建议直接进行修改把 022 改为 000 。

### 最后解决方案

先创建目录，再使用 chmod 将权限修改为 777

```php
mkdir('test', 0777);
chmod('test', 0777);
```

### 欢迎扫描下方二维码，持续关注：

![](https://ww1.sinaimg.cn/large/a616b9a4gy1g4xzv954a4j20760763yo.jpg)

互联网工程师（id:phpstcn），我们一起学习，一起进步
