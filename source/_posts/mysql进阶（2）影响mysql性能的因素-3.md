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

- MySQL5.5 之后的版本默认存储引擎
- 使用表空间进行数据存储

```mysql
innodb_file_per_table=ON 独立表空间：tablename.ibd
innodb_file_per_table=OFF 系统表空间：ibdataX
```

#### 如何选择系统表空间和独立表空间

- 系统表空间无非简单收缩文件大小
- 独立表空间通过 optimize table 命令收缩系统文件
- 系统表空间会产生 IO 瓶颈
- 独立表空间可以同时向多个文件刷新数据
- 优先使用独立表空间

#### 存在系统表空间的表转到独立表空间的方法

- 使用 mysqldump 导出所有数据表数据
- 停止 MySQL 服务，修改参数，并删除 Innodb 相关文件
- 重启 MySQL 服务，重建 Innodb 系统表空间
- 重新导入数据

#### innodb 存储引擎特性

- innodb 是一种事务性存储引擎
- 完全支持事务 ACID 特性
- Redo Log 和 Undo Log
- 支持行级锁，最大程度支持并发，行级锁由存储引擎层实现

#### 状态检查

```
show engin innodb status
```

#### 适用场景

- 适合大多数 OLTP 应用

### 锁

- 锁主要作用是管理共享资源的并发访问
- 锁用于实现事务的隔离性

#### 表级锁

#### 行级锁

- 独占锁和共享锁

| |排他锁|共享锁|
|----- |----- |-----|
|排他锁 |不兼容 |不兼容|
|共享锁 |不兼容 |兼容|

### CSV

#### 文件系统存储特点

- 数据以文本方式存储在文件中
- .csv 文件存储表内容
- .csm 文件存储表元数据如表状态和数据量
- .frm 文件存储表结构信息

#### 特点

- 以 CSV 格式进行数据存储
- 所有列必须是不能为 NULL
- 不支持索引，不适合在线处理
- 可以对数据文件直接编辑

#### 适用场景

- 适合做数据交换的中间表

### Archive

#### 文件系统存储特点

- 以 zlib 对表数据进行压缩，磁盘 IO 更少
- 数据存储在 ARZ 为后缀的文件中

#### 特点

- 只支持 insert 和 select 操作
- 只允许在自增 ID 上加索引

#### 适用场景

- 日志和数据采集类应用

### Memory

#### 文件系统存储特点

- 也称 Heap 存储引擎，所以数据保存在内存中

#### 特点

- 支持 hash 索引和 btree 索引
- 所有字段都是固定长度
- 不支持 blog 和 text 字段
- 使用表级锁
- 表最大大小由 max_heap_table_size 参数决定

#### 适用场景

- 用于查找或者映射表，例如邮编和地区对应表
- 用于保存数据分析中产生的中间表
- 用于缓存周期性聚合数据结果表
- 数据易丢失，要求数据可再生

### Federated

#### 特点

- 提供访问远程 MySQL 服务器上表的方法
- 本地不存储数据，数据全部放到远程服务器上
- 本地需要保存表结构和远程服务器连接信息

#### 如何使用

- 默认禁止，启用需要在启动时候增加 federated 参数

```
mysql://user_name[:password]@host_name[:port]/db_name/table_name
```

#### 适用场景

- 偶尔的统计分析和手工查询

### 如何选择正确存储引擎

- 是否需要事务支持
- 备份选择
- 崩溃恢复
- 存储引擎特性
- 不要混合使用存储引擎

## 欢迎扫描下方二维码，[个人博客](https://www.phpst.cn)，持续关注：

![](https://ww1.sinaimg.cn/large/a616b9a4gy1g4xzv954a4j20760763yo.jpg)

互联网工程师（id:phpstcn），我们一起学习，一起进步
