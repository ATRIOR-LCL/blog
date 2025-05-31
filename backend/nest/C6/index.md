# 模块
## 创建模块
使用 nest/cli 创建两个模块 user 和 list
```bash
nest g res user
nest g res list
```
Nest 会自动在 app.modules 中导入这两个模块
```ts
@Module({
  imports: [UserModule, ListModule], // user list
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```
## 共享模块
如果想在 app.service 中使用 `UserService` 模块，需要将 `UserService` 转变为共享模块
```ts
// user.module.ts
@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // add this key
})
export class UserModule {}
```
然后在 app.service 中导入
```ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Get()
  getHello(): string {
    return this.userService.findAll();
  }
}
```

## 全局模块
在 src 目录下创建 /config/config.module.ts
```ts
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [
    {
      provide: 'Config',
      useValue: { baseUrl: '/api' },
    },
  ],
  exports: [
    {
      provide: 'Config',
      useValue: { baseUrl: '/api' },
    },
  ],
})
export class ConfigModule {}
```
要将 `ConfigModule` 作为全局模块使用，需要使用到 `@Global()` 装饰器，并且同样需要在 `exports` 字段中导出

随后在 app.module 中导入

```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ListModule } from './list/list.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [UserModule, ListModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

这样 `UserModule` 和 `ListModule` 这两个模块就能使用 `ConfigModule` 这个全局模块的方法

在 list.controller 中使用
```ts
constructor(
  private readonly listService: ListService,
  @Inject('Config') private readonly base: any,
) {}
```
```ts
@Get()
findAll() {
  return this.base;
}
```

## 动态模块
动态模块可以向模块中传递参数
```ts
import { Global, Module, DynamicModule } from '@nestjs/common';

interface Options {
  path: string;
}

@Global()
@Module()
export class ConfigModule {
  static forRoot(options: Options): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: 'Config',
          useValue: { baseUrl: '/api' + options.path },
        },
      ],
      exports: [
        {
          provide: 'Config',
          useValue: { baseUrl: '/api' + options.path },
        },
      ],
    };
  }
}
```
- 在 config.module.ts 中为 `ConfigModule` 创建一个静态方法，返回一个 `DynamicModule` 类型的对象
- 该对象的 `module` 关键字与 class 的类型一致
- 在该静态方法中传递一个参数

随后即可在 app.module 中通过刚刚创建的静态方法，为 ConfigModule 传递参数
```ts
@Module({
  imports: [UserModule, ListModule, ConfigModule.forRoot({
    path: '/wujinhao',
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```