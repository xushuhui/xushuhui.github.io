---
title: PHP 运行模式
date: 2019-03-29 14:52:24
tags: [php,php-fpm,apache,nginx]
categories: "php"
top: 0
---

### 运行模式

php 分为五大运行模式
- cgi（通用网关接口 Common Gateway Interface)
- fast-cgi(cgi 升级版本）
- cli（命令行模式 Command Line Interface)
- isapi(Internet Server Application Program Interface, 是微软提供的一套面向 Internet 服务的 API 接口）
- apache2handler（将 php 作为 apache 的模块）
- 其他 (continuity,embed,litespeed,milter 等）

本地查看运行模式的方法

```php
phpinfo()
php -r "echo php_sapi_name()"
```

选择运行模式前提
- 了解运行模式优缺点和应用场景
- 根据业务本身结合上一条

### CLI 模式

- Command Line Interface 的简称，支持 windows 和 Linux 平台
- 直接在命令行运行，不需要 http server, 例如 php test.php
- 应用场景
    - 定时任务
    - 开发桌面应用使用 PHP-CLI 和 GTK 包

### CGI 模式

- Common Gateway Interface 的简称，连接网页和 web 服务器执行程序，把 http 服务器接受指令传给执行程序，把执行程序的结果返回给 http 服务器，支持跨平台
- 执行过程
    - http 服务器接收到用户请求，如 index.php，会通过它配置的 cgi 服务执行
    - 生成一个 php-cgi 进程，并执行 php 程序
    - 执行结果返回给 http 服务器
- 应用场景
    - 提供 http 服务
- 优缺点
    - 跨平台，几乎能在任何操作系统实现
    - web 和 server 是独立的，结构清晰，可控性强
    - 性能比较差，每一个请求 fork 一个进程，消耗资源比较多 (fork-and-execute 模式）
    - 逐渐少见

### FastCGI 模式

- 快速通用网关接口 (Fast Common Gateway Interface) 是 CGI 的增强版本，是一种让交互程序和 web 服务器通信的协议，致力于减少 web 服务器和 CGI 程序之间互动开销，使服务器可以同时处理更多的网页请求
- 执行过程
    - web 服务器启动时载入 Fast CGI 进程管理器 (php-fpm)
    - FastCGI 进程管理器会启动多个 CGI 进程等待 web 服务器的连接
    - 当客户端请求到达 web 服务器时，FastCGI 进程管理器选择并连接到一个 CGI 解释器。web 服务器把环境变量和标准输入发送到 FastCGI 子进程 php-cgi
    - FastCGI 子进程完成处理后将标准输出和错误信息从同一连接返回 web 服务器。当 FastCGI 子进程关闭连接时，请求报告处理完成。FastCGI 子进程接着等待并处理来自 FastCGI 进程管理器的下一个连接。在 CGI 模式中，php-cgi 在此便退出了
- 应用场景
    - 提供 http 服务
- 优缺点
    - 跨平台，几乎能在任何操作系统实现
    - web 和 server 是独立的，结构清晰，可控性强
    - 支持大并发
    - 多进程，消耗较多内存

### 模块模式

- 模块模式指把 PHP 作为 web 服务器的一个模块运行
- IIS 的 ISAPI 和 Apache 的 apache2handler

apache2handler
- apache 监听一个用户请求 index.php
- apache 根据 conf 文件配置的 LoadModule php_module modules/mod_php5.so(windows 下面是 php5apache2_2.dll) 调用 PHP
- 在 mod_php5.so 注册一个 php 的钩子 php_ap2_register_hook
- php_ap2_register_hook 钩子函数中包括 4 个挂钩以及对应的函数 ap_hook_pre_config，ap_hook_post_config，ap_hook_handler，ap_hook_child_init。其中 pre_config，post_config，child_init 是启动挂钩，在服务器启动时调用。handler 时请求挂钩，在服务器处理请求时调用。其中 post_config 挂钩中启动 php。
- php 执行完成后数据通过。so 或 dll 返回给 apache
- apache 将数据返回到客户端
- 应用场景
    - 提供 http 服务
- 优缺点
    - 安装配置方便，不需要安装代码解析程序
    - 支持多线程，占用资源少
    - 支持大并发

### 欢迎扫描下方二维码，持续关注：

![](http://ww1.sinaimg.cn/large/a616b9a4gy1g4xzv954a4j20760763yo.jpg)

互联网工程师（id:phpstcn），我们一起学习，一起进步
