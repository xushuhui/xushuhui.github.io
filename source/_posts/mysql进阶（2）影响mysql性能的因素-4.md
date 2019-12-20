---
title: mysql 进阶（2）影响 mysql 性能的因素 (4)
top: 1
date: 2016-05-17 15:55:20
tags: ["mysql"]
categories: "mysql"
---

## 数据库服务器参数

### 获取配置信息路径

- 命令行参数

```
mysqld_safe --datadir=/data/sql_data
```

- 配置文件

```
mysqld --help  --verbose | grep -A 1 'Default options'
```

### 配置参数作用域

- 全局参数

```
set global  参数名=参数值
set @@global.参数名:=参数值
```

- 会话参数

```
set session  参数名=参数值
set @@session.参数名:=参数值
```

### 内核相关配置参数

- 确定可以使用的内存上限
- 确定 MySQL 每个连接使用的内存

```
sort_buffer_size
join_buffer_size
read_buffer_size
read_rnd_buffer_size
```

- 确定需要为操作系统保留多少内存
- 如何为缓冲池分配内存
缓冲池内存 = 总内存 -（每个线程需要的内存*连接数）- 系统保留内存

```
Innodb_buffer_pool_size
key_buffer_size
select sum(index_length) from information_schema.tables where engine='myisam'
```

### IO 相关配置参数

#### Innodb

```
Innodb_log_file_size
Innodb_log_files_in_group
事务日志总大小 Innodb_log_files_in_group*Innodb_log_file_size
Innodb_log_buffer_size
```

- Innodb_flush_log_at_trx_commit
0: 每秒进行一次，log 写入 cache, 并 flush log 到磁盘
1:【默认】，每次事务提交，执行 log 写入 cache, 并 flush log 到磁盘
2: 【建议】每次事务提交，执行 log 写入 cache, 每秒执行一次 flush log 到磁盘

- Innodb_flush_method=O_DIRECT
- Innodb_file_per_table=1
- Innodb_doublewrite=1

#### MyISAM

- delay_key_write
OFF: 每次写操作偶刷新键缓冲中的脏块到磁盘
ON: 只对建表时候指定了 delay_key_write 选项的表使用延迟刷新
ALL: 对所有 MyISAM 表都是使用延迟键写入

### 安全相关配置参数

- expire_logs_days
指定自动清理 binlog 天数
- max_allow_packet
控制 MySQL 可以接收包的大小
- skip_name_resolve
禁用 DNS 查找
- sysdate_is_now
确保 sysdate() 返回正确日期
- read_only
禁止非 super 权限用户写权限
- skip-slave_start
禁用 slave 自动恢复
- sql_mode
设置 MySQL 所使用的 SQL 模式

### 其他常用配置参数

- sync_binlog
控制 MySQL 如何向磁盘刷新 binlog
- tmp_table_size 和 max_heap_table_size
控制内存临时表大小
- max_connections
控制允许的最大连接数

### 数据库结构设计和 SQL 优化

- 过分的反范式化为表建立太多列
- 过分的范式化造成太多表关联
- 在 OLTP 环境使用不恰当的分区表
- 使用外键保证数据完整性

## 性能优化顺序

- 数据库结构设计和 SQL 语句
- 数据库存储引擎的选择和参数配置
- 系统选择和优化
- 硬件升级

## 欢迎扫描下方二维码，[个人博客](https://www.phpst.cn)，持续关注：

![](https://ww1.sinaimg.cn/large/a616b9a4gy1g4xzv954a4j20760763yo.jpg)

互联网工程师（id:phpstcn），我们一起学习，一起进步
