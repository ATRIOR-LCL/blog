# package-lock.json

> package-lock.json 是在 npm(^5.x.x.x)后才有的，中途有几次更改

## 作用
对**整个依赖树**进行版本的固定（锁死）

## 产生

当我们在一个项目中使用`npm install`的时候，会自动产生一个package-lock.json 文件，和 package.json 在同一个目录下，package-lock.json 记录了项目的一些信息和所依赖的模块，这样在每次安装都会出现相同的结果，不管你是在什么机器上什么时候安装。

当我们下次再`npm install`的时候，npm 发现如果项目中有 package-lock.json 文件，会根据 package-lock.json 里的内容来处理和安装依赖，而不再根据 package.json。

## 问题
如果依赖包实在有 bug, 我们需要升级依赖包，此时我们只需要修改 package.json 依赖包的版本，只要 package.json 和 package-lock.json 中版本不一致，就会重新产生一个 package-lock.json。样就达到了升级依赖包版本的目的。
```bash
$ npm i axios@5.3.5
```