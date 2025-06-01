# 中间件
## 基本使用
### 通过 nest cli 创建 middleware
```bash
nest g mi <middleware-name>
```
### 手动创建
新建 /middleware/index.ts
```ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
@Injectable()
export class Logger implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {}
}
```
导出一个类，继承自 `NestMiddleware` 接口。需要实现一个 `use` 方法，需要三个参数 `req`、`res`、`nest()`（与 express 类似）。
```ts
use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
}
```
`use` 方法中，执行 `next()` 方法会放行，也可以使用 `res.send()` 进行拦截。 

### 在模板中使用中间件

在 user.module.ts 中，将 UserModule 继承 NestModule，需要实现一个 configure 方法，在其中规定需要使用的中间件。
```ts
@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Logger).forRoutes('user');
  }
}
```
`apply()` 方法约定了需要使用的中间件，`forRoutes()` 方法约定了指定路由。

`forRoutes` 也支持传递对象
```ts
consumer.apply(Logger).forRoutes({
  path: 'user',
  method: RequestMethod.GET,
});
```
如果在这里制定了 GET 方法，那么如果客户端使用 POST 方法访问则不会触发中间件拦截。

也可以将 UserController 直接传递进去，这样控制器中约定的所有路由都会经由中间件处理。
```ts
configure(consumer: MiddlewareConsumer) {
  consumer.apply(Logger).forRoutes(UserController);
}
```

## 全局中间件
全局中间件是一个函数，不能使用类

创建一个函数
```ts
function MiddlewareAll(req:Request, res:Response, next:NextFunction) {
  console.log(req.originalUrl, req.method);
  next();
}
```
在 app 对象中调用 use 方法，将该中间件传递过去
```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(MiddlewareAll);
  await app.listen(process.env.PORT ?? 3000);
}
```
制作简单的路由白名单
```ts
function MiddlewareAll(req: Request, res: Response, next: NextFunction) {
  const whitelist = ['/list'];
  if (whitelist.includes(req.originalUrl)) {
    next();
  } else {
    res.send('Access Denied');
  }
}
```

## 第三方中间件

安装 `cors`

```bash
pnpm add cors 

pnpm add @types/cors -D
```

导入 cors
```ts
import * as cors from 'cors'
```

在 app.use() 中使用，以解决跨域问题。
```ts
app.use(cors())
```