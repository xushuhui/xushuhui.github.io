---
title: redis详解（三）其他功能
top: 1
date: 2018-03-12 14:51:29
tags: ["redis","NoSQL"]
categories: "redis"
---

### 慢查询
#### 生命周期
1.client发送命令到redis
2.redis排队
3.redis执行命令（慢查询发生阶段）
4.redis返回结果到客户端

#### 两个配置
##### slowlog-max-len
- 先进先出队列
- 固定长度
- 保存在内存中
- config get slowlog-max-len=128
##### slowlog-log-slower-than
- 慢查询阈值（单位：微秒）
- slowlog-log-slower-than=0，记录所有命令
- config get slowlog-log-slower-than=10000

#### 三个命令
- slowlog get [n]:获取慢查询队列
- slowlog len:获取慢查询队列长度
- slowlog reset:清空慢查询队列

#### 运维经验
- slowlog-max-len不用设置过大，默认10ms，通常设置1ms
- slowlog-log-slower-than不要设置过小，通常设置1000
- 理解生命周期
- 定期持久化慢查询

### pipeline
#### 定义
- client批量打包命令发给server
- server处理n次后按顺序返回结果

|命令|N个命令操作|1次pipeline(n个命令)|
|-|-|-|
|时间|n次网络+n次命令|1次网络+n次命令|
|数据量|1条命令|n条命令|
- redis的命令时间是微妙级别
- pipeline每次条数要控制（网络时间）

#### 与原生操作对比
- 非原子命令
#### 使用建议
- 注意每次pipeline携带数据量
- pipeline每次只能作用在一个redis节点
- M操作和pipeline区别

### 发布订阅
#### 角色
- 发布者
- 订阅者
- 频道

#### 模型
发布者发布消息到redis server，server把消息发送到订阅了指定频道的订阅者

#### 命令
|命令|说明|
|-|-|
|publish channel message|发布命令|
|subscribe [channel]|订阅一个或多个频道|
|unsubscribe [channel]|取消订阅一个或多个频道|
|psubscribe [pattern...]|订阅模式|
|punsubscribe [pattern...]|退订指定的模式|
|pubsub channels |列出至少有一个订阅者的频道|
|pubsub numsub[channel...] |列出给定频道的订阅者数量|
|pubsub numpat |列出被订阅模式数量|

#### 发布订阅与消息队列
- 发布订阅模式中，订阅了频道的所有订阅者都能收到消息
- 消息队列模式中，订阅了频道的订阅者中只有一个能收到消息

### Bitmap
#### 定义
- 字符串对应ascii的二进制

#### 命令
|命令|说明|
|-|-|
|setbit key offset value|给位图指定索引设置值|
|getbit key offset |获取位图指定索引值|
|bitcount key [start end] |获取位图指定范围（start到end,单位是字节，如果不指定就是获取全部）位值为1的个数|
|bitop op destkey key [key...] |做多个bitmap的交集、并集、非、异或操作并将结果保存在destkey中|
|bitpos key targetBit[start][end]|计算位图指定范围（start到end,单位是字节，如果不指定就是获取全部）第一个偏移量对应的值等于targetBit的位置|

#### 应用
- 独立用户统计，1亿用户，5千万独立

|数据类型|每个userid占用空间|需要存储用户量|全部内存量|
|-|-|-|-|
|set|32位|5000 0000|32位*5000 0000=200MB|
|bitmap|1位|10000 0000|1位*10000 0000=12.5MB|

- 1亿用户，10万个独立用户

|数据类型|每个userid占用空间|需要存储用户量|全部内存量|
|-|-|-|-|
|set|32位|100 0000|32位*100 0000=4MB|
|bitmap|1位|10000 0000|1位*10000 0000=12.5MB|

#### 注意
- type=string，最大512MB
- 注意setbit偏移量，可能有较大耗时
### HyperLogLog
#### 定义
- 基于HyperLogLog算法：极小空间完成独立数量统计
- 本质还是字符串

#### 命令
|命令|说明|
|-|-|
|pfadd key element [element...]|向hyperloglog添加元素|
|pfcount key [key...]|计算hyperloglog独立总数|
|pfmerge destkey sourekey [sourcekey...]|合并多个hyperloglog|

#### 注意
- 错误率0.81%
- 无法取出单条数据

### GEO
#### 定义
- 地理信息定位，存储经纬度，计算两地距离，范围计算等

#### 命令
|命令|说明|
|-|-|
|geoadd key longitude latitude member [longitude latitude member...]|增加地理位置信息|
|geopos key member[member...]|获取地理位置信息|
|geodist key member1 member2 [unit]|获取两个地理位置的距离，unit：m,km,mi,ft|
|georadius key longitude latitude radius m/km/ft/mi [withcoord][withdist][withhash][COUNT count][asc/desc][store key][storedist key]|获取指定位置范围内的地理位置信息集合|

#### 注意
- 3.2版本后才有该功能
- type geokey=zset
- 删除操作 zrem key member
### 欢迎扫描下方二维码，持续关注：
![](https://ww1.sinaimg.cn/large/a616b9a4gy1g4xzv954a4j20760763yo.jpg)

互联网工程师（id:phpstcn），我们一起学习，一起进步