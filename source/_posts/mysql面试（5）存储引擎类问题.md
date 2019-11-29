---
title: mysql 面试（5）存储引擎类问题
top: 1
date: 2019-09-15 13:28:16
tags: ["mysql","面试"]
categories: "mysql"
---

## MySQL 常用存储引擎

|引擎名称|事务|说明|
|-|-|-|
|MYISAM|N|MySQL5.6 之前的默认引擎，最常用的非事务型存储引擎|
|CSV|N|以 CSV 格式存储的非事务型存储引擎|
|Archive|N|只运行查询和新增数据不允许修改的非事务型存储引擎|
|Memory|N|是一种易失性非事务型存储引擎|
|InnoDB|Y|最常用事务性存储引擎|
|NDB|Y|MySQL 集群使用的内存型事务存储引擎|

## MYISAM

### 特点

* 非事务存储引擎
* 以堆表方式存储
* 使用表级锁
* 支持 BTree 索引，空间索引，全文索引

### 使用场景

* 读操作远远大于写操作
* 不需要使用事务

## CSV

### 特点

* 非事务型存储引擎
* 数据以 CSV 格式存储
* 所有列都不能为 NULL
* 不支持索引

### 使用场景

* 作为数据交换的中间表使用

## Archive

### 特点

* 非事务型存储引擎
* 表数据使用 zlib 压缩
* 只支持 Insert 和 Select
* 只允许在自增 ID 上建立索引

### 使用场景

* 日志和数据采集类应用
* 数据归档存储

## Memory

### 特点

* 非事务型存储引擎
* 数据保存在内存中
* 所有字段长度固定
* 支持 Btree 和 Hash 索引

### 使用场景

* 用于缓存字典映射表
* 缓存周期性分析数据

## InnoDB

### 特点

* 事务型存储引擎
* 数据按主键聚集存储
* 支持行级锁和 MVCC
* 支持 Btree 和自适应 Hash 索引
* 支持全文和空间索引

### 使用场景

* 大多数 OLTP 场景

## NDB

### 特点

* 事务型存储引擎
* 数据保存在内存中
* 支持行级锁
* 支持高可用集群
* 支持 Ttree 索引

### 使用场景

* 需要数据完全同步的高可用场景

## 什么情况下 InnoDB 无法在线修改表

|操作|语法|
|-|-|
|加全文索引|CREATE FULTEXT INDEX name ON table(column)|
|加空间索引|ALTER TABLE geom ADD SPATIAL INDEX(g)|
|删除主键|ALTER TABLE tb_name DROP PRIMARY KEY|
|增加自增列|alert table t add column id int auto_increment not null primary key|
|修改列类型|alter table t change c1 c1 NEW_TYPE|
|修改字符集|alter table t character set = charset_name|

### 在线 DDL 存在的问题

* 有部分语句不支持在线 DDL
* 长时间 DDL 操作会引起严重主从延迟
* 无法对 DDL 操作进行资源限制

### 如何更安全执行 DDL

* pt-online-shema-change [OPTIONS]DSN

## InnoDB 如何实现事务

### 原理

|特征|说明|
|:----- |-----|
|原子性（A）|一个事务的所有操作，或全部成功或全部失败|
|一致性（C）|事务开始之前和事务结束只会，数据库保持完整性
|隔离性（I）|每个读写事务的对象和其他事务的操作对象相互分离，该事务提交前对其他事务都不可见
|持久性（D）|事务一旦提交，结果就是永久性，如果宕机也能恢复

### 实现方式

|特征|说明|
|:----- |-----|
|原子性（A）|回滚日志（Undo log）: 用于记录数据修改前的状态|
|一致性（C）|重作日志（Redo log）: 用于记录数据修改后的状态|
|隔离性（I）|锁：用于资源隔离，分为共享锁和排他锁|
|持久性（D）|重作日志（Redo log）+ 回滚日志（Undo log）

## INNODB 锁

* 查询需要对资源加共享锁（S）
* 修改需要对资源加排他锁（X）

| |排他锁|共享锁|
|----- |----- |-----|
|排他锁 |不兼容 |不兼容|
|共享锁 |不兼容 |兼容|

## 欢迎扫描下方二维码，持续关注：

![](https://ww1.sinaimg.cn/large/a616b9a4gy1g4xzv954a4j20760763yo.jpg)

互联网工程师（id:phpstcn），我们一起学习，一起进步
