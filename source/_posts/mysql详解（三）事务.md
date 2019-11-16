---
title: mysql 详解（三）事务
top: 1
date: 2019-08-12 11:18:32
tags: ["mysql"]
categories: "mysql"
---
### 事务
- 事务是数据库执行操作的最小逻辑单元
- 事务可以由一个或多个 SQL 组成
- 组成事务的 SQL 或全部成功或全部失败

### 特性

|特征|说明|
|----- |-----|
|原子性（A）|一个事务的所有操作，或全部成功或全部失败|
|一致性（C）|事务开始之前和事务结束只会，数据库保持完整性
|隔离性（I）|每个读写事务的对象和其他事务的操作对象相互分离，该事务提交前对其他事务都不可见
|持久性（D）|事务一旦提交，结果就是永久性，如果宕机也能恢复

### 并发问题
#### 脏读
- 一个事务读取了另一个事务未提交的数据

|事务 1|事务 2|
|----- |-----|
|start transation;| |
|select score from course where id=1 /*score=9.2*/| |
| |start transation;|
| |update course set score=10 where id=1|
|select score from course where id=1 /*score=10*/| |
||rollback; |

#### 不可重复读
- 一个事务前后两次读取同一数据不一致

|事务 1|事务 2|
|----- |-----|
|start transation;| |
|select score from course where id=1 /*score=9.2*/| |
| |start transation;|
| |update course set score=10 where id=1|
| |commit|
|select score from course where id=1 /*score=10*/| |
|commit||

#### 幻读
- 一个事务前后两次读取结果集记录数不一致

|事务 1|事务 2|
|----- |-----|
|start transation;| |
|select id,score from course where score>9 and score<10 /*1,9.2 - 2,9.4*/| |
| |start transation;|
| |update course set score=9.5 where id=3|
| |commit|
|select id,score from course where score>9 and score<10/*1,9.2 - 2,9.4 -3,9.5* /| |
|commit||

### INNODB 事务隔离级别
|隔离级别|脏读|不可重复读|幻读|隔离性|并发性|
|----- |-----|-----|-----|-----|-----|
|串行化 |N|N|N|最高|最低|
|可重复读 |N|N|N|||
|已提交读 |N|Y|Y|||
|未提交读 |Y|Y|Y|最低|最高|

### INNODB 锁
- 查询需要对资源加共享锁（S）
- 修改需要对资源加排他锁（X）

| |排他锁|共享锁|
|----- |----- |-----|
|排他锁 |不兼容 |不兼容|
|共享锁 |不兼容 |兼容|

### 事务阻塞
- 由于不同锁的兼容关系，造成一个事务需要等待另一个事务是否其所占用资源
#### 发现阻塞
```mysql
select waiting_pid as '被阻塞线程', waiting_query as '被阻塞 SQL',blocking_pid as '阻塞线程',
blocking_query as '阻塞 SQL',wait_age as '阻塞时间',sql_kill_blocking_query as '建议操作' from 
sys.innodb_lock_waits where (unix_timestamp()-unix_timestamp(wait_started))>30
```
#### 解决阻塞
- 终止占用资源的事务
- 优化占用资源的事务 SQL

### 死锁
- 并行执行的多个事务互相占用了对方需要的资源
#### 发现死锁
```
set global innodb_print_all_deadlocks=on;
```
#### 解决死锁
- 数据库自行回滚占用资源少的事务
- 并发事务按相同顺序占用资源

### 欢迎扫描下方二维码，持续关注：
![](https://ww1.sinaimg.cn/large/a616b9a4gy1g4xzv954a4j20760763yo.jpg)

互联网工程师（id:phpstcn），我们一起学习，一起进步