---
title: ARTS第1周
date: 2019-04-17 10:08:33
tags:
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
### Share