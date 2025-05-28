NestJS（简称 Nest）是一个用于构建高效、可扩展的 **Node.js 服务端应用程序**的框架。它采用了 **TypeScript** 作为主要语言，融合了 **面向对象编程（OOP）**、**函数式编程（FP）** 和 **函数反应式编程（FRP）** 的理念。

NestJS 构建在 **Express**（默认）或 **Fastify** 之上，提供更高级别的抽象，使开发者能更专注于业务逻辑，而非底层细节。

---

## 🌟 核心特点

### 1. **基于模块的架构**

Nest 应用由多个模块组成，每个模块代表一个功能域，易于拆分与维护。

```ts
@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```

---

### 2. **内建依赖注入（DI）容器**

通过依赖注入解耦组件，便于测试和扩展。

```ts
@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}
}
```

---

### 3. **装饰器驱动的开发方式**

利用 TypeScript 的装饰器定义控制器、服务、模块等。

```ts
@Controller('users')
export class UsersController {
  @Get()
  findAll(): string {
    return 'This returns all users';
  }
}
```

---

### 4. **支持多种传输层**

支持 HTTP、WebSocket、gRPC、MQ（如 RabbitMQ、Kafka）等通信方式。

---

### 5. **中间件、拦截器、守卫、管道等丰富的生命周期组件**

这些工具提供了高度的灵活性用于认证、验证、日志、缓存等功能。

---

### 6. **高度可测试性**

服务、控制器等天然支持单元测试和端到端测试（e2e）。

---

## ✅ 使用场景

* RESTful API 服务
* GraphQL API 服务
* 微服务架构
* WebSocket 实时通信
* CLI 工具
* 企业级应用程序

---

## 📦 快速开始

```bash
npm i -g @nestjs/cli
nest new my-app
```

项目结构示意：

```
src/
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts
```

---

## 🔗 相关技术

* TypeScript（必须）
* Node.js 平台
* Express/Fastify（底层框架）
* 配合 TypeORM、Prisma、Mongoose 等使用
* 可以与 Swagger、Jest、Passport 等无缝集成