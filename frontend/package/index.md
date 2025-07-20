`package.json` 是一个用于描述 **Node.js 项目基本信息** 和 **依赖关系** 的 **配置文件**，它是每个 Node.js 项目（包括使用 npm/yarn/pnpm 的 JavaScript 或 TypeScript 项目）的核心文件之一。

---

## 📦 `package.json` 是什么？

### 简单定义：

> `package.json` 是一个 JSON 格式的文件，定义了项目的名称、版本、依赖、脚本命令等，是进行依赖管理和项目构建的基础。

---

## 📑 常见内容字段说明：

```json
{
  "name": "my-project",               // 项目名称
  "version": "1.0.0",                 // 项目版本
  "description": "示例项目",         // 描述信息
  "scripts": {                        // 自定义脚本命令（如 npm start）
    "start": "node index.js",
    "test": "jest"
  },
  "dependencies": {                   // 运行时依赖
    "express": "^4.18.2"
  },
  "devDependencies": {                // 开发时依赖
    "jest": "^29.6.1"
  },
  "keywords": ["node", "example"],    // 关键词
  "author": "xxx",                 // 作者
  "license": "MIT"                    // 开源协议
}
```

---

## 🎯 它的作用：

| 功能      | 说明                                                 |
| ------- | -------------------------------------------------- |
| 📦 管理依赖 | 定义项目所需要的 npm 包（`dependencies` / `devDependencies`） |
| 🚀 启动脚本 | 通过 `scripts` 字段定义启动、构建、测试等命令                       |
| 📄 项目信息 | 包括名称、版本、描述、作者、许可证等信息                               |
| 🔧 配置工具 | 一些工具会读取 `package.json` 来自动配置（如 ESLint、Babel 等）     |

---

## 📁 它在哪里？

通常位于项目根目录，例如：

```
my-project/
├── node_modules/
├── package.json      👈 就是它
└── index.js
```

---

## ✅ 总结一句话：

> `package.json` 是 Node.js 项目的“说明书”和“依赖清单”，它告诉 npm 或其他构建工具如何安装依赖、运行项目，以及该项目是干什么的。
