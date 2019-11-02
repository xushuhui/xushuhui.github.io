---
title: mysql面试-版本类问题
top: 1
date: 2019-09-02 14:53:46
tags: ["mysql"]
categories: "mysql"
---

### 各个发行版区别及优缺点

||MySQL|Percona MySQL|MariaDB|
|---|--- |---|---|
|服务器特性|开源 |开源|开源|
||支持分区表 |支持分区表|支持分区表|
||InnoDB |XtraDB|XtraDB|
||企业版监控工具，社区版不提供 |Percon Monitor|Monyog|
|高可用特性|基于日志点复制 |基于日志点复制|基于日志点复制|
||基于Gtid复制 |基于Gtid复制|基于Gtid复制，但Gtid与MySQL不兼容|
||MGR |MGR & PXC|Galera Cluster|
||MySQL Router|Proxy SQL|MaxScale|
|安全特性|企业版防火墙 |ProxySQL FireWall|MaxScale FireWall|
||企业版用户审计 |审计日志|审计日志|
||用户密码生命周期 |用户密码生命周期|-|
||sha256_password caching_sha2_password |sha256_password caching_sha2_password |ed25519 sha256_password|
|开发及管理|窗口函数（8.0） |窗口函数（8.0）|窗口函数（10.2）|
||Super read_only |Super read_only|支持基于日志回滚，支持修改日志表中记录|

### MySQL升级

#### 升级前考虑问题

* 升级给业务带来的益处 
  + 是否解决业务某一方面痛点
  + 是否解决运维某一方面痛点
* 升级给业务带来的影响 
  + 对原来业务程序支持是否有影响
  + 对原来业务程序性能是否有影响
* 数据库升级方案制定 
  + 评估受影响业务系统
  + 升级详细步骤
  + 升级后的数据库环境检查
  + 升级后业务检查
* 升级失败回滚方案
  + 升级失败回滚的步骤
  + 回滚后的数据库环境检查
  + 回滚后的业务检查

#### 升级步骤

* 对升级数据库进行备份
* 升级slave服务器版本
* 手动进行主从切换
* 升级master服务器版本
* 升级完成后进行业务检查

### MySQL8.0新特性

* 所有元数据使用InnoDB引擎存储，无frm文件
* 系统表采用InnoDB存储并采用独立表空间
* 支持定义资源管理组（目前仅支持CPU资源）
* 支持不可见索引和降序索引，支持直方图优化
* 支持窗口函数
* 支持在线修改全局参数持久化
* 默认使用caching_sha2_password认证插件
* 新增支持定义角色（role）
* 新增密码历史记录功能，限制重复使用密码
* InnoDB DDL语句支持原子操作
* 支持在线修改UNDO表空间
* 新增管理视图用于监控InnoDB表状态
* 新增innodb_dedicated_server配置 

