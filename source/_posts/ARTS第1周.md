---
title: ARTS 第 1 周
date: 2019-04-17 10:08:33
tags:
top: 0
---

### Algorithm



[两数之和](https://leetcode-cn.com/problems/two-sum/ "两数之和")


给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。


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
