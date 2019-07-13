---
title: python在类中实现swith功能
date: 2019-03-29 14:51:12
tags: [python]
categories: "python"
top: 0
---
### 问题
Python中没有switch的语法，但是很多时候需要多重条件判断，又不想写多个if，那只能手动实现了。
实现代码
```python
class RunMethod:
    def post(self,url=None,data=None,header=None):
        print(url)
    def get(self,url=None,data=None,header=None):
        print("get")

    def main(self,method):
        method = getattr(self, method)
        return method

if __name__ == '__main__':
    client = RunMethod()
    client.main("post")("http://www.baidu.com")
```
其中主要用到getattr这个函数，用于返回一个对象属性值。
```python
getattr(object, name[, default])
```
- object -- 对象。
- name -- 字符串，对象属性。
- default -- 默认返回值，如果不提供该参数，在没有对应属性时，将触发 AttributeError。


### 欢迎扫描下方二维码，持续关注：
![](http://ww1.sinaimg.cn/large/a616b9a4gy1g4xzv954a4j20760763yo.jpg)

互联网工程师（id:phpstcn），我们一起学习，一起进步