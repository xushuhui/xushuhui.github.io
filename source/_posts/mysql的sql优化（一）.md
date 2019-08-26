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
pt-query-digest [options][files][dsn]
```

### 实时监控慢查询

``` mysql
select id `user` , `host` ,DB,command, `time` ,state,info from information_schema.PROCESSList where time >=60;
```

### 分析执行计划

explain sql

#### id 列

* id表示查询执行顺序
* id相同时由上到下执行
* id不同时由大到小执行

#### select_type 列

|值|说明|
|:----- |-----|
|SIMPLE |不包含子查询或是union操作的查询|
|PRIMARY |查询中如果包含任何子查询，那么最外层的查询则是PRIMARY|
|SUBQUERY |SELECT列表中的子查询|
|DEPENDENT SUBQUERY |依赖外部结果的子查询|
|UNION  |UNION操作的第二个或是之后的查询的值为union|
|DEPENDENT UNION |当UNION作为子查询的时候，第二或者第二个后的查询的select_type值|
|UNION RESULT |UNION产生的结果集|
|DERIVED |出现在from子句中的子查询|

#### table 列

* 指明从哪个表获取数据
* <union M, N>由id列为M, N查询union产生的结果集
* <derived N>/<subquery N> 由id列为N的查询产生的结果

#### partitions

* 对于分区表，显示查询的分区id
* 对于非分区表，显示null

#### type
性能由高到低
|值|说明|
|:----- |-----|
|system |cost连接类型的一个特例，当查询的表只有一行时使用|