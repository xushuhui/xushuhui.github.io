---
title: mysql 架构类问题之 MMM 架构
top: 1
date: 2019-09-20 16:13:52
tags: ["mysql"]
categories: "mysql"
---

## MMM 和 MHA 架构

### MMM 和 MHA 架构的作用

* 对主从复制集群的 master 进行监控
* 当 master 宕机后把写 VIP 迁移到新 master
* 重新配置集群中其他 slave 对新的 master 同步

## MMM 架构

### 适用的主从复制架构

     主  --  主备
    / | \
 从 1 从 2 从 3

### 故障转移步骤

#### slave 服务器上的操作

- 完成原 master 上已复制日志的恢复
- 适用 change master 命令配置新 master

#### 主备服务器上的操作

- 设置 read_only=off
- 迁移写 vip 到新 master

### 架构需要的资源

|资源| 数量|说明|
|-|-|-|
|主 DB|2|用于主备模式的主主复制配置|
|从 DB|0-N|可以配置 0 台或多台从服务器|
|IP 地址|2n+1|N 为 MySQL 服务器数量|
|监控用户|1|用于监控数据库状态的 MySQL 用户（replication client）
|代理用户|1|用于 MMM 的 agent 端改变 read_only 状态（super，replication client，process）|
|复制用户|1|用于配置数据库状态的 MySQL 用户（replication slave）|

### 架构配置步骤

- 配置主主复制的集群架构
- 安装 centos 的 YUM 扩展包
- 安装所需的 Perl 支持包
- 安装 MMM 工具包
- 配置并启用 MMM 服务

### 架构优点

- 提供了读写 VIP 配置，使读写请求都可以达到高可用
- 工具包相对完善，不需要额外开发脚本
- 完成故障转移后，可以持续对 MySQL 集群进行高可用监控

### 架构缺点

- 故障切换简单粗暴易丢事务（主备使用 5.7 以后的半同步复制）
- 不支持 GTID 的复制方式（自行修改 perl 脚本实现）
- 社区不活跃，很久未更新版本

### 架构适用场景

- 使用基于日志点的主从复制方式
- 使用主主复制架构
- 需要考虑读高可用的场景

## 欢迎扫描下方二维码，[个人博客](https://www.phpst.cn)，持续关注：

![](https://ww1.sinaimg.cn/large/a616b9a4gy1g4xzv954a4j20760763yo.jpg)

互联网工程师（id:phpstcn），我们一起学习，一起进步
