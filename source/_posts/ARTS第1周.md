---
title: ARTS第1周
date: 2019-04-17 10:08:33
tags:
top: 0
---
### Algorithm

[1. Two Sum](https://leetcode.com/problems/two-sum/ "twoSum").

Given an array of integers, return indices of the two numbers such that they add up to a specific target.

You may assume that each input would have exactly one solution, and you may not use the same element twice. 
```
function twoSum( $target,$nums) {
    $arr = [];
    foreach($nums as $k=>$v){
        $num = $target-$v;
      if(isset($arr[$num])){
        return [$arr[$num],$k];
      };
      $arr[$v] = $k;
    }
    return;
}
```
### Review
### Tip
[AMDcpu安装ubuntu/deepin](https://www.phpst.cn/2019/04/20/AMDcpu安装ubuntu-deepin/ "AMDcpu安装ubuntu-deepin")
### Share

### 欢迎扫描下方二维码，持续关注：
![](http://ww1.sinaimg.cn/large/a616b9a4gy1g4xzv954a4j20760763yo.jpg)

互联网工程师（id:phpstcn），我们一起学习，一起进步