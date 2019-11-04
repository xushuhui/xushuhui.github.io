---
title: mysql面试（三）服务器配置类问题
top: 1
date: 2019-09-12 16:39:30
tags: ["mysql"]
categories: "mysql"
---
### SQL_MODE
- 配置MySQL处理SQL方式
- set [session/global/persisi] sql_model='xxxx'
- [mysqld] sql_model=xxx

|SQL_MODE|说明|
|---|---|
|ONLY_FULL_GROUP_BY|对于GROUP BY聚合操作，如果出现在SELECT中的列、HAVING或者ORDER BY子句的非聚合列，没有在GROUP BY中出现，那么这个SQL语法检查报错|
|ANSI_QUOTES|禁止使用双引号来引用字符串|
|REAL_AS_FLOAT|Real作为float的同义词|
|PIPES_AS_CONCAT|把'||'视为字符串的连接操作符而不是或运算符|
|STRICT_TRANS_TABLES/STRICT_ALL_TABLES|在事务存储引擎/所有存储引擎上启用严格模式，SQL语法检查报错|
|ERROR_FOR_DIVISION_BY_ZERO|不允许0作为除数|
|NO_AUTO_CREATE_USER|在用户不存在时不允许grant语句自动建立用户|
|NO_ZERO_IN_DATE/NO_ZERO_DATE|日期数据内/日期数据不能含0|
|NO_ENGINE_SUBSTITUTION|当指定存储引擎不可用时报错|

### 使用set命令配置动态参数
- set[session|@@session.]system_var_name=expr
- set[global|@@global.]system_var_name=expr
- set[persist|@@persist.]system_var_name=expr

### 使用pt-config-diff工具比较配置文件
- pt-config-diff u=root,p=,h=localhost /etc/my.cnf

### 常用性能参数
||参数|说明|
|--|---|--|
|服务器配置参数|max_connections|设置MySQL允许访问的最大连接数量|
||interactive_timeout|设置交互连接的超时时间|
||wait_timeout|设置非交互连接的超时时间|
||max_allowed_packet|MySQL可以接收的数据包大小|
||sync_binlog|每写多少次缓冲会向磁盘同步一次binlog|
||sort_buffer_size|设置每个会话使用的排序缓存区的大小|
||join_buffer_size|设置每个会话使用的连接缓冲的大小|
||read_buffer_size|当对一个MYISAM进行表扫描时锁分配的读缓存池大小|
||read_rnd_buffer_size|设置控制索引缓冲区大小|
||read_rnd_buffer_size|设置每个会话用于缓存未提交事务缓存大小 |
|存储引擎参数|innodb_flush_log_at_trx_commit|0：每秒一次刷新日志到磁盘，1：每次事务提交都会刷新事务日志到磁盘，2：每次事务提交写入系统缓存，每秒向磁盘刷新一次 |
||innodb_buffer_pool_size|设置innodb缓冲池大小，应为系统可用内存的75%|
||innodb_buffer_pool_instances|Innodb缓冲池的实例个数，每个实例大小为总缓冲池大小/实例个数|
||innodb_file_per_table|设置每个表独立使用一个表空间文件|