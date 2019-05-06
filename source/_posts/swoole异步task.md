---
title: swoole异步task
date: 2019-03-29 14:41:35
tags: [swoole]
---
### 记录
今天做了项目异常监控，本来是用nodejs调用企业微信sdk,后来发现发送http请求到腾讯接口总是报错，就换成用swoole投递异步任务处理项目异常监控，记录一下代码。

服务端
```

class Server
{
    private $server;
    public function __construct()
    {
        $this->server = new \swoole_server("0.0.0.0", 9501);
        $this->server->set([
            'worker_num'      => 2,
            'daemonize'       => true,
            'task_worker_num' => 2  # task 进程数
        ]);
        $this->server->on('Start', [$this, 'onStart']);
        $this->server->on('Connect', [$this, 'onConnect']);
        $this->server->on('Receive', [$this, 'onReceive']);
        $this->server->on('Task', [$this, 'onTask']);
        $this->server->on('Finish', [$this, 'onFinish']);
        $this->server->on('Close', [$this, 'onClose']);
        $this->server->start();
    }
    // 主进程启动时回调函数
    public function onStart(\swoole_server $server)
    {
        echo "开始\n";
    }
    // 建立连接时回调函数
    public function onConnect(\swoole_server $server, $fd, $from_id)
    {
        echo "连接上了\n";
    }

    public function onReceive(\swoole_server $server, $fd, $from_id, $data)
    {

        //echo "message: {$data} form Client: {$fd} \n";
        // 投递异步任务
        $task_id = $server->task($data);
        // echo "Dispath AsyncTask: id={$task_id}\n";
        // 将受到的客户端消息再返回给客户端
        $server->send($fd, "Message form Server: {$data}, task_id: {$task_id}");
    }


    // 异步任务处理函数
    public function onTask(\swoole_server $server, $task_id, $from_id, $data)
    {
        echo " \n {$task_id}, start task \n";
        //$data = json_decode($data,true);
        sleep(5);
        echo " \n {$task_id}, end task  \n";
        $server->finish('t');
    }

    public function onFinish(\swoole_server $server, $task_id, $data)
    {
        l("asyc task finish$data",'asycTask');
        echo "finish";
    }

    // 关闭连时回调函数
    public function onClose(\swoole_server $server, $fd, $from_id)
    {
        echo "close \n";
    }
}
$server = new Server();

```
客户端
```
class Client
{

    private $client;

    function __construct()
    {
        $this->client = new \swoole_client(SWOOLE_SOCK_TCP);

    }

    public function send($data)
    {
        if (!$this->client->connect('127.0.0.1', 9501)) {
            die('connect failed.');
        }
        return $this->client->send(json_encode($data));
    }
}
```

### 欢迎扫描下方二维码，持续关注：

![](https://user-gold-cdn.xitu.io/2019/3/17/1698b447d75fb9bb?w=258&h=258&f=jpeg&s=28010)
互联网工程师（id:phpstcn），我们一起学习，一起进步