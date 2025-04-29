# HTTP / HTTPS 协议

> HTTP（HyperText Transfer Protocol，超文本传输协议）是一种用于在 Web 上传输数据的协议，主要用于客户端（如浏览器）和服务器之间的通信。它是一种**无状态**的**请求-响应**协议，基于 TCP/IP 运行。
> 

## HTTP 的核心特点：

1. 无状态（Stateless）
每次请求都是独立的，服务器不会自动记住之前的请求信息。如果需要保持状态（如用户登录信息），通常依赖**Cookies、Session、JWT**等机制。
2. 基于请求-响应模型
    - 客户端（如浏览器）发送 HTTP 请求（Request）。
    - 服务器接收请求并返回 HTTP 响应（Response）。
3. 明文传输（HTTP）/加密传输（HTTPS）
    - HTTP 默认是明文传输，不安全。
    - HTTPS（HTTP Secure）通过 **TLS/SSL** 加密数据，保障数据安全。

---

## HTTP 请求（Request）组成：

1. **请求行（Request Line）**：包含请求方法、请求的资源路径、HTTP 版本。

```jsx
GET /index.html HTTP/1.1
```

1. **请求头（Headers）**：包含客户端的信息（如浏览器类型、Host、Cookies）。

```makefile
Host: www.example.com
User-Agent: Mozilla/5.0
```

1. **请求体（Body，可选）**：如 POST 请求会携带数据（JSON、表单数据等）。

```json
{"username": "admin", "password": "123456"}
```

---

## HTTP 响应（Response）组成：

1. **状态行（Status Line）**：包含 HTTP 版本、状态码、状态描述。

```makefile
HTTP/1.1 200 OK
```

1. **响应头（Headers）**：如 `Content-Type`、`Set-Cookie`。

```makefile
Content-Type: text/html; charset=UTF-8
```

1. **响应体（Body，可选）**：返回的网页、JSON 数据等。

```json
{"message": "success"}
```

---

## 常见 HTTP 方法：

| 方法 | 作用 |
| --- | --- |
| GET | 获取资源（无请求体） |
| POST | 提交数据（如表单） |
| PUT | 更新资源 |
| DELETE | 删除资源 |
| PATCH | 部分更新 |
| HEAD | 只请求头部信息 |
| OPTIONS | 获取服务器支持的方法 |

---

## 常见 HTTP 状态码：

| 状态码 | 分类 | 说明 |
| --- | --- | --- |

| 1xx | 信息 | 请求已收到，继续处理 |
| --- | --- | --- |

| 2xx | 成功 | 200（OK），201（Created） |
| --- | --- | --- |

| 3xx | 重定向 | 301（永久重定向），302（临时重定向） |
| --- | --- | --- |

| 4xx | 客户端错误 | 400（Bad Request），404（Not Found），401（Unauthorized） |
| --- | --- | --- |

| 5xx | 服务器错误 | 500（Internal Server Error），502（Bad Gateway） |
| --- | --- | --- |

---

## HTTP 1.1 vs. HTTP 2 vs. HTTP 3

| 版本 | 特点 |
| --- | --- |

| HTTP/1.1 | 传统版本，支持**长连接（Keep-Alive）** |
| --- | --- |

| HTTP/2 | 多路复用（一个 TCP 连接支持多个请求），二进制格式，更高效 |
| --- | --- |

| HTTP/3 | 使用 QUIC 代替 TCP，提高传输速度，减少延迟 |
| --- | --- |

---

## HTTP 相关技术：

- **HTTPS**：HTTP + TLS 加密，保障数据安全。
- **Cookie & Session**：用来存储用户状态（如登录信息）。
- **CORS（跨域资源共享）**：解决不同域之间的请求限制问题。
- **RESTful API**：基于 HTTP 设计的 API 规范，广泛用于 Web 开发。