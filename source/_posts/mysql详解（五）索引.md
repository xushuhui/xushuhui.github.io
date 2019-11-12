---
title: mysql 详解（五）索引
top: 1
date: 2019-08-16 18:01:44
tags: ["mysql"]
categories: "mysql"
---

### InnoDB 支持索引类型

* Btree 索引

 - 以 B+ 树的结构存储索引数据
 - 适用于全值匹配的查询（class_name='mysql', class_name in ('mysql', 'postgresql')）
 - 范围查找（study_cnt between 100 and 300, study_cnt >300）
 - 从索引最左侧列开始匹配查找列

* 自适应 HASH 索引
* 全文索引（elasticseach）
* 空间索引

### 建索引的列

* where 子句中的列
* 包含 order by 、group by 、distinct 中的字段
* 多表 join 的关联列

### 选择复合索引键的顺序
- 区分度最高的列放在联合索引的最左侧
- 使用最频繁的列放在联合索引的最左侧
- 尽量把字段长度小的列放在联合索引的最左侧
### Btree 索引的限制
- 只能从最左侧开始按索引键的顺序使用索引，不能跳过索引键
- not in 和 <>操作无法使用索引
- 索引列上不能使用表达式或函数
### 索引使用误区
- 索引越多越好
- 使用 in 列表查询不会使用到索引
- 查询过滤顺序必须同索引键顺序相同才能使用到索引

### sql 改写原则
- 使用 outer in 代替 not in (5.7 以下)
- 使用 CTE 代替子查询
- 拆分复杂的大 sql 为多个简单的小 sql
- 巧用计算列优化查询

### 欢迎扫描下方二维码，持续关注：
![](https://ww1.sinaimg.cn/large/a616b9a4gy1g4xzv954a4j20760763yo.jpg)

互联网工程师（id:phpstcn），我们一起学习，一起进步