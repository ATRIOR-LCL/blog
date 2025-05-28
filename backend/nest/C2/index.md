# Nest CLI

## 通过 cli 安装 Nest 项目

```bash
npm i -g @nestjs/cli
```
```bash
nest new [Project Name]
```

## 目录结构

- /src/app.controller.ts 路由配置
- /src/app.service.ts 业务逻辑

## CLI 常见工具
```bash
nest g [生成什么东西] [指定文件夹]
```
### `nest g co demo`
生成控制器

### `nest g mo demo`
生成模块

### `nest g s demo`
生成业务逻辑

### `nest g resource user`
生成全部模板代码

## 版本控制
- 在 main.ts 中使用 app.enableVersioning() 来开启版本控制。
- 传递 type: VersioningType.URI 表明使用 URL 实现版本控制。

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 开启版本控制
  app.enableVersioning({
    type: VersioningType.URI,
  })
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

- 在 user.controller.ts 中传递 version 参数
- 通过访问 `http://localhost:3000/v1/user` 而不是 `http://localhost:3000/user` 得到响应
```ts
@Controller({
  path: 'user',
  version: '1',
})
export class UserController
```