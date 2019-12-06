---
title: mysql 进阶（2）影响 mysql 性能的因素 (2)
top: 1
date: 2016-05-12 15:55:20
tags: ["mysql"]
categories: "mysql"
---

## 服务器系统

- Windows
- Linux

### Centos

#### 内核相关参数（/etc/sysctl.conf）

##### 网络相关

- net.core.somaxconn=65535
- net.core.netdev_max_backlog=65535
- net.ipv4.tcp_max_syn_backlog=65535
- net.ipv4.tcp_fin_timeout=10
- net.ipv4.tcp_tw_reuse=1
- net.ipv4.tcp_tw_recycle=1
- net.core.wmem_default=87380
- net.core.wmem_max=16777216
- net.core.rmem_default=87380
- net.core.rmem_max=16777216
- net.ipv4.tcp_keepalive_time=120
- net.ipv4.tcp_keepalive_intvl=30
- net.ipv4.tcp_keepalive_probes=3

##### 内核相关

- kernel.shmmax=4294967295
**内核参数最重要参数之一，定义单个共享内存段的最大值**
**这个参数应该设置足够大，以便能够在一个共享内存段下容纳整个 Innodb 缓冲池大小**
**建议取值大于物理内存的一半，一般取值 Innodb 缓冲池大小**
- vm.swappiness=0
**这个参数当内存不足对性能产生比较明显的影响**
**除非虚拟内存完全满了，否则不要使用交换区**

#### 资源限制相关参数（/etc/security/limit.conf）

##### 打开文件限制（加到 limit.conf 文件末尾）

```shell
* soft nofile 65535
* hard nofile 65535
```

- 保证可以打开足够多的文件句柄
- 修改后需要重启系统生效

#### 磁盘调度策略（/sys/block/devname/queue/scheduler）
```shell
cat /sys/block/sda/queue/scheduler
noop anticipatory deadline [cfq]
echo deadline > /sys/block/sda/queue/scheduler
```
#### 文件系统对性能影响
- 优先XFS
##### EXT3/4系统挂载参数（/etc/fstab）
```shell
data=writeback|ordered|journal
noatime,nodiratime
```
```shell
/dev/sda1/ext4 noatime,nodiratime,data=writeback 1 1
```

## 欢迎扫描下方二维码，持续关注：

![](https://ww1.sinaimg.cn/large/a616b9a4gy1g4xzv954a4j20760763yo.jpg)

互联网工程师（id:phpstcn），我们一起学习，一起进步
