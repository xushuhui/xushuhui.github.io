---
title: redis 详解（5）主从复制
top: 1
date: 2018-02-20 14:51:29
tags: ["redis","NoSQL"]
categories: "redis"
---

## 主从复制定义

- 数据备份
- 扩展读性能，读写分离
- 一个 master 可以有多个 slave
- 一个 slave 只能有一个 master
- 数据流向是单向的，master 到 slave

## 主从复制配置

### 实现方式

- slaveof/slaveof no one 绑定主节点 / 取消绑定
- 配置
  slaveof ip port
  slave-read-only yes

## 全量复制和部分复制

### 全量复制

- slave=>master [psync？-1]
- master=>slave [+FULLRESYNC {runId} {offset}]
- slave [save masterInfo]
- master [bgsave]
- master (write repl_back_buffer)
- master send RDB
- master send buffer
- slave flush old data

### 全量复制开销

- bgsave 时间
- RDB 文件网络传输时间
- 从节点清空数据时间
- 从节点加载 RDB 时间
- 可能的 AOF 重写时间

### 部分复制

- slave 断开
- master write repl_back_buffer
- slave 重新连接 master
- slave=>master pysnc {offset} {runId}
- continue
- master=>slave send partial data

## 开发运维问题

### 读写分离

#### 定义

- 读流量分摊到从节点

#### 问题

- 复制数据延迟
- 读到过期数据
- 从节点故障

### 主从配置不一致

- maxmemory 不一致，丢失数据
- 数据结构优化参数（例如 hash-max-ziplist-entries）内存不一致

### 规避全量复制

#### 第一次全量复制

- 第一次复制不可避免
- 小主节点、低峰（访问量低）

#### 节点运行 ID 不匹配

- 主节点重启，运行 ID 变化
- 故障转移，哨兵或集群

#### 复制挤压缓冲区不足

- 网络中断，部分复制无法满足
- 增大复制缓冲区配置 rel_backlog_size，网络“增强”

### 规避复制风暴

#### 单主节点复制风暴

- 问题：主节点重启，多从节点复制
- 解决：更换复制拓扑

#### 单机器复制风暴

- 问题：机器宕机后，大量全量复制
- 解决：主节点分散多机器

## 欢迎扫描下方二维码，[个人博客](https://www.phpst.cn)，持续关注：

![](https://ww1.sinaimg.cn/large/a616b9a4gy1g4xzv954a4j20760763yo.jpg)

互联网工程师（id:phpstcn），我们一起学习，一起进步
