# 文件上传与静态目录

## 依赖准备
- @nestjs/platform-express （nest 自带）
- multer （需要自己安装并安装类型声明）

## 模块导入与配置

在 upload.module.ts 中导入 `MulterModule` 并通过内置 `register` 方法对模块进行配置。

```ts
import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '../images'),
        filename: (_, file, callback) => {
          const filename = `${new Date().getTime() + extname(file.originalname)}`;
          return callback(null, filename);
        },
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
```
- register 接受一个对象，该对象有一个 storage 参数。
- storage 是一个回调函数 `diskStorage` 该函数同样接收一个对象。
- 该对象有两个参数：`destination` 和 `filename`。destination 规定了文件的存放路径，filename 规定了文件的存储名称。
- extname 函数接收文件的源名称，并获取其文件拓展名，将其与当前时间戳进行拼接，生成新的文件名。

## 端口接收文件请求
```ts
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: any) {
    console.log(file, 'file');
    return 'File uploaded successfully';
  }
}
```
- 文件上传的接口需要用到 `UseInterceptors` 进行依赖注入，`FileInterceptor` 用来指定参数名称。如果是多个文件，则需要使用 `FilesInterceptor`
- `UploadedFile` 作为参数装饰器，获取后端接口的文件对象。

## 静态目录配置
在 main.ts 中，为 NestFactory.create() 添加返回类型为  `NestExpressApplication`

为静态目录约定路径
```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: '/images',
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

prefix 为路由前缀需在文件名之前加上 `/<prefix-name>` 方可访问到对应图片资源。

![](./images/screenshot.png)