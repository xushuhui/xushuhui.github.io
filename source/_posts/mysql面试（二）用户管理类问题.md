---
title: mysql面试（二）用户管理类问题
top: 1
date: 2019-09-10 16:04:47
tags: ["mysql"]
categories: "mysql"
---
### 如何定义MySQL数据库账号
- 用户名@可访问控制列表
  - % 可以从所有外部主机访问
  - 192.168.1.%可以从192.168.1网段访问
  - localhost 从服务器本地访问
- 使用CREATE USER 建立用户
### MySQL常用用户权限

||语句|说明|
|----|---- |-----|
|Admin|Create User|建立新用户
||Grant option|为其他用户授权
||Super|管理服务器
|DDL|Create|新建数据库
||Alter|修改表结构
||Drop|删除数据库和表
||Index|建立和删除索引
|DML|Select|查询表数据
||Insert|插入表数据
||Update|更新表数据
||Delete|删除表数据
||Execute|执行存储过程

### 为用户授权
- 遵循最小权限原则
- 使用grant命令授权，revoke收回权限
```
grant select,insert,update on db.tb to user@ip
revoke delete on db.tb from user@ip
```
### 数据库用户管理流程规范
- 最小权限原则
- 密码强度策略
- 密码过期原则
- 限制历史密码重用原则

### 导出用户建立和授权语句
```
pt-show-grants u=root,p=123456,h=localhost
```

### 欢迎扫描下方二维码，持续关注：
![](http://ww1.sinaimg.cn/large/a616b9a4gy1g4xzv954a4j20760763yo.jpg)

互联网工程师（id:phpstcn），我们一起学习，一起进步