# Chapter 2

## 1. 进程三种基本状态：
- 就绪状态
- 执行状态
- 阻塞状态

## 2. 进程请求的一次 I/O 完成后，将使进程状态从`阻塞状态`变为`就绪状态`。

## 3. 操作系统处于`执行状态`的进程时间片用完后，进程状态变为`就绪状态`。

## 4. 操作系统中，处于`执行状态`的进程提出 I/O 请求之后，进程状态转变为`阻塞状态`。

## 5. 进程三种基本状态中，`就绪状态`使指进程分配到除 CPU 以外的所有必要资源。

## 6. 进程同步机制应遵循的准则：
- 空闲让进
- 忙则等待
- 有限等待
- 让权等待

## 7. 同步机制中，`让权等待`是指当进程不能进入自己的临界区时，应立即释放处理机。

## 8. 进程、文件、线程在系统中存在的唯一标志：`PCB`;`FCB`;`TCB`。

## 9. 在文件系统中，文件属性信息存储在数据结构：`FCB`中。

## 10. 操作系统利用数据结构 `PCB` 描述进程的基本情况和执行过程。

## 11. 系统将被终端进程的 CPU 现场信息保存在该进程的数据结构 `PCB` 中。

## 12. 在操作系统中，实现进程同步的机制：
- 信号量机制
- 管程机制

## 13. 1965年，荷兰学者 Dijkstra 提出的`信号量机制`是一种卓有成效的进程同步机制。