---
title: PHP和Go通过jsonrpc通信
top: 1
date: 2019-08-01 16:19:27
tags: [golang,php]
categories: "php"
---
### 说明
PHP和GO通过jsonrpc通信
### 代码
``` go
package main

import (
	"errors"
	"fmt"
	"log"
	"net"
	"net/rpc"
	"net/rpc/jsonrpc"
	"os"
)

// 算数运算结构体
type Arith struct {
}

// 算数运算请求结构体
type ArithRequest struct {
	A int
	B int
}

// 算数运算响应结构体
type ArithResponse struct {
	Pro int // 乘积
	Quo int // 商
	Rem int // 余数
}

// 乘法运算方法
func (this *Arith) Multiply(req ArithRequest, res *ArithResponse) error {
	res.Pro = req.A * req.B
	return nil
}

// 除法运算方法
func (this *Arith) Divide(req ArithRequest, res *ArithResponse) error {
	if req.B == 0 {
		return errors.New("divide by zero")
	}
	res.Quo = req.A / req.B
	res.Rem = req.A % req.B
	return nil
}

func main() {
	rpc.Register(new(Arith)) // 注册rpc服务
	lis, err := net.Listen("tcp", "127.0.0.1:8096")
	if err != nil {
		log.Fatalln("fatal error: ", err)
	}
	fmt.Fprintf(os.Stdout, "%s", "wait connection")
	for {
		conn, err := lis.Accept() // 接收客户端连接请求
		if err != nil {
			continue
		}

		go func(conn net.Conn) { // 并发处理客户端请求
			fmt.Fprintf(os.Stdout, "%s", "\n new client in coming\n")
			jsonrpc.ServeConn(conn)
		}(conn)
	}
}

```
```php
class JsonRPC {

    private $conn;

    function __construct($host, $port) {
        $this->conn = fsockopen($host, $port, $errno, $errstr, 3);
        if (!$this->conn) {
            return false;
        }
    }

    public function Call($method, $params) {
        if (!$this->conn) {
            return false;
        }
        $err = fwrite($this->conn, json_encode(array(
                'method' => $method,
                'params' => array($params),
                'id'     => 0,
            ))."\n");
        if ($err === false) {
            return false;
        }
        stream_set_timeout($this->conn, 0, 3000);
        $line = fgets($this->conn);
        if ($line === false) {
            return NULL;
        }
        return json_decode($line,true);
    }
}

$client = new JsonRPC("127.0.0.1", 8096);
$args = array('A'=>9, 'B'=>2);
$r = $client->Call("Arith.Multiply", $args);
printf("%d * %d = %d\n", $args['A'], $args['B'], $r['result']['Pro']);
$r = $client->Call("Arith.Divide", $args);
printf("%d / %d, Quo is %d, Rem is %d\n", $args['A'], $args['B'], $r['result']['Quo'], $r['result']['Rem']);
```