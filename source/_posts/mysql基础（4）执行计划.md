---
title: mysql 基础（4）执行计划
top: 1
date: 2019-08-16 11:06:21
tags: ["mysql"]
categories: "mysql"
---

## 配置慢查询日志

``` mysql
set global slow_query_log = [ON|OFF]
set global slow_query_log_file = /sql_log/slowlog.log
set global long_query_time= xx.xxx 秒
set global log_queries_not_using_indexes= [ON|OFF]
```

## 分析慢查询日志

``` mysql
mysqldumpslow [options](logs)
pt-query-digest [options](files)[dsn]
```

## 实时监控慢查询

``` mysql
select id `user` , `host` ,DB,command, `time` ,state,info from information_schema.PROCESSList where time >=60;
```

## 分析执行计划

explain sql

### id 列

* id 表示查询执行顺序
* id 相同时由上到下执行
* id 不同时由大到小执行

### select_type 列

|值|说明|
|:----- |-----|
|SIMPLE |不包含子查询或是 union 操作的查询|
|PRIMARY |查询中如果包含任何子查询，那么最外层的查询则是 PRIMARY|
|SUBQUERY |SELECT 列表中的子查询|
|DEPENDENT SUBQUERY |依赖外部结果的子查询|
|UNION  |UNION 操作的第二个或是之后的查询的值为 union|
|DEPENDENT UNION |当 UNION 作为子查询的时候，第二或者第二个后的查询的 select_type 值|
|UNION RESULT |UNION 产生的结果集|
|DERIVED |出现在 from 子句中的子查询|

### table 列

* 指明从哪个表获取数据
* <union M, N>由 id 列为 M, N 查询 union 产生的结果集
* <derived N>/<subquery N> 由 id 列为 N 的查询产生的结果

### partitions

* 对于分区表，显示查询的分区 id
* 对于非分区表，显示 null

### type

性能由高到低

|值|说明|
|:----- |-----|
|NULL |MySQL 在优化过程中分解语句，执行时甚至不用访问表或索引，例如从一个索引列里选取最小值可以通过单独索引查找完成|
|system |cost 连接类型的一个特例，当查询的表只有一行时使用|
|const |表中有且只有一个匹配的行时使用，如对主键或唯一索引的查询，这是效率最高的联接方式|
|eq_ref |唯一索引或主键查找，对于每个索引键，表中只有一条记录与之匹配|
|ref |非唯一索引查找，返回匹配某个单独值的所有行|
|ref_or_null |类似与 ref 类型查询，但是附加了对 null 值列的查询|
|index_merge |使用了索引合并优化|
|range |索引范围扫描，常见于 between, >, 《这样的查询条件|
|index |全索引扫描，遍历索引树|
|all |全表扫描，效率最差|

### possible_keys

* 查询时可能使用的索引

### key

* 查询时实际使用的索引

### key_len

* 实际使用索引的最大长度

### ref

* 哪些列或产量用于索引查找

### rows

* 根据统计信息预估扫描行数

### filtered

* 返回结果行数占读取行数的百分比

### extra

|值|说明|
|:----- |-----|
|Distinct |优化 distinct 操作，在找到第一匹配的元祖后即停止找同样值的动作|
|Not exists |使用 not exist 优化查询|
|Using filesort |使用文件来排序，通常会出现在 order by 或 groub by 查询|
|Using index |使用覆盖索引进行查询|
|Using temporary|使用临时表进行处理查询，常见于排序，子查询和分组查询|
|Using where|使用 where 条件过滤数据|
|select tables optimized away|直接通过索引获取数据，不用访问表|

## 欢迎扫描下方二维码，[个人博客](https://www.phpst.cn)，持续关注：

![](https://ww1.sinaimg.cn/large/a616b9a4gy1g4xzv954a4j20760763yo.jpg)

互联网工程师（id:phpstcn），我们一起学习，一起进步
