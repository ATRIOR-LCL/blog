# Controller

控制器，来匹配路由
> 采用 ReftFull APi
## Controller
接收一个字符串，来匹配路由
```ts
@Controller('user')
export class UserController
```
这个意思就是匹配 `http://localhost:3000/user`

Restfull API 使用请求方法来区分 url

例如在 UserController 中创建 Get 请求方法
```ts
@Get()
findAll(@Query() query: any) {
  console.log(query);
  return {
    code: 200,
    message: query.name,
  };
}
```

## @Request()
@Request() 装饰器用来获取所有的请求信息
```ts
@Get()
findAll(@Request() req: any) {
  console.log(req.query);
  return {
    code: 200,
    message: req.query.name,
  };
}
```

## @Query() 
@Query 装饰器用来获取请求参数，等效于 @Query() == @Request().query
```ts
@Get()
findAll(@Query() query: any) {
  console.log(query);
  return {
    code: 200,
    message: query.name,
  };
}
```
如果只想获取请求参数中的某个值，可以给装饰器工厂传递参数，参数为参数名称的字符串，例如获取 query 中的 name ：
```ts
@Get()
findAll(@Query('name') name: any) {
  console.log(name);
  return {
    code: 200,
    message: name,
  };
}
```

## @Body()
@Body 装饰器用来获取请求体信息，等效于 @Query() == @Request().body
```ts
@Post()
create(@Body('age') age: number) {
  console.log(age);
  return {
    code: 200,
    message: age,
  };
}
```

## @Param()
@Param 装饰器用来获取 url 参数，等效于 @Query() == @Request().param, 一般匹配动态路由参数
```ts
@Get(":id")
// http:localhost:3000/user/1 (REST 风格的路由参数)
findId(@Param("id") id:any) {
  console.log(id); // 1
  return {
    code: 200,
    message: id
  }
}
```

## @Headers()
@Headers 装饰器用来获取请求头信息

```ts
@Get(":id")
findId(@Param("id") id:any, @Headers() headers) {
  console.log(id);
  console.log(headers);
  return {
    code: 200,
    message: id
  }
}
```

## HttpCode()
@HttpCode 装饰器用来设置接口的状态码
```ts
@Get(":id")
@HttpCode(500)
findId(@Param("id") id:any, @Headers() headers) {
  console.log(id);
  console.log(headers);
  return {
    code: 200,
    message: id
  }
}
```

## @Redirect()
路由重定向