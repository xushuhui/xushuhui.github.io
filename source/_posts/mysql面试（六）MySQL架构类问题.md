---
title: mysql 面试（六）MySQL 架构类问题
top: 1
date: 2019-09-17 13:28:35
tags: ["mysql","面试"]
categories: "mysql"
---

### MySQL 主从复制实现原理

* 开启二进制日志

* 步骤一：主库 db 的更新事件 (update、insert、delete) 被写到 binlog

* 步骤二：从库发起连接，连接到主库

* 步骤三：此时主库创建一个 binlog dump thread，把 binlog 的内容发送到从库

* 步骤四：从库启动之后，创建一个 I/O 线程，读取主库传过来的 binlog 内容并写入到 relay log

* 步骤五：还会创建一个 SQL 线程，从 relay log 里面读取内容，从 Exec_Master_Log_Pos 位置开始执行读取到的更新事件，将更新内容写入到 slave 的 db

#### 异步复制

* master 修改后写入 binary_log（execute-binlog-commit）
* slave 开启 io 线程，读取 master binlog_dump，写入 relaylog
* slave 的 sql 线程，读取 relaylog，重新执行到从库

#### 半同步复制

* master 修改后写入 binary_log（execute-binlog）
* slave 开启 io 线程，读取 master binlog_dump，写入 relaylog
* slave 发送 ACK 到 master，master commit（阻塞) 提交
* slave 的 sql 线程，读取 relaylog，重新执行到从库

### MySQL 主从复制配置步骤

#### master 服务器操作

1. 开启 binlog（必须) 开启 gtid（可选)
2. 建立同步所用的数据库账号
3. 使用 master_data 参数备份数据库
4. 备份数据传到 slave 服务器

#### slave 服务器操作

1. 开启 binlog（可选) 开启 gtid（可选)
2. 恢复 master 上的备份数据库
3. 使用 change master 配置链路
4. 使用 startslave 启动复制

### 基于日志点的复制

#### 定义

* 传统的主从复制方式
* slave 请求 master 的增量日志依赖于日志偏移量
* 配置链路时需要指定 master_log_file 和 master_log_pos 参数

### 基于 GTID 的复制

#### 定义

* GTID=source_id:transaction_id
* slave 请求 master 的增量日志依赖于其未同步的事务 ID
* 配置复制链路时，slave 可以根据已经同步的事务 ID 继续自动同步

### 两种复制方式比较

|基于日志点的复制|基于 GTID 的复制|
|-|-|
|兼容性好|同老版本的 MySQL 和 MariaDB 不兼容|
|支持 MMM 和 MHA 架构|仅支持 MHA 架构|
|主备切换后很难找到新的同步点|基于事务 ID 复制，很方便找到未完成的同步的事务 ID|
|可以方便地跳过复制错误|只能通过置入空事务的方式跳过错误|

### 两种复制方式选择

|基于日志点的复制|基于 GTID 的复制|
|-|-|
|需要兼容老版本 MySQL 和 MariaDB|其他各种情况|
|需要使用 MMM 架构||

### 主从延迟
#### 原因
- 大事务：数万行的数据更新和对大表的DDL操作
- 网络延迟
- 由master多线程写入，slave单线程恢复引起的延迟
#### 解决方法
- 化大事务为小事务，分批更新数据
- 使用pt-online-schema-change工具进行DDL操作
- 减小单次事务处理的数据量以减少产生的日志文件大小
- 减少master同步的slave数量
- 使用MySQL5.7以后的多线程复制
- 使用MGR复制架构

### 读写负载大
#### 读负载大
- 为原DB增加slave服务器
- 进行读写分离，读分担到slave
- 增加数据库中间层，进行负载均衡
#### 写负载大
- 分库分表

### 欢迎扫描下方二维码，持续关注：

![](https://ww1.sinaimg.cn/large/a616b9a4gy1g4xzv954a4j20760763yo.jpg)

互联网工程师（id:phpstcn），我们一起学习，一起进步
