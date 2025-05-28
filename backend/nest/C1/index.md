# 前置知识

## 控制反转 IOC
控制反转是一个思想或原则，强调“把控制权从对象内部交给外部”。

## 依赖输入 DI
依赖注入是控制反转的具体实现方式之一。

没有使用依赖注入的代码
```ts
class A {
    name: string;
    constructor() {
        this.name = 'wujinhao';
    }
}

class B {
    name: string;
    constructor(b: string) {
        this.name = new A().name;
    }
}
```
这样没有问题，应为 A 和 B 并没有依赖关系
```ts
class A {
    name: string;
    constructor(a:string) {
        this.name = a;
    }
}

class B {
    name: string;
    constructor(b: string) {
        this.name = new A().name;
    }
}
```
这样会报错

为了解决以上方法，采用依赖注入:
```ts
class A {
  name: string;
  constructor(a: string) {
    this.name = a;
  }
}

class Container {
  module: any;
  constructor() {
    this.module = {};
  }
  provide(key: string, mo: any) {
    this.module[key] = mo;
  }
  get(key: string) {
    return this.module[key];
  }
}

const container = new Container();
container.provide("A", new A("wujinhao"));

class B {
  a: any;
  c: any;
  constructor(mo: Container) {
    this.a = mo.get("A");
    this.c = mo.get("C");
  }
}
```

## 装饰器
### 类装饰器
类装饰器是一个函数，第一个参数 target 接收类的构造函数,可以通过 target 的 prototype 属性，来为该类的对象添加属性和方法。
```ts
const doc: ClassDecorator = (target: any) => {
  console.log(target);
  target.prototype.name = "wujinhao";
};

@doc
class Person {
  constructor() {}
}

const person: any = new Person();
console.log(person.name);
```

### 属性装饰器
属性装饰器添加在类的属性上，装饰器函数接收两个参数
- target: 类的原型对象
- key: 属性名称
```ts
const doc: PropertyDecorator = (target: any, key: string | symbol) => {
  console.log(target, key);
};

class Person {
  @doc
  public name: string;
  constructor() {
    this.name = "default name";
  }
}

const person: any = new Person();
```

### 方法装饰器
参数与属性装饰器类似，多一个参数 descriptor 是方法的描述参数。

```ts
const doc: MethodDecorator = (
  target: any,
  key: string | symbol,
  descriptor: any
) => {
  console.log(target, key, descriptor);
};

class Person {
  public name: string;
  constructor() {
    this.name = "default name";
  }
  @doc
  getName() {}
}

const person: any = new Person();
```

### 参数装饰器
- target: 类的原型对象
- key: 函数名称
- index: 参数索引
```ts
const doc: ParameterDecorator = (
  target: any,
  key: string | symbol,
  index: any
) => {
  console.log(target, key, index);
};

class Person {
  public name: string;
  constructor() {
    this.name = "default name";
  }
  getName(name: string, @doc age: number) {}
}

const person: any = new Person();
```

## 使用装饰器工厂封装 Get 请求

```ts
import axios from "axios";

const Get = (url: string) => {
  return (target: any, key: any, descriptor: PropertyDescriptor) => {
    const fnc = descriptor.value;
    axios
      .get(url)
      .then((res) => {
        fnc(res, {
          status: 200,
          message: "Data fetched successfully",
        });
      })
      .catch((err) => {
        fnc(err, {
          status: 500,
          message: "Error fetching data",
        });
      });
  };
};

class Controller {
  constructor() {}
  @Get("http://api.apiopen.top/api/getHaoKanVideo?page=0&size=10")
  getList(res: any, status: any) {
    console.log(res.data.result.list, status);
  }
}
```