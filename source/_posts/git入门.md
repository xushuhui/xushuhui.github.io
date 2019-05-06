---
title: git入门
date: 2019-04-20 10:25:48
tags:
---
### 安装
- Windows
  
  [下载安装地址](https://git-scm.com/downloads)

- Linux
``` shell
yum install git / apt-get install git
```
安装后执行，正常显示则安装正常
```
git --version
```
### 使用
#### 生成ssh
```
git config --global user.name "xxx"
git config --global user.email "xx@xx.com"
ssh-keygen -t rsa -C "xxx@xxxxx.com" 
```
"xxx@xxxxx.com" 是git的账号,完成三次回车，即可生成 ssh key。
```
cat ~/.ssh/id_rsa.pub
```
把ssh key绑定到git平台,绑定后输入命令验证
```
ssh -T git@github.com
```
#### 关联git仓库
- 在工作目录中初始化新仓库
  ```
  git init

  ```
  绑定远程仓库
  ```
  git remote add origin git@github.com:xushuhui/lin-cms-lumen.git
  git pull origin master
  ```
  

- 从现有仓库克隆
  ```
  git clone git@github.com:xushuhui/lin-cms-lumen.git
  ```

#### 提交本地文件到远程仓库
  ```
  git add .
  git commit -m 'initial project version'
  git push origin master
  ```