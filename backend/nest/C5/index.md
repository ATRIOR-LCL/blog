# Providers

Providers 是 Nest 的一个基本概念。许多基本的 Nest 类可能被视为 provider - service, repository, factory, helper 等等。 他们都可以通过 constructor 注入依赖关系。 这意味着对象可以彼此创建各种关系，并且“连接”对象实例的功能在很大程度上可以委托给 Nest 运行时系统。 Provider 只是一个用 @Injectable() 装饰器注释的类。

## 基本使用

### 提供

首先在 app.service 中创建一个服务类 `AppService`

```ts
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello wujinhao!";
  }
}
```

### 导入

在 app.modules 中导入 `AppService` 提供给控制器 `AppController`

```ts
@Module({
  imports: [DemoModule, UserModule],
  controllers: [AppController, DemoController],
  providers: [AppService],
})
export class AppModule {}
```

### 使用

在 app.controller 中可以直接使用 `AppService` 服务类中的方法，而不需要手动实例化，这个在依赖注入的过程中已经帮助我们手动实例化

```ts
import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller("get")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("hello")
  getHello(): string {
    return this.appService.getHello();
  }
}
```

## 自定义名称

在 app.modules 中的 providers 字段中的服务类其实是简写，全写是用一个对象的形式

```ts
providers: [{
  provide: "MyService",
  useClass: AppService,
}],
```

然后在 app.modules 中使用 `@Inject('<new name>')` 来重新声明一下自定义的名称

```ts
@Controller("get")
export class AppController {
  constructor(@Inject("MyService") private readonly appService: AppService) {}

  @Get("hello")
  getHello(): string {
    return this.appService.getHello();
  }
}
```

## 自定义注入值

在 app.modules 中添加新的 providers 对象，使用 `useValue` 字段自定义注入值

```ts
{
  provide: 'Test',
  useValue: ['we', 'are', 'hello'],
}
```

在 app.controller 中使用

```ts
@Controller("get")
export class AppController {
  constructor(
    @Inject("MyService") private readonly appService: AppService,
    @Inject("Test") private readonly shop: string[]
  ) {}

  @Get("hello")
  getHello(): string[] {
    return this.shop;
  }
}
```

## 工厂模式

当我们有另一个服务类 AppService2

```ts
@Injectable()
export class AppService2 {
  getHello(): string {
    return "AppService 2!";
  }
}
```

将 AppServic2 导入到 app.modules 然后通过 inject 字段将 AppService2 服务类注入到工厂 useFactory 中，随后即可在 useFactory 中作为参数使用 AppService

```ts
@Module({
  imports: [DemoModule, UserModule],
  controllers: [AppController, DemoController],
  providers: [
    AppService2,
    {
      provide: "Factory",
      inject: [AppService2],
      useFactory: (AppService2: AppService2) => {
        console.log(AppService2.getHello());
        return 123;
      },
    },
  ],
})
export class AppModule {}
```

在 app.controller 中使用

```ts
@Controller("get")
export class AppController {
  constructor(@Inject("Factory") private readonly factory: number) {}

  @Get("hello")
  getHello(): number {
    return this.factory;
  }
}
```
useFactory 也支持异步
```ts
@Module({
  imports: [DemoModule, UserModule],
  controllers: [AppController, DemoController],
  providers: [
    AppService2,
    {
      provide: 'Factory',
      inject: [AppService2],
      useFactory: async (AppService2: AppService2) => {
        return await new Promise((r) => {
          setTimeout(() => {
            r(AppService2.getHello());
          }, 2000);
        });
      },
    },
  ],
})
export class AppModule {}
```