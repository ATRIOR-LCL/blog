# 拦截器

拦截器具有一系列功能，受到面向切面编程（AOP）的启发，具备一下功能：

- 在函数执行之前/之后绑定**额外的逻辑**
- 转换从函数返回的结果
- 转换从函数抛出的异常
- 扩展基本函数行为
- 根据所选条件完全重写函数（例如缓存目的）

## 响应拦截器

新建 /src/commn/response.ts

```ts
import { NestInterceptor, CallHandler, Injectable } from "@nestjs/common";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { ExecutionContext } from "@nestjs/common";

interface Data<T> {
  data: T;
}

@Injectable()
export class Response<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Data<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          status: 0,
          message: "success",
          success: true,
        };
      })
    );
  }
}
```

- 导出一个使用 `Injectable` 装饰的类，继承自 `NestInterceptor` 接口，实现一个 `intercept` 方法。
- 该 `intercept` 方法需要返回一个异步的 Promise 或者一个 Observable 事务，这个返回值可以由 next 参数的 `next.handle()` 进行返回。
- 通过调用 `next.handle()` 的 `pipe` 方法，可以对数据在管道中进行处理。例如通过 `map` 方法，约定响应数据结构。

在 main.ts 中导入该响应拦截器

```ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import * as cors from "cors";
import { Response } from "./commen/response";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cors());
  app.useStaticAssets(join(__dirname, "images"), {
    prefix: "/images",
  });
  app.useGlobalInterceptors(new Response()); // 使用
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

- 通过 `useGlobalInterceptors` 方法，将导入的响应拦截器对象实例化的对象传入，即可实现全局的响应拦截功能。

## 异常拦截器

新建 /src/commen/filter.ts

```ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";
import { Response, Request } from "express";

@Catch()
export class HttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    response.status(status).json({
      success: false,
      time: new Date(),
      data: exception.getResponse(),
      status,
      path: request.url,
    });
  }
}
```

- 导出一个通过 `Catch` 注入的类，继承自 `ExceptionFilter`, 实现一个 `catch` 方法。
- 该方法接收两个参数 exception 和 host ，exception 用来规定异常类型和信息，通过 host 可以创建异常请求体和响应体信息。
- 通过 `host.switchToHttp()` 方法来创建一个对象，通过该对象创建请求体和响应体对象。
- 通过创建的 response 响应体的 `status` 方法，可以接口的状态码，通过 `json` 方法，约定接口响应的异常数据结构。

在 main.ts 中使用异常拦截器

```ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import * as cors from "cors";
import { Response } from "./commen/response";
import { HttpFilter } from "./commen/filter";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cors());
  app.useStaticAssets(join(__dirname, "images"), {
    prefix: "/images",
  });
  app.useGlobalFilters(new HttpFilter());
  app.useGlobalInterceptors(new Response());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

- 通过 useGlobalFilter 方法使用
