---
title: mysql面试（六）MySQL架构类问题
top: 1
date: 2019-09-17 13:28:35
tags: ["mysql"]
categories: "mysql"
---

### MySQL主从复制实现原理

* 开启二进制日志

* 步骤一：主库db的更新事件(update、insert、delete)被写到binlog

* 步骤二：从库发起连接，连接到主库

* 步骤三：此时主库创建一个binlog dump thread，把binlog的内容发送到从库

* 步骤四：从库启动之后，创建一个I/O线程，读取主库传过来的binlog内容并写入到relay log

* 步骤五：还会创建一个SQL线程，从relay log里面读取内容，从Exec_Master_Log_Pos位置开始执行读取到的更新事件，将更新内容写入到slave的db

#### 异步复制

* master修改后写入binary_log（execute-binlog-commit）
* slave开启io线程，读取master binlog_dump，写入relaylog
* slave的sql线程，读取relaylog，重新执行到从库

#### 半同步复制

* master修改后写入binary_log（execute-binlog）
* slave开启io线程，读取master binlog_dump，写入relaylog
* slave发送ACK到master，master commit(阻塞) 提交
* slave的sql线程，读取relaylog，重新执行到从库

### MySQL主从复制配置步骤

#### master服务器操作

1. 开启binlog(必须)开启gtid(可选)
2. 建立同步所用的数据库账号
3. 使用master_data参数备份数据库
4. 备份数据传到slave服务器

#### slave服务器操作

1. 开启binlog(可选)开启gtid(可选)
2. 恢复master上的备份数据库
3. 使用change master配置链路
4. 使用startslave启动复制

### 基于日志点的复制

* 传统的主从复制方式

### 欢迎扫描下方二维码，持续关注：

![](http://ww1.sinaimg.cn/large/a616b9a4gy1g4xzv954a4j20760763yo.jpg)

互联网工程师（id:phpstcn），我们一起学习，一起进步

