# 下载文件和文件流

## 使用 download 直接下载

```ts
  @Get('export')
  downLoad(@Res() res:Response) {
    const url = join(__dirname, "../images/1748939613947.jpg");
    res.download(url)
  }
```

使用 Res 装饰器装饰的参数为 Response 类型，通过 download 方法，选择需要下载图片的 url 即可下载图片。

## 使用 stream 流下载

### 所需依赖

- compress

### 服务端

```ts
@Get('stream')
  async down(@Res() res:Response) {
    const url = join(__dirname, "../images/1748939613947.jpg");
    const tarStream = new zip.Stream();
    await tarStream.addEntry(url);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename=wujinhao');
    tarStream.pipe(res);
  }
```

- 首先定义需要下载的文件路径
- 从 compress 模块导出 zip 类，通过 `Stream` 方法创建文件流对象
- 通过该对象的 `addEntry` 方法，将需要下载的文件路径传递进去
- 通过对 res 设置响应头，`Content-Type: application/octet-stream`; `Content-Desposition: attachment;filename=wujinhao`
- 将 res 传递给 文件流对象昂的 pipe 方法进行压缩。

### 客户端发送请求

```vue
<template>
  <button @click="download">download</button>
</template>
<script setup>
const useFetch = async (url) => {
  const res = await fetch(url).then((res) => res.arrayBuffer());
  const blob = new Blob([res]);
  const Url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = Url;
  a.download = "images.zip";
  a.click();
};

const download = () => {
  useFetch("http://localhost:3000/upload/stream");
};
</script>
<style scoped></style>
```

- 前端获取到响应体之后需要传递给 `Blob` 构造函数，生成一个 blob 对象。
- 随后用这个 blob 对象传递给 `createObjectURL` 方法，生成下载连接。
- 创建一个 a 标签，href 属性为刚刚生成的下载链接， download 名称可以自定义，但是一定要为压缩包的后缀名，文件名默认为后端刚刚规定的 filename 字段的值（wujinhao）
- 默认用户点击

## 依赖说明

### zip.Stream()

> compressing.zip.Stream() 是一个基于流的 ZIP 解压器, 主要用于按文件处理 .zip 内容，适合定制化处理需求（如过滤部分文件、重命名、转存等）。

```ts
const tarStream = new zip.Stream();
```

创建一个 ZIP 压缩流对象。

```ts
await tarStream.addEntry(url);
```

向 ZIP 流中添加一个文件条目（即这个 JPG 图片）。它不会立即生成完整文件，而是按流方式添加。

```ts
res.setHeader("Content-Type", "application/octet-stream");
```

设置 HTTP 响应的内容类型，表示这是一个二进制文件流（浏览器将触发下载而不是预览）。

```ts
res.setHeader("Content-Disposition", "attachment; filename=wujinhao");
```

置下载文件的名字为 wujinhao（没有写后缀，但浏览器可能自动识别成 zip）。

```ts
tarStream.pipe(res);
```

将 zip 流直接通过 HTTP 响应返回给前端用户，实现文件下载。

### arrayBuffer

```ts
const res = await fetch(url).then((res) => res.arrayBuffer());
```

将响应内容读取为 ArrayBuffer，即原始二进制数据

### Blob

```ts
const blob = new Blob([res]);
```

将 ArrayBuffer 包装成 Blob 对象

### URL.createObjectURL()

```ts
const Url = URL.createObjectURL(blob);
```

创建一个临时 URL，浏览器可以通过它访问这个 Blob
