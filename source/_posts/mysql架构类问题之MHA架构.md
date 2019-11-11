---
title: mysql架构类问题之MHA架构
top: 1
date: 2019-09-18 17:15:04
tags: ["mysql"]
categories: "mysql"
---

### MHA 架构
#### 适用的主从复制架构
     主 
    / | \
 从1 从2 从3

#### 故障转移步骤
- 选举具有最新更新的slave
- 尝试从宕机的master保存二进制日志
- 应用差异的中继日志到其他slave
- 应用从master保存的二进制日志
- 提升选举的slave为新的master
- 配置其他slave向新的mater同步

#### 架构需要的资源
|资源| 数量|说明|
|-|-|-|
|主DB|1|用于初始主从复制模式的master服务器|
|从DB|2-N|可以配置2台或多台从服务器|
|IP地址|n+2|N为MySQL服务器数量|
|监控用户|1|用于监控数据库状态的MySQL用户（all privileges）
|复制用户|1|用于配置MySQL复制的MySQL用户（replication slave）|

#### 架构配置步骤
- 配置一主多从复制的集群架构
- 安装centos的YUM扩展包
- 配置集群内各主机的SSH免认证
- 在各节点安装mha_node
- 在管理节点安装mha_manager
- 配置并启动MHA管理进程

#### 架构优点
- 支持GTID的复制方式和基于日志点的复制方式
- 可从多个slave中选举最适合的新master
- 会尝试从旧master中尽可能多的保存未同步日志

#### 架构缺点
- 未必能获取到旧master未同步的日志（主备使用5.7以后的半同步复制）
- 需要自行开发写VIP转移脚本
- 只监控master而没有对slave实现高可用的办法


#### 架构适用场景
- 使用基于GTID的复制方式
- 使用一主多从的复制架构
- 希望更少数据丢失的场景



### 欢迎扫描下方二维码，持续关注：
![](http://ww1.sinaimg.cn/large/a616b9a4gy1g4xzv954a4j20760763yo.jpg)

互联网工程师（id:phpstcn），我们一起学习，一起进步