---
title: redis详解（一）特性
top: 1
date: 2018-03-12 14:51:29
tags: ["redis","NoSQL"]
categories: "redis"
---
### redis是什么
- 开源的基于键值的存储服务系统，支持多种数据结构，高性能、功能丰富
### redis特性
#### 速度快（10w OPS）
- 数据存储内存中
- C语言编写
- 单线程模型

#### 持久化
- redis所有数据保存在内存中，对数据更新将异步保存到磁盘（ADB，ROF）

#### 多种数据结构
- strings/blobs/bitmaps
- hash tables
- linked lists
- sets
- sorted sets
- bitmas 位图
- hyperloglog 超小内存唯一值计数
- GEO 地理信息定位

#### 支持多种编程语言
#### 功能丰富
- 发布订阅
- lua脚本
- 事务
- pipeline
#### 使用简单
- 23000行代码
- 不依赖外部库
- 单线程模型
#### 主从复制

#### 高可用、分布式
- redis-sentinel(v2.8)支持高可用
- redis-cluster(v3.0)支持分布式

### redis典型使用场景
- 缓存系统
- 计数器
- 消息队列
- 排行榜
- 社交网络
- 实时系统

### redis安装和启动
#### 安装
```shell
wget http://download.redis.io/redis-stable.tar.gz && tar -xzf redis-stable.tar.gz
mv redis-stable redis && cd redis/ && make && make install
```
#### 目录结构
- redis-server redis服务器
- redis-cli redis命令行客户端
- redis-benchmark redis性能测试工具
- redis-check-aof aof文件修复工具
- redis-check-dump rdb文件检查工具
- redis-sentinel  sentinel服务器（2.8以后）
#### 启动方法
- 最简启动
```shell
redis-server
```
- 配置文件启动
```shell
redis-server configPath
```
- 动态参数启动
```shell
redis-server --port 6380
```
##### 启动方法比较
- 生产环境选择配置启动
- 单机多实例配置文件可以用端口区分

#### 验证
```shell
ps -ef | grep redis
netstat -antpl | grep redis
redis-cli -h ip -p port ping
```
#### 常用配置
- daemonize 是否是守护进程（no|yes）
- port 对外端口号（6379）
- logfile 系统日志
- dir 工作目录 

### 欢迎扫描下方二维码，持续关注：
![](https://ww1.sinaimg.cn/large/a616b9a4gy1g4xzv954a4j20760763yo.jpg)

互联网工程师（id:phpstcn），我们一起学习，一起进步