---
title: mysql 架构类问题之 MGR 架构
top: 1
date: 2019-09-22 17:15:04
tags: ["mysql"]
categories: "mysql"
---
### MGR 复制
#### 定义
- MGR（MySQL Group Repliacation）
- 官方退出的一种基于 paxos 协议的复制
- 是一种不同于异步复制的多 master 复制集群

#### 两种模式
##### 单主模式
     app 
    / | \
 主 1 主 2 主 3
（读写)（读）（读）
- group_replication_single_primary_mode=ON

##### 多主模式
     app 
    / | \
 主 1 主 2 主 3
（读写)（读写）（读写）
- group_replication_single_primary_mode=OFF

#### 架构需要的资源
|集群大小| 投票数|允许宕机数量|
|-|-|-|
|3|2|1|
|4|3|1|
|5|3|2|
|6|4|2|
|7|4|3|
|8|5|3|
|9|5|4|

#### 架构配置步骤
- 安装 group_replication 插件
- 在第一个实例上建立复制用户
- 配置第一个组实例
- 把其他实例加到组

#### 架构优点
- group replication 组内成员间基本无延迟
- 可以支持多写操作，读写服务高可用
- 数据强一致，可以保证不丢失事务

#### 架构缺点
- 只支持 InnoDB 存储引擎的表，并且每个表必须有一个主键
- 单主模式下很难确认下一个主键
- 只能用在 GTID 模式的复制形式下，且日志格式必须是 row

#### 架构适用场景
- 对主从延迟十分敏感的应用场景
- 希望可以对读写提供高可用的场景
- 希望可以保证数据强一致的场景

### 欢迎扫描下方二维码，持续关注：
![](https://ww1.sinaimg.cn/large/a616b9a4gy1g4xzv954a4j20760763yo.jpg)

互联网工程师（id:phpstcn），我们一起学习，一起进步