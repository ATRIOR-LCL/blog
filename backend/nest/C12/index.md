# 管道

管道可以做两件事：

1. 转换：将从客户端传入的数据转成后端需要的数据类型
2. 验证：类似于前端的 rules 配置验证规则

## 管道转换

常见的管道转换 API

- ValidationPipe
- ParseIntPipe
- ParseFloatPipe
- ParseBoolPipe
- ParseArrayPipe
- ParseUUIDPipe
- ParseEnumPipe
- DefaultValuePipe

### 使用管道

在 p.controller.ts 中随便找一个方法

```ts
@Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id, 'id');
    return this.pService.findOne(+id);
  }
```

- 管道要传递到装饰器之中才能生效，这样 id 由原来的 url 参数字符串类型就转换为了 number 类型。

## 管道验证 DTO

### 手动添加

创建 login 模块

```bash
nest g res login

cd src/login

nest g pi login
```

这样就会多出了一个 login.pipe.ts 文件

在 login.controller.ts 中导入

```ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { LoginService } from "./login.service";
import { CreateLoginDto } from "./dto/create-login.dto";
import { UpdateLoginDto } from "./dto/update-login.dto";
import { LoginPipe } from "./login/login.pipe";

@Controller("login")
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  create(@Body(LoginPipe) createLoginDto: CreateLoginDto) {
    return this.loginService.create(createLoginDto);
  }
}
```

- 在 Body 中把 LoginPipe 注入进去

在 login.pipe 文件中

```ts
import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class LoginPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}
```

- 类中实现的 transform 方法接收 value 和 metadata 参数
- value 即为请求体信息，metadata 是元信息，包含着 metatype、type、data 等属性的对象（type 为装饰器类型，比如@Body() 装饰器，type 就为 body, 如果@Body('name') 那么 data 就为 'name'）

在 /dto 中对请求体的属性进行校验，使用两个第三方库:

- class-validator
- class-transformer

```ts
import { IsNotEmpty, IsString, Length, IsNumber } from "class-validator";

export class CreateLoginDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20, {
    message: "Name must be between 3 and 20 characters long",
  })
  name: string;
  @IsNumber()
  @IsNotEmpty()
  age: number;
}
// pnpm add --save class-validator class-transformer
```

- 其中 IsString、IsNotEmpty 均可添加描述符 {message: '描述信息'}

要使用此校验需要先在 login.pipe 中使用 class-transformer 中的 plainToInstance 函数。

```ts
import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class LoginPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    console.log(value, metadata);
    if (!metadata.metatype || typeof metadata.metatype !== "function") {
      return value;
    }
    const DTO = plainToInstance(metadata.metatype, value);
    console.log(DTO);
    return value;
  }
}
```

- plainToInstance 函数将接收元信息并且接收 value 作为映射，返回一个 DTO 对象

```bash
CreateLoginDto { name: '', age: 80 }
```

随后通过 validate 函数进行验证，validate 返回一个失败的 Promise ，通过 await 关键字获取错误信息，最终会被保存称一个 errors 数组。

```ts
import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class LoginPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!metadata.metatype || typeof metadata.metatype !== "function") {
      return value;
    }
    const DTO = plainToInstance(metadata.metatype, value);
    console.log(DTO);
    const errors = await validate(DTO);
    console.log(errors);
    return value;
  }
}
```

```bash
CreateLoginDto { name: '', age: 80 }
[
  ValidationError {
    target: CreateLoginDto { name: '', age: 80 },
    value: '',
    property: 'name',
    children: [],
    constraints: {
      isLength: 'Name must be between 3 and 20 characters long',
      isNotEmpty: 'name should not be empty'
    }
  }
]
```

可以通过判断 errors.length 来抛出异常

```ts
import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class LoginPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!metadata.metatype || typeof metadata.metatype !== "function") {
      return value;
    }
    const DTO = plainToInstance(metadata.metatype, value);
    const errors = await validate(DTO);
    console.log(errors);
    if (errors.length) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
```

### 使用 NestJS 内置

在 main.ts 中导入 ValidationPipe

```ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import * as cors from "cors";
import { Response } from "./commen/response";
import { HttpFilter } from "./commen/filter";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cors());
  app.useStaticAssets(join(__dirname, "images"), {
    prefix: "/images",
  });
  app.useGlobalFilters(new HttpFilter());
  app.useGlobalInterceptors(new Response());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

- 使用 app.useGlobalPipes() 方法，将 ValidationPipe 创建的实例化对象传入，就可以了。
- 这样就不需要手写 login.pipe 中的逻辑。