---
title: golang封装日志
top: 1
date: 2019-07-03 17:54:20
tags: ["golang"]
---
### 问题
golang自带的日志log无法满足框架层的日志记录需求，需要单独实现几项功能
- 按天记录日志
- 日志按不同级别分开
- 日志放到统一的文件夹

### 解决方案

```go
var (
	Info    *log.Logger
	Warning *log.Logger
	Error   *log.Logger
	Debug   *log.Logger
)

func init() {
	Info = log.New(newLogFile("info"), "\nInfo:\n", log.Ldate|log.Ltime|log.Llongfile)
	Debug = log.New(newLogFile("debug"), "\nDebug:\n", log.Ldate|log.Ltime|log.Llongfile)
	Warning = log.New(newLogFile("warning"), "\nWarning:\n", log.Ldate|log.Ltime|log.Llongfile)
	Error = log.New(newLogFile("error"), "\nError:\n", log.Ldate|log.Ltime|log.Llongfile)
}
func todayFileName(level string) string {
	today := time.Now().Format("2006-01-02")
	return "./logs/" + level + today + ".log"
}
func newLogFile(level string) *os.File {
	filename := todayFileName(level)
	f, err := os.OpenFile(filename, os.O_CREATE|os.O_RDONLY|os.O_APPEND, 0777)
	if err != nil {
		log.Fatalln("打开日志文件失败：", err)
	}
	return f
}
```