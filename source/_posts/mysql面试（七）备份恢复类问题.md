---
title: mysql面试（七）备份恢复类问题
top: 1
date: 2019-09-18 13:51:22
tags: ["mysql"]
categories: "mysql"
---
### 备份方式
- 逻辑备份（DB备份到文件）
- 物理备份（DB备份到DB）
- 全量备份和增量备份以及差异备份

### 常用备份工具
|名称|特点|
|-|-|
|mysqldump|最常用的逻辑备份工具，支持全量备份和条件备份|
|mysqlpump|多线程逻辑备份工具，mysqldump增强版本|
|xtrabackup|InnoDB在线物理备份工具，支持多线程和增量备份|

### mysqldump

#### 优点
- 备份结果为可读SQL文件，可用于跨版本跨平台恢复数据
- 备份文件尺寸小于物理备份，便于长时间存储
- MySQL发行版自带工具，无需安装第三方软件

#### 缺点
- 只能单线程执行备份恢复任务，备份恢复速度较慢
- 为完成一致性备份需要对备份表加锁，容易造成阻塞
- 会对Innodb Buffer Pool造成污染

### mysqlpump

#### 优点
- 语法同mysqldump高度兼容、学习成本低
- 支持基于库和表的并行备份，可以提高逻辑备份的性能
- 支持使用ZLIB和Lz4算法对备份进行压缩

#### 缺点
- 基于表进行并行备份，对大表性能较差
- 5.7.11之前版本不支持一致性并行备份
- 会对Innodb Buffer Pool造成污染

### xtrabackup
#### 优点
- 支持innodb存储引擎在线热备份，对innodb缓存没有影响
- 支持并行对数据库全量备份和增量备份
- 备份和恢复效率比逻辑备份高

#### 缺点
- 单表恢复比较复杂
- 完成的数据文件拷贝，备份文件比逻辑备份大
- 对跨平台和数据库版本的备份恢复支持度不如逻辑备份

### 备份工具应用
- 逻辑备份+二进制日志
- 使用xtrabackup工具
#### xtrabackup进行增量备份
- 全量备份 innobackupex --user=root --password=pwd /backups
- 增量备份 innobackupex --user=root --password=pwd --incremental /home/db_backup/ --incremental-basedir=/home/db_backup/back_dir

#### xtrabackup进行增量恢复
- innobackupex --apply-log --redo-only 全备目录
- innobackupex --apply-log --redo-only 全备目录 --incremental-dir=第1...N次增量目录
- innobackupex --apply-log 全备目录

### 备份二进制日志
- cp命令进行离线备份
- mysqlbinlog命令在线实时备份
  - mysqlbinlog --raw --read-from-remote-server --stop-never --host 备份ip --port 端口 -u 用户名 -p 密码 启动二进制日志文件名
用户具有 replication slave权限