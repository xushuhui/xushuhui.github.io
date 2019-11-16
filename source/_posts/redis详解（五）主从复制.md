---
title: redis详解（五）主从复制
top: 1
date: 2018-03-12 14:51:29
tags: ["redis","NoSQL"]
categories: "redis"
---

### 主从复制定义
- 数据备份
- 扩展读性能，读写分离
- 一个master可以有多个slave
- 一个slave只能有一个master
- 数据流向是单向的，master到slave

### 主从复制配置
#### 实现方式
- slaveof/slaveof no one绑定主节点/取消绑定
- 配置
  slaveof ip port
  slave-read-only yes

### 全量复制和部分复制

### 故障处理

### 开发运维问题


### 欢迎扫描下方二维码，持续关注：
![](https://ww1.sinaimg.cn/large/a616b9a4gy1g4xzv954a4j20760763yo.jpg)

互联网工程师（id:phpstcn），我们一起学习，一起进步