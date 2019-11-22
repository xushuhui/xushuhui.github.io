---
title: mysql面试（九）异常处理问题
top: 1
date: 2019-09-19 14:01:43
tags: ["mysql","面试"]
categories: "mysql"
---

### 数据库服务器负载过大

#### 原因

* 服务器磁盘 IO 超负荷
* 存在大量阻塞线程
* 存在大量并发慢查询
* 存在其他占用 CPU 的服务
* 服务器硬件资源原因

#### 解决方案

* 服务器硬件（硬件监控）
* 其他服务占用（ps, top）
* IO 超负荷（iostat -dmx 1, lsof）
* 阻塞线程（show processlist, 阻塞监控）
* 并发线程 （show processlist, 慢查询日志）

### 慢查询造成的磁盘 IO 爆表

* MySQL 输出大量日志
* MySQL 正在进行大批量写
* 慢查询产生大量磁盘临时表

### 主从数据库数据不一致

#### 原因

* 对从服务器进行了写操作
* 使用 sql_slave_skip_counter 或注入空事务的方式修复错误
* 使用了 statement 格式的复制

#### 解决方案

* 设置 read_only=ON
* 设置 super_read_only=ON
* 使用 row 格式的复制
* 使用 pt_table_sync 修复数据

### 主服务器连接不上

Slave_IO_Running： Connecting

* 主从服务器间网络是否畅通
* 是否存在防火墙，过滤了数据库端口
* 复制链路配置的用户名密码是否正确，是否有相应权限

### 主键冲突问题

Slave_SQL_Running： NO

* 跳过故障数据
* 检查主从数据一致性
* 直接删除从库主键冲突数据

### 数据行不存在

* 跳过故障数据
* 使用 pt-table-sync 修复数据

### relay_log 损坏

* 找到已经正确同步的日志
* 使用 reset skave 删除 relay_log
* 在正确同步日志点后重新同步日志

### 欢迎扫描下方二维码，持续关注：

![](https://ww1.sinaimg.cn/large/a616b9a4gy1g4xzv954a4j20760763yo.jpg)

互联网工程师（id:phpstcn），我们一起学习，一起进步
