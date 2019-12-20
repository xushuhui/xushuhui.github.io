---
title: 教程 2 AMDcpu 安装 ubuntu/deepin
date: 2019-04-20 09:45:35
tags: [tool]
top: 0
---

## 1、问题

电脑是 thinkpad e485，cpu 锐龙 2500u，安装 ubuntu 系统黑屏

## 2、安装

开机狂按 F1，进 BIOS，记得在 security 的选项里找到 secure boot，关掉。
![](http://ww1.sinaimg.cn/large/a616b9a4gy1g24hxxj2asj20g40c3t9h.jpg)

选择 u 盘启动，需要按 E 编辑一下（目前 E485（包括 A485）的 BIOS 中 ivrs 还没有配置好），如果没有指定参数就会无法启动
![](http://ww1.sinaimg.cn/large/a616b9a4gy1g24hz7s6t5j20g40c3aa9.jpg)

在 linux 行的末尾加上这三个参数：

```bash
ivrs_ioapic[32]=00:14.0 spec_store_bypass_disable=prctl iommu=soft
```

![](http://ww1.sinaimg.cn/large/a616b9a4gy1g24i6l52vwj20g40c3q36.jpg)

ctrl+x 就可以直接启动了

## 3、开机启动

按 E 编辑输入上面的参数

![](http://ww1.sinaimg.cn/large/a616b9a4gy1g24i95d0e2j20g40c3mxf.jpg)

修改 /etc/default/grub 文件
在 GRUB_CMDLINE_LINUX_DEFAULT="在这里加内容" 里面添加上刚才的三个参数，这样每次开机直接按回车启动就可以了
记得 update-grub 来更新下 grub 的菜单以生效

## 欢迎扫描下方二维码，[个人博客](https://www.phpst.cn)，持续关注：

![](https://ww1.sinaimg.cn/large/a616b9a4gy1g4xzv954a4j20760763yo.jpg)

互联网工程师（id:phpstcn），我们一起学习，一起进步
