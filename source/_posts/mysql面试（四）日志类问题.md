---
title: mysql面试（四）日志类问题
top: 1
date: 2019-09-14 10:49:21
tags: ["mysql"]
categories: "mysql"
---
### MySQL常用日志类型

|日志名称|作用|
|--|--|
|错误日志（error_log）|记录mysql在启动、运行或停止时候出现的问题|
|常规日志（general_log）|记录所有发向MySQL请求|
|慢查询日志（slow_query_log）|记录符合条件的查询|
|二进制日志（binary_log）|记录全部有效的数据修改日志|
|中继日志（relay_log）|用于主从复制、临时存储从主库同步的二进制日志|

### 错误日志（error_log）

- 分析排除MySQL运行错误
- 记录未经授权的访问
- log_error=$mysql/sql_log/mysql-error.log
- log_error_verbosity=[1,2,3]

|verbosity|作用|
|--|--|
|1|Error messages|
|2|Error and warning messages|
|3|Error ,warning and note messages|

- log_error_services=[日志服务组件;日志服务组件]

|组件名称|作用|
|--|--|
|log_filter_internal|默认日志过滤组件，依赖log_error_verbosity|
|log_sink_internal|默认日志输出组件，依赖log_error|
|log_sink_json|将错误日志输出到json文件|
|log_sink_syseventlog|将错误日志输出到系统日志文件|

### 常规日志（general_log）

- 分析客户端发送到MySQL的实际请求
- general_log=[ON|OFF]
- general_log_file=$mysql/sql_log/general.log
- log_output=[FILE|TABLE|NONE]

### 慢查询日志（slow_query_log）
- 将执行成功并符合条件的查询记录到日志
- 找到需要优化的SQL
- slow_query_log=[ON|OFF]
- slow_query_log_file=$mysql/sql_log/slowlog.log
- long_query_time=xx秒
- log_queries_not_using_indexes=[ON|OFF]
- log_slow_admin_statements=[ON|OFF]
- log_slow_slave_statements=[ON|OFF]

### 二进制日志（binary_log）
- 记录所有对数据库的数据修改
- 基于时间点的备份和恢复
- 主从复制
- log-bin[=base_name]
- binlog_format=[ROW|STATEMENT|MIXED]
- binlog_rows_query_log_events=[ON|OFF]
- log_slave_updates=[ON|OFF]
- sync_binlog=[1|0]
- expire_logs_days=days
- PURGE BINARY LOGS TO 'mysql-bin.010'
- PURGE BINARY LOGS BEFORE '2008-04-02 22:46:24'

### 中继日志（relay_log）
- relay_log=filename
- relay_log_purge=[ON|OFF]

### 欢迎扫描下方二维码，持续关注：
![](http://ww1.sinaimg.cn/large/a616b9a4gy1g4xzv954a4j20760763yo.jpg)

互联网工程师（id:phpstcn），我们一起学习，一起进步