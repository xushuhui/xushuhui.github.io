---
title: PHP运行模式
date: 2019-03-29 14:52:24
tags: [php,php-fpm,apache,nginx]
categories: "php"
---
### php分为五大运行模式
- cgi(通用网关接口 Common Gateway Interface)
- fast-cgi(cgi升级版本)
- cli(命令行模式 Command Line Interface)
- isapi(Internet Server Application Program Interface,是微软提供的一套面向Internet服务的API接口)
- apache2handler(将php作为apache的模块)
- 其他(continuity,embed,litespeed,milter等)

本地查看运行模式的方法
```php
phpinfo()
php -r "echo php_sapi_name()"
```


选择运行模式前提
- 了解运行模式优缺点和应用场景
- 根据业务本身结合上一条

### CLI模式
- Command Line Interface的简称，支持windows和Linux平台
- 直接在命令行运行，不需要http server,例如php test.php
- 应用场景
    - 定时任务
    - 开发桌面应用使用PHP-CLI和GTK包

### CGI模式
- Common Gateway Interface的简称，连接网页和web服务器执行程序，把http服务器接受指令传给执行程序，把执行程序的结果返回给http服务器，支持跨平台
- 执行过程
    - http服务器接收到用户请求，如index.php，会通过它配置的cgi服务执行
    - 生成一个php-cgi进程，并执行php程序
    - 执行结果返回给http服务器
- 应用场景
    - 提供http服务
- 优缺点
    - 跨平台，几乎能在任何操作系统实现
    - web和server是独立的，结构清晰，可控性强
    - 性能比较差，每一个请求fork一个进程，消耗资源比较多(fork-and-execute模式)
    - 逐渐少见

### FastCGI模式
- 快速通用网关接口(Fast Common Gateway Interface)是CGI的增强版本，是一种让交互程序和web服务器通信的协议，致力于减少web服务器和CGI程序之间互动开销，使服务器可以同时处理更多的网页请求
- 执行过程
    - web服务器启动时载入Fast CGI进程管理器(php-fpm)
    - FastCGI进程管理器会启动多个CGI进程等待web服务器的连接
    - 当客户端请求到达web服务器时，FastCGI进程管理器选择并连接到一个CGI解释器。web服务器把环境变量和标准输入发送到FastCGI子进程php-cgi
    - FastCGI子进程完成处理后将标准输出和错误信息从同一连接返回web服务器。当FastCGI子进程关闭连接时，请求报告处理完成。FastCGI子进程接着等待并处理来自FastCGI进程管理器的下一个连接。在CGI模式中，php-cgi在此便退出了
- 应用场景
    - 提供http服务
- 优缺点
    - 跨平台，几乎能在任何操作系统实现
    - web和server是独立的，结构清晰，可控性强
    - 支持大并发
    - 多进程，消耗较多内存

### 模块模式
- 模块模式指把PHP作为web服务器的一个模块运行
- IIS的ISAPI和Apache的apache2handler

apache2handler
- apache监听一个用户请求index.php
- apache根据conf文件配置的LoadModule php_module modules/mod_php5.so(windows下面是php5apache2_2.dll)调用PHP
- 在mod_php5.so注册一个php的钩子php_ap2_register_hook
- php_ap2_register_hook钩子函数中包括4个挂钩以及对应的函数ap_hook_pre_config，ap_hook_post_config，ap_hook_handler，ap_hook_child_init。其中pre_config，post_config，child_init是启动挂钩，在服务器启动时调用。handler时请求挂钩，在服务器处理请求时调用。其中post_config挂钩中启动php。
- php执行完成后数据通过.so或dll返回给apache
- apache将数据返回到客户端
- 应用场景
    - 提供http服务
- 优缺点
    - 安装配置方便，不需要安装代码解析程序
    - 支持多线程，占用资源少
    - 支持大并发

### 欢迎扫描下方二维码，持续关注：
![](https://user-gold-cdn.xitu.io/2019/3/17/1698b447d75fb9bb?w=258&h=258&f=jpeg&s=28010)
互联网工程师（id:phpstcn），我们一起学习，一起进步