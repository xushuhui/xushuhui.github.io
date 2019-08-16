---
title: mysql的sql优化（一）
top: 1
date: 2019-08-16 11:06:21
tags: ["mysql"]
categories: "mysql"
---

### 配置慢查询日志

``` mysql
set global slow_query_log = [ON|OFF]
set global slow_query_log_file = /sql_log/slowlog.log
set global long_query_time= xx.xxx秒
set global log_queries_not_using_indexes= [ON|OFF]
```

### 分析慢查询日志

``` mysql
mysqldumpslow [options][logs]
pt-query-digest[options][files][dsn]
```

### 实时监控慢查询

``` mysql
select id `user` , `host` ,DB,command, `time` ,state,info from information_schema.PROCESSList where time >=60;
```

### 分析执行计划

explain sql
