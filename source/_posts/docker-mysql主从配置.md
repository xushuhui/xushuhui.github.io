---
title: docker+mysql主从配置
date: 2019-03-28 16:15:38
tags: [docker, mysql]
top: 0
---
### 1.安装启动docker

```
yum install docker
systemctl start docker
```
### 2.启动docker容器
```bash
git clone https://github.com/xushuhui/docker-server.git
cd docker-server/mysql/compose
docker-compose up -d
```
### 3.修改mysql配置文件
这时已经可以看到容器中有一个主数据库和两个从数据库,在从库的配置文件中写入
```sql
[mysqld]
log-bin=mysql-bin
server-id=2 #不能重复
binlog_format = mixed
replicate-ignore-db= mysql,information_schema,performance_schema #[必须]不需要同步的数据库。
```
重启从库容器
### 4.配置mysql主从
远程连接主库和从库
```sql
主库中执行，创建同步用户
show master status
GRANT REPLICATION SLAVE ON *.* to 'backup'@'%' identified by 'backup';
show grants for 'backup'@'%';

从库中执行
CHANGE MASTER TO MASTER_HOST='主库ip',
MASTER_PORT=主库端口,
MASTER_USER='backup',
MASTER_PASSWORD='backup';

START SLAVE;
show slave status;
```
### 5.测试接口
主库中添加表，查看从库是否同步

### 欢迎扫描下方二维码，持续关注：
![](http://ww1.sinaimg.cn/large/a616b9a4gy1g4xzv954a4j20760763yo.jpg)

互联网工程师（id:phpstcn），我们一起学习，一起进步