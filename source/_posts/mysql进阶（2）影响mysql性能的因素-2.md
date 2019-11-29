---
title: mysql 进阶（2）影响 mysql 性能的因素 (2)
top: 1
date: 2016-05-12 15:55:20
tags: ["mysql"]
categories: "mysql"
---

## 服务器系统

- Windows
- Linux

### Centos

#### 内核相关参数（/etc/sysctl.conf）

##### 网络相关

- net.core.somaxconn=65535
- net.core.netdev_max_backlog=65535
- net.ipv4.tcp_max_syn_backlog=65535
- net.ipv4.tcp_fin_timeout=10
- net.ipv4.tcp_tw_reuse=1
- net.ipv4.tcp_tw_recycle=1
- net.core.wmem_default=87380
- net.core.wmem_max=16777216
- net.core.rmem_default=87380
- net.core.rmem_max=16777216
- net.ipv4.tcp_keepalive_time=120
- net.ipv4.tcp_keepalive_intvl=30
- net.ipv4.tcp_keepalive_probes=3

##### 内核相关

- kernel.shmmax=4294967295
**内核参数最重要参数之一，定义单个共享内存段的最大值**
**这个参数应该设置足够大，以便能够在一个共享内存段下容纳整个 Innodb 缓冲池大小**
**建议取值大于物理内存的一半，一般取值 Innodb 缓冲池大小**

## 数据库存储引擎

## 数据库参数配置

## 数据库结构设计和 SQL 语句

## 欢迎扫描下方二维码，持续关注：

![](https://ww1.sinaimg.cn/large/a616b9a4gy1g4xzv954a4j20760763yo.jpg)

互联网工程师（id:phpstcn），我们一起学习，一起进步
