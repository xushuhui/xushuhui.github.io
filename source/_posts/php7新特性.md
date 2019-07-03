---
title: php7新特性
date: 2019-04-03 09:03:42
tags: [php]
categories: "php"
top: 0
---
#### 太空船运算符
```
echo 1<=>1; //0
echo 2<=>1; //1
echo 1<=>2; //-1
```
#### 类型声明
```
declare(strict_type=1)//strict_type=1表示开启严格模式
function sumOfInts(int ...$ints):int{
    return array_sum($ints);
}
```
#### null合并操作符
```
$page = isset($_GET['page']) ? $_GET['page'] : 0;
$page = $_GET['page'] ?? 0;
```
#### 常量数组
```
define('ANIMALS',['dog','cat']);
```
#### namespace批量导入
```
use Space\{ClassA,ClassB as B,ClassC}
```
#### intdiv函数
```
intdiv(10,3);
```
#### list方括号
```
$arr = [1,2,3];
list($a,$b,$c) = $arr;

$arr = [1,2,3];
[$a,$b,$c] = $arr;
```