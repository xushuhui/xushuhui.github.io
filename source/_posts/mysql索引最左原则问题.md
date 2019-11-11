---
title: mysql 索引最左原则
date: 2019-05-07 07:52:59
tags:
categories: "mysql"
top: 0
---

### 建表

```sql
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(10) DEFAULT NULL,
  `sex` tinyint(1) DEFAULT NULL,
  `age` tinyint(2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Index_user` (`name`,`age`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

```

### 测试 sql

#### 第一种

```sql
mysql> explain  SELECT * FROM `user` where name="tom" \G
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: user
   partitions: NULL
         type: ref
possible_keys: Index_user
          key: Index_user
      key_len: 43
          ref: const
         rows: 1
     filtered: 100.00
        Extra: NULL

```

第二种

```sql
mysql> explain  SELECT * FROM `user` where age=18 and name="tom" \G
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: user
   partitions: NULL
         type: ref
possible_keys: Index_user
          key: Index_user
      key_len: 45
          ref: const,const
         rows: 1
     filtered: 100.00
        Extra: NULL

```

第三种

```sql
mysql> explain  SELECT * FROM `user` where age=18 \G
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: user
   partitions: NULL
         type: ALL
possible_keys: NULL
          key: NULL
      key_len: NULL
          ref: NULL
         rows: 3
     filtered: 33.33
        Extra: Using where
1 row in set, 1 warning (0.00 sec)

```

第四种

```sql
mysql> explain  SELECT * FROM `user` where name="tom" and age=18 \G
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: user
   partitions: NULL
         type: ref
possible_keys: Index_user
          key: Index_user
      key_len: 45
          ref: const,const
         rows: 1
     filtered: 100.00
        Extra: NULL
1 row in set, 1 warning (0.00 sec)

```

### 总结

由此可见，只有 sql 中 where 包含联合索引的首个字段的查询才能命中索引，这个叫索引的最左匹配特性。 联合索引的使用在写 where 条件的顺序无关，mysql 查询分析会进行优化而使用索引。但是减轻查询分析器的压力，最好和索引的从左到右的顺序一致。

b+ 树的数据项是复合的数据结构，比如 (name,age,sex) 的时候，b+ 树是按照从左到右的顺序来建立搜索树的，比如当（张三，20,F) 这样的数据来检索的时候，b+ 树会优先比较 name 来确定下一步的所搜方向，如果 name 相同再依次比较 age 和 sex，最后得到检索的数据；但当 (20,F) 这样的没有 name 的数据来的时候，b+ 树就不知道第一步该查哪个节点，因为建立搜索树的时候 name 就是第一个比较因子，必须要先根据 name 来搜索才能知道下一步去哪里查询。

### 欢迎扫描下方二维码，持续关注：

![](http://ww1.sinaimg.cn/large/a616b9a4gy1g4xzv954a4j20760763yo.jpg)

互联网工程师（id:phpstcn），我们一起学习，一起进步
