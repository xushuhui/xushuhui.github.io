---
title: mysql 面试（8）管理及监控类问题
top: 1
date: 2019-09-18T13:52:54.000Z
tags: ["mysql","面试"]
categories: mysql
---

## 性能类指标

名称    | 说明
----- | ----------------
QPS   | 数据库每秒处理的请求数量
TPS   | 数据库每秒处理的事务数量
并发数   | 数据库实例当前并行处理的会话数量
连接数   | 连接到数据库会话的数量
缓存命中率 | Innodb 缓存命中率

## 功能类指标

名称   | 说明
---- | --------------
可用性  | 数据库是否可正常对外提供服务
阻塞   | 当前是否有阻塞的会话
死锁   | 当前事务是否产生了死锁
慢查询  | 实时慢查询监控
主从延迟 | 数据库主从延迟时间
主从状态 | 数据库主从复制链路是否正常

## QPS

- show global status like 'Com%'
- Sum(Com_XXX)
- show global status like 'Queries'
- QOS=(Queries2-Queries1)/ 时间间隔

## TPS

- show global status where Variable_name in ('com_insert','com_delete','com_update')
- TC≈com_insert+com_delete+com_update
- TPS≈(TC2-TC1)/(time2-time1)

## 数据库并发数

- show global status like 'threads_running'

## 数据库连接数

- show global status like 'threads_connected'
- 报警阈值 threads_connected/max_connection>0.8

## Innodb 缓存命中率

- (Innodb_buffer_pool_read_requests-Innodb_buffer_pool_reads)/Innodb_buffer_pool_read_requests*100%
- Innodb_buffer_pool_read_requests: 从缓冲池读取的次数
- Innodb_buffer_pool_reads: 从物理磁盘读取的次数

## 数据库可用性

- 周期性连接数据库服务器并执行 select @@version;
- Nysqladmin -uxxx -pxxx -hxxx ping

## 阻塞

### < MySQL5.7

``` mysql
SELECT b.trx_mysql_thread_id AS '被阻塞线程',b.trx_query AS '被阻塞 SQL',c.trx_mysql_thread_id AS '阻塞线程',c.trx_query AS '阻塞 SQL',(UNIX_TIMESTAMP()-UNIX_TIMESTAMP(c.trx_started)) AS '阻塞时间' FROM information_schema.innodb_lock_waits a JOIN information_schema.innodb_trx b ON a.requesting_trx_id=b.trx_id JOIN information_schema.innodb_trx c ON a.blocking_trx_id=c.trx_id WHERE (UNIX_TIMESTAMP()-UNIX_TIMESTAMP(c.trx_started))>30
```

### > = MySQL5.7

```
SELECT waiting_pid AS '被阻塞线程',waiting_query AS '被阻塞 SQL',blocking_pid AS '阻塞线程',blocking_query AS '阻塞 SQL',wait_age AS '阻塞时间',sql_kill_blocking_query AS '建议操作' FROM sys.innodb_lock_waits WHERE (UNIX_TIMESTAMP()-UNIX_TIMESTAMP(wait_started))>30
```

## 死锁

- show engine innodb status

- pt-deadlock-logger u=xx,p=xxxx,h=127.0.0.1 --create-dest-table --dest u=xx,p=xxx,h=127.0.0.1,D=crn,t=deadlock

- set global innodb_print_all_deadlocks=on

## 监控慢查询

- 通过慢查询日志监控
- 通过 information_schema.`PROCESSLIST`表实时监控

## 监控主从延时

- show slave status (Seconds_Behind_Master)
- pt-heartbeat --user=xx --password=xxx -h master --create-table --database xxx --update --daemonize --interval=1
- pt-heartbeat --user=xx --password=xxx -h slave --create-table --database crn --monitor --daemonize --log /tmp/slave_lag.log

## 监控主从状态

- show slave status (Slave_IO_Running,Slave_SQL_Running,Last_Errno,Last_Error)

## 欢迎扫描下方二维码，持续关注：

![](https://ww1.sinaimg.cn/large/a616b9a4gy1g4xzv954a4j20760763yo.jpg)

互联网工程师（id:phpstcn），我们一起学习，一起进步
