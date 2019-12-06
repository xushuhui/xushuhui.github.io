---
title: mysql 进阶（2）影响 mysql 性能的因素 (3)
top: 1
date: 2016-05-15 15:55:20
tags: ["mysql"]
categories: "mysql"
---

## MySQL 体系结构

![image-20191206143225422](https://tva1.sinaimg.cn/large/a616b9a4gy1g9n00it1fej20fa095tb5.jpg)

## 数据库存储引擎

### myisam

- mysql5.5 之前版本默认存储引擎
- 系统表，临时表
- 表由 MYD 和 MYI 组成

#### 特性

- 并发性与锁级别（表锁）
- 表损坏修复（check/repair table tablename）
- 支持全文索引
- 支持数据压缩 （myisampack）

#### 限制

- MySQL 版本<5.0 默认表大小为 4G，存储大表修改 MAX_ROWS 和 AVG_ROW_LENGTH
- MySQL 版本》5.0 默认表大小 256TB

#### 适用场景

- 非事务型应用
- 只读类应用
- 空间类应用

### innodb

## 数据库参数配置

## 数据库结构设计和 SQL 语句

```


## 欢迎扫描下方二维码，持续关注：

![](https://ww1.sinaimg.cn/large/a616b9a4gy1g4xzv954a4j20760763yo.jpg)

互联网工程师（id:phpstcn），我们一起学习，一起进步

```
