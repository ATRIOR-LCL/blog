# OJ3 压力测试脚本

github：<https://github.com/ATRIOR-LCL/oj3-pressure-test>

## 项目简介
服务于测试 SDUTOJ3 服务器在迁云之后的抗压能力。

控制端使用 JavaScript 类模拟多个并发的用户进程在比赛时的操作：进入比赛、看题、看榜、交题等操作。为适应 JS 单线程的语言特性，提高并发数量、更好地测试服务器并发能力，将 JS 异步结合 Shell Script 循环开辟多个进程执行脚本，提高并发数量。

检测端使用腾讯云服务器控制台、服务器 htop 等工具，分析服务器性能，并且在控制端通过异常处理捕获异常响应进行综合分析。

开发语言：
- JavaScript
- Shell Script

操作系统：Linux

第三方依赖：
- @sdutacm/onlinejudge3-api-sdk
- axios
- fs
- xlsx

## 前期数据处理
### 生成 bot 用户
1. 使用 OJ3 管理员账号，导出批量导入用户模板
2. 根据导出模板的表结构，在 `/utils/genBotUsers.js` 中，使用 JS 循环生成 bot 用户，并通过 `xlsx` 生成新的 `Excel` 文件（users.xlsx），通过 `fs` 模块将文件写入到本地，同时生成 `users.json` 文件，方便后续继续获取用户信息。

### 创建题目集
> 为了模拟用户在比赛中交题，需要根后端接口的请求体数据结构，在本地存储题目信息

1. 使用 OJ3 管理员账号创建比赛。
2. 收集不同的题目 id、solutions、language 等配置信息，通过 `utils/addSolutions.js` 函数，传递相应的参数，生成 `/configs/solutions.json` 文件，json 文件的具体数据结构参照提交题目的后端请求荷载。

### 用户进程的实现
1. 每个用户进程使用 JS 的自定义类 `UserProcess` 进行模拟。类的构造函数接收 userId、nickName、password、cookie 等信息，创建 user 实例。
2. 类中有 loginCompetition、lookCompetitionProblem、getRankList、submitSolution、getCompetitionSolutions 等方法，均为异步函数。

## 控制端进行压测

### 模拟用户登陆 OJ
1. 首先先在主程序运行 `utils/getCookies.js` 函数，通过之前存储的 `users.json` 中的 userId、nickName、password 等字段，通过调用 OJ3 SDK 中的 `user.getSession()` 方法模拟用户登陆
2. 这一步并未和后续的压力测试逻辑耦合是因为大部分选手都是进入制定场地先登陆 OJ3 ，等待比赛开始时才进行比赛登陆等后续操作，所以这一步和登陆比赛等后续操作的时间间隔是比较长的，所以先获取用户 Cookie 信息，并将用户 Cookie 存储在本地的 `cookie.json` 文件中，后续用户的操作可以直接把这个文件中的 json 字符串变成 JS 对象导出，也省去了文件 IO 的时间。并且 Cookie 的持续范围足以进行一段长时间的压力测试，所以不需要每次压力测试脚本启动时都获取 Cookie。
3. 在每次获取 Session 的时候会先判断用户是否在 Session 有效期内登陆，如果满足这种情况，则不会进行登陆，防止过多的生成 Session 造成信息泄露。

### 控制参数
- totalBatch：并发批次
- batchTime：并发批次间隔时间（ms）
- totalUserCount：每批并发用户总数
- successCount：成功执行请求的次数
- failCount：失败请求次数

### 主程序入口
1. 主程序入口是一个 `main()` 函数，这是一个异步函数，内部程序的整体是一个 for 循环，循环中是两个串行的异步函数 `singleConcurrency()`、`sleep()`。`singleConcurrency()`是执行单次并发的函数，`sleep()`是一个自定义的 sleep 函数，用来控制每次并发的间隔时间，它返回了一个封装 `setTimeout` 的 `Promise` 对象，通过 `await` 来等待定时器倒计时，即可实现每批并发的时间间隔。
2. 当 main 函数的所有任务执行完成后，通过 `.then()` 方法，对刚刚在内存中记录的数据进行打印，最终通过 `fs` 模块将在内存中记录的错误信息处理成 json 格式的文件保存到本地，便于分析。

### 单次并发逻辑
1. 单次并发通过 `singleConcurrency` 函数实现，通过 for 循环，边界为 totalUserCount ,遍历之前获取的 cookies.json 用户信息数组，添加到 maxConcurrentArray 数组中。随后通过 processUsers 函数，来执行用户操作。这里并没有把用户信息数组直接传递到 processUsers 函数中，如果这样来看，也就没必要编写singleConcurrency 函数了：因为这次压力测试只创建了 500 个机器人账号，如果单批次用户总数还要更高，比如 700 个的时候，这 500 个用户就不够用了，所以通过 `maxConcurrentArray.push(users[i % users.length]);` 可以重复添加现有的用户，达到高并发用户数需求。
2. `processUsers()` 函数是真正进行用户并发操作的函数。这个函数接收一个用户信息列表。通过对用户信息列表进行便利，将关键的 userId, nickName, password, cookie 等参数在 `.map()` 方法中传递给 `UserProcess` 类的构造函数，生成实例化对象，最终形成一个存储用户进程对象的数组。
3. 通过 `Promise.all()` 方法，传递用户信息列表，通过 `.map()` 方法，将用户信息列表变成 `Promise` 对象，通过 `Promise.all()` 并发出去。
4. 每个用户进程执行登陆比赛、看题、看榜、交题等一系列串行操作，在每个操作之间加上 sleep 函数，sleep 的时间通过随机数生成，为了更好的模拟真实比赛场景。

### 信息处理
1. 通过在用户进程的异步函数中加入异常处理，将是否发生异常的标记放在返回体的 success 字段中，在测试的主程序通过判断 success 字段是否为 true 即可判断本次请求是否成功，并且记录 err.message、err.data 等信息，存放在对象数组里，最终通过 fs 模块将错误信息持久化存储。
2. 对于响应时间的记录，在每个操作最开始时获取当前时间 Date.now() ，在将要返回时记录当前时间，将一开始记录的时间与当前时间做差，则能得到当前请求的响应时间。在 main 函数执行完毕时，对响应时间数组中的元素求平均值得到平均响应时间；将数组从小到大排序，取数组下表第 99%、95%、90%、50% 的元素，得到 p99、p95、p90、p50 等记录。