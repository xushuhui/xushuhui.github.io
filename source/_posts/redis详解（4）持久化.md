---
title: redis 详解（4）持久化
top: 1
date: 2018-02-10 14:51:29
tags: ["redis","NoSQL"]
categories: "redis"
---

## 定义

redis 所有数据保存在内存中，对数据更新将异步保存到磁盘

## 持久化的作用

|方式|说明|
|-|-|
|快照|mysql dump,redis RDB|
|日志|mysql binlog,redis AOF,hbase Hlog|

## RDB

### 定义

- redis 创建二进制的 RDB 文件
- redis 启动载入已经存在的 RDB 文件

### 三种主要方式触发

#### save（同步）

- client 发送 save 命令到 server，server 创建 RDB 文件，会阻塞主进程
- 如果存在老文件，新文件会替换老文件
- 时间复杂度 O(n)

#### bgsave（异步）

- client 发送 bgsave 命令到 server，server fork 一个子进程创建 RDB 文件
- server 返回给 client 成功信息

|命令|save|bgsave|
|-|-|-|
|IO 类型|同步|异步|
|是否阻塞|是|是，阻塞发送在 fork|
|时间复杂度|O(n)|O(n)|
|优点|不会消耗额外内存|不阻塞客户端命令|
|缺点|阻塞客户端命令|需要 fork，消耗内存|

#### 自动配置

|配置|seconds|changes|
|-|-|-|
|save|900|1|
|save|300|10|
|save|60|10000|

### 其他方式触发

- 全量复制
- debug reload
- shutdown

### 总结

- RDB 是 redis 内存到硬盘的快照，用于持久化
- save 通常会阻塞 redis
- bgsave 不会阻塞 redis，但是会 fork 新进程
- save 自动配置满足任一就会被执行

## AOF

### RDB 现存问题

- 耗时耗性能
- 不可控，丢失数据

### 定义

- 日志文件

### 三种策略

#### always

- redis 写命令刷新到缓冲区，每条命令 fsync 到硬盘

#### everysec

- redis 写命令刷新到缓冲区，每秒把缓冲区 fsync 到硬盘

#### no

- redis 写命令刷新到缓冲区，操作系统决定什么时间 fsync 到硬盘

|命令|always|everysec|no|
|-|-|-|-|
|优点|不丢失数据|每秒一次 fsync|不用管理|
|缺点|IO 开销大|丢一秒数据|不可控|

### 重写

#### 优势

- 减少磁盘占用量
- 加快恢复速度

#### 实现方式

- bgrewriteaof 命令
client 发送 bgrewriteaof 命令到 server，server fork 一个子进程执行 AOF 重写，创建 AOF 文件
- aof 重写配置

|配置名|说明|
|-|-|
|auto-aof-rewrite-min-size|aof 文件重写需要的大小|
|auto-aof-rewrite-percentage|aof 文件增长率|

|统计名|说明|
|-|-|
|aof_current_size|aof 当前大小（单位：字节）|
|aof_base_size|aof 上次启动和重写的大小（单位：字节）|

#### 自动触发时机

- aof_current_size > auto-aof-rewrite-min-size
- aof_current_size - aof_base_size/aof_base_size > auto-aof-rewrite-percentage

## RDB 和 AOF 的选择

### RDB 和 AOF 比较

|命令|RDB|AOF|
|-|-|-|
|启动优先级|低|高|
|体积|小|大|
|恢复速度|快|慢|
|数据安全性|丢数据|根据策略决定|
|轻重|重|轻|

### RDB 最佳策略

- 关掉
- 集中管理
- 主从，从开

### AOF 最佳策略

- 开（缓存情况下关掉）
- aof 重写集中管理
- everysec

### 最佳策略

- 小分片
- 监控（硬盘，内存，负载，网络）
- 足够内存
- 缓存或存储

## fork 操作

### fork 操作

- 同步操作
- 和内存量相关，内存越大，耗时越长，与机器类型有关
- info:latest_fork_usec

### 优化 fork

- 优先使用物理机或者高效支持 fork 操作的虚拟化技术
- 控制 redis 实例最大可用内存：maxmemory
- 合理配置 Linux 内存分配策略：vm.overcommit_memory=1
- 降低 fork 频率，例如放开 aof 重写机制自动触发时机，不必要的全量复制

## 进程外开销

### 子进程开销和优化

|选项|开销|优化|
|-|-|-|
|CPU|rdb 和 aof 文件生成，属于 CPU 密集型|不做 CPU 绑定，不和 CPU 密集型部署|
|内存|fork 内存开销，copy-on-write|echo never > /sys/kernel/mm/transparent_hugepage/enabled|
|硬盘|aof 和 rdb 文件写入，可以结合 iostat,iotop 分析|不要和高硬盘负载服务部署一起：存储服务，消息队列等；no-appendfsync-on-rewrite=yes, 根据写入量决定磁盘类型；单机多实例持久化文件目录可以分盘|

## AOF 追加阻塞

### 阻塞定位

- redis 日志
- info persistence 命令

## 欢迎扫描下方二维码，[个人博客](https://www.phpst.cn)，持续关注：

![](https://ww1.sinaimg.cn/large/a616b9a4gy1g4xzv954a4j20760763yo.jpg)

互联网工程师（id:phpstcn），我们一起学习，一起进步
