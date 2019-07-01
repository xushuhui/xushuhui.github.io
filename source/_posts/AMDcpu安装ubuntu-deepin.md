---
title: AMDcpu安装ubuntu/deepin
date: 2019-04-20 09:45:35
tags: [tool]
---
### 1、问题
电脑是thinkpad e485，cpu 锐龙2500u，安装ubuntu系统黑屏
### 2、安装
开机狂按F1，进BIOS，记得在security的选项里找到secure boot，关掉。
![](http://ww1.sinaimg.cn/large/a616b9a4gy1g24hxxj2asj20g40c3t9h.jpg)

选择u盘启动，需要按E编辑一下（目前E485（包括A485）的BIOS中ivrs还没有配置好），如果没有指定参数就会无法启动
![](http://ww1.sinaimg.cn/large/a616b9a4gy1g24hz7s6t5j20g40c3aa9.jpg)

在linux行的末尾加上这三个参数：
```bash
ivrs_ioapic[32]=00:14.0 spec_store_bypass_disable=prctl iommu=soft
```
![](http://ww1.sinaimg.cn/large/a616b9a4gy1g24i6l52vwj20g40c3q36.jpg)

ctrl+x就可以直接启动了
### 3、开机启动
按E编辑输入上面的参数

![](http://ww1.sinaimg.cn/large/a616b9a4gy1g24i95d0e2j20g40c3mxf.jpg)

修改 /etc/default/grub文件
在GRUB_CMDLINE_LINUX_DEFAULT="在这里加内容" 里面添加上刚才的三个参数，这样每次开机直接按回车启动就可以了
记得update-grub来更新下grub的菜单以生效