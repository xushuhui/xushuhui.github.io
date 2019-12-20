---
title: mysql 架构类问题之 MHA 架构
top: 1
date: 2019-09-21 17:15:04
tags: ["mysql"]
categories: "mysql"
---

## MHA 架构

### 适用的主从复制架构

     主
    / | \
 从 1 从 2 从 3

### 故障转移步骤

- 选举具有最新更新的 slave
- 尝试从宕机的 master 保存二进制日志
- 应用差异的中继日志到其他 slave
- 应用从 master 保存的二进制日志
- 提升选举的 slave 为新的 master
- 配置其他 slave 向新的 mater 同步

### 架构需要的资源

|资源| 数量|说明|
|-|-|-|
|主 DB|1|用于初始主从复制模式的 master 服务器|
|从 DB|2-N|可以配置 2 台或多台从服务器|
|IP 地址|n+2|N 为 MySQL 服务器数量|
|监控用户|1|用于监控数据库状态的 MySQL 用户（all privileges）
|复制用户|1|用于配置 MySQL 复制的 MySQL 用户（replication slave）|

### 架构配置步骤

- 配置一主多从复制的集群架构
- 安装 centos 的 YUM 扩展包
- 配置集群内各主机的 SSH 免认证
- 在各节点安装 mha_node
- 在管理节点安装 mha_manager
- 配置并启动 MHA 管理进程

### 架构优点

- 支持 GTID 的复制方式和基于日志点的复制方式
- 可从多个 slave 中选举最适合的新 master
- 会尝试从旧 master 中尽可能多的保存未同步日志

### 架构缺点

- 未必能获取到旧 master 未同步的日志（主备使用 5.7 以后的半同步复制）
- 需要自行开发写 VIP 转移脚本
- 只监控 master 而没有对 slave 实现高可用的办法

### 架构适用场景

- 使用基于 GTID 的复制方式
- 使用一主多从的复制架构
- 希望更少数据丢失的场景

## 欢迎扫描下方二维码，[个人博客](https://www.phpst.cn)，持续关注：

![](https://ww1.sinaimg.cn/large/a616b9a4gy1g4xzv954a4j20760763yo.jpg)

互联网工程师（id:phpstcn），我们一起学习，一起进步
