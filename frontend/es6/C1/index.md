## 一、let 声明变量

```jsx
let a = 100;

// 1. 变量不可重复声明
let a; // 报错 var可以重复声明

// 2. 块级作用域 全局, 函数, eval
// if else while for
{
  let girl = "nihao";
}
console.log(girl); // 无效 var 有效

// 3. 不存在变量提升

console.log(son); // 不会报错 会输出 undefined
var son = "www";

console.log(father); // 报错
let father = "xss";

// 4. 不影响作用域链
{
  let a = "wujinhao";
  function fn() {
    console.log(a);
  }
  fn();
}
```

## 二、const 声明常量

```jsx
// 一定要赋初始值
// 一般用大写
// 不能修改
// 对于数组和对象的元素修改，不算对常量的修改，不会报错（指针没变）
const SCHOOL = "wujinhao";

console.log(SCHOOL);
```

## 三、变量解构赋值

```jsx
// 数组结构
const F3 = ["hello", "war", "non", "son"];

let [xiao, liu, zhao, si] = F3;

console.log(xiao, liu, zhao, si); // hello war non son

// 对象结构
const zhao = {
  name: "wujinhao",
  age: "20",
  handle: function () {
    console.log("hello world");
  },
};

let { name, age, handle } = zhao;

/*
wujinhao
20
hello world
*/
console.log(name);
console.log(age);
handle();
```

## 四、模板字符串

```jsx

```

## 五、对象的简化写法

```jsx
let name = "wujinhao";
let change = function () {
  console.log("hello");
};

const SCHOOL = {
  name,
  change,
};

console.log(SCHOOL); // { name: 'wujinhao', change: [Function: change] }

// 方法的简化（不用加 function 关键字）
let name = "wujinhao";
let change = function () {
  console.log("hello");
};

const SCHOOL = {
  name,
  change,
  improve() {
    console.log("nihao");
  },
};

/*
{
  name: 'wujinhao',
  change: [Function: change],
  improve: [Function: improve]
}
*/
console.log(SCHOOL);
```

## 六、箭头函数

```jsx
let fn = (a, b) => {
  return a + b;
};
let result = fn(1, 2);
console.log(result); // 3

// 1. this 指向是静态的，永远指向函数定义时的作用域的this
function getName() {
  console.log(this.name);
}

let getName2 = () => {
  console.log(this.name);
};

window.name = "wujinhao";
const SCHOOL = {
  name: "ming",
};

getName(); // wujinhao
getName2(); // wujinhao

getName.call(SCHOOL); // ming
getName2.call(SCHOOL); //wujinhao

// 2. 不能作为构造函数实例化对象
let Person = (a, b) => {
  // 错误的
  this.name = a;
  this.age = b;
};

let me = new Person("wujinhao", 20);
console.log(me);

// 3. 不能使用 arguments 变量
let fn = () => {
  console.log(arguments);
};

fn(1, 2, 3);

// 4. 只有一个参数可以省略小括号
// 5. 当代码体只有一条语句可以省略花括号且有 return 必须省略，且函数本身就是其返回结果
```

## 七、形参初始值

```jsx
function add(a, b, c=10) {
    console.log(a+b+c)
}
// 习惯上默认参数往后写
const res = add(1,2,3) // 6
const ser = add(1,2) // 13
console.log(res)

// 与解构赋值结合
function connect({name, age， like="web"}) {
    console.log(name, age, like)
}

connect({
    name:'wujinhao',
    age: 90
}) // wujinhao 90 web
```

## 八、rest 参数

```jsx
// 获取函数的实参
function data(...args) {
  console.log(args);
}

data(1, 2, 4); // [ 1, 2, 4 ]

// rest 参数必须放到参数的最后
function data(a, b, ...args) {
  console.log(a, b, args);
}

data(1, 2, 4, 4, 5); // 1 2 [ 4, 4, 5 ]
```

## 九、拓展运算符

```jsx
// 将数组转换为一个逗号分隔的参数列表
const arr = ["wujinhao", "ming", "min"];

function hello() {
  console.log(arguments);
}

hello(arr); // [Arguments] { '0': [ 'wujinhao', 'ming', 'min' ] }
hello(...arr); // [Arguments] { '0': 'wujinhao', '1': 'ming', '2': 'min' }

// 1. 数组合并
const arr1 = ["wujinhao", "ming", "min"];
const arr2 = [1, 2, 43];

const arr = [...arr1, ...arr2];
console.log(arr); // [ 'wujinhao', 'ming', 'min', 1, 2, 43 ]

// 2. 数组克隆
const arr1 = ["wujinhao", "ming", "min"];
const arr2 = [...arr1];

console.log(arr2); // [ 'wujinhao', 'ming', 'min' ]

// 3. 将伪数组转换为真正的数组
const divs = document.querySelectorAll("div"); // NodeList->Object
const divArr = [...divs]; // [div, div, div...]
```

## 十、Symbol

1. Symbol 的值是唯一的
2. Symbol 的值不能与其他数据进行运算
3. Symbol 定义的对象属性不能用 for ... in ... 循环遍历，但是可以通过 Reflect.ownKeys 来获取对象的所有键名

```jsx
let s = Symbol();、
// 通过赋值符号赋值
let s2 = Symbol(1)
let s3 = Symbol(1)
console.log(s2 == s3) // false
// 通过.for方法赋值
let s4 = Symbol.for(2)

// JS 数据类型
// USONB
// u undifined
// s string symbol
// o object
// n null number
// b boolean

// 在对象中添加Symbol属性
let yong = {
    name:'wujinhao',
    [Symbol('say')]:function(){
        console.log('hello')
    }
}

console.log(yong) // { name: 'wujinhao', [Symbol(say)]: [Function: [say]] }
```

## 十一、Symbol 内置属性

```jsx

```

## 十二、迭代器

> 迭代器是一种 Iterator 接口（js 的接口其实就是一个属性 Symbol.Iterator），为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署迭代器接口，就可完成遍历操作。

1. ES6 穿凿了一种新的遍历命令 for ,,, of 循环，Iterator 接口主要供 for ,,, of 消费
2. 原生具备 Interator 接口的数据（可用 for ,,, of 遍历）
   1. Array
   2. Arguments
   3. Set
   4. Map
   5. String
   6. TypeArray
   7. NodeList
3. 工作原理
   1. 创建一个指针对象，指向当前数据结构的起始位置
   2. 第一次调用对象的 next 方法，指针自动指向数据结构的第一个成员
   3. 接下来不断调用 next 方法，指针一直往后移动，知道指向最后一个成员
   4. 每调用 next 都会返回一个包含 value 和 done 属性的对象

```jsx
const arr = ["nihao", "woshi", "fule", "hehe"];

/*
nihao
woshi
fule
hehe
*/
for (let v of arr) {
  console.log(v);
}

let iterator = arr[Symbol.iterator]();
/*
{ value: 'nihao', done: false }
{ value: 'woshi', done: false }
{ value: 'fule', done: false }
{ value: 'hehe', done: false }
{ value: undefined, done: true }
*/
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
```

自定义迭代器

```jsx
const banji = {
  name: "school",
  stus: ["wujinhao", "xiaoming", "xiaohong", "xiaoli"],
  // 创建迭代器
  [Symbol.iterator]() {
    // 提供初始下标
    let index = 0;
    // 返回一个带有 next 方法的对象
    return {
      // 这里使用箭头函数是因为下面的this 如果next是使用function定义的，
      // 那么他会指向next本身而不是banji
      next: () => {
        // 如果没有遍历到数组末尾，就让index++
        if (index < this.stus.length) {
          const res = {
            value: this.stus[index],
            done: false,
          };
          index++;
          return res; // 返回 next 函数返回一个带有 value 和 done 属性的对象
        } else {
          // 到达数组末尾直接return
          return {
            value: undefined,
            done: true,
          };
        }
      },
    };
  },
};

/*
wujinhao
xiaoming
xiaohong
xiaoli
*/
for (let v of banji) {
  // 需求：使用 for...of 遍历banji对象中的stus数组
  console.log(v);
}
```

## 十三、生成器

> 生成器就是一个特殊的函数
> 生成器是 ES6 提供的一种异步编程方案，语法行为与传统的函数完全不同

```jsx
// yield 是函数代码的分隔符

function* gen() {
  console.log(111);
  yield "hello";
  console.log(111);

  yield "name";
  console.log(111);

  yield "xixi";
  console.log(111);

  yield "hehe";
  console.log(111);
}

// 返回一个迭代器对象
let iterator = gen();
iterator.next(); // 111
// next 返回的就是就是当前 yield 的指
console.log(iterator.next()); // 'hello'

iterator.next(); // 111 111
iterator.next();

/*
111
hello
111
name
111
xixi
111
hehe
111
*/
for (let v of iterator) {
  console.log(v);
}
```

对异步编程的影响

```jsx
function* gen(args) {
  console.log(args);

  let one = yield 111;
  console.log(one);
  let two = yield 222;
  console.log(two);

  let three = yield 333;
  console.log(three);
}
// 执行获取迭代器对象
let iterator = gen("AAA");

// next 方法可以传递参数，参数为上一个 yield 的返回结果
console.log(iterator.next("BBB"));
console.log(iterator.next("CCC"));
console.log(iterator.next("DDD"));
/*
AAA
{ value: 111, done: false }
CCC
{ value: 222, done: false }
DDD
{ value: 333, done: false }
*/

/*
需求：1s后输出 111，2s 后输出 222，3s后输出 333
如果使用setTimeout层层嵌套调用就会产生毁掉地域问题
*/
setTimeout(() => {
  console.log(111);
  setTimeout(() => {
    console.log(222);
    setTimeout(() => {
      console.log(333);
    }, 3000);
  }, 2000);
}, 1000);

/*
使用生成器把嵌套的异步函数封装成三个任务添加到生成器的 yield 中，并在代码中添加 iterator.next()
表示执行到这一步之后去执行下一个 yield
*/
function one() {
  setTimeout(() => {
    console.log(111);
    iterator.next();
  }, 1000);
}

function two() {
  setTimeout(() => {
    console.log(222);
    iterator.next();
  }, 2000);
}

function three() {
  setTimeout(() => {
    console.log(333);
    iterator.next();
  }, 3000);
}

function* gen() {
  yield one();
  yield two();
  yield three();
}

let iterator = gen();
iterator.next();
```

## 十三、Promise

> Promise 是 ES6 提供的异步编程的新解决方案，语法上 Promise 是一个构造函数

用来封装异步操作并且可以获取其成功或失败的结果

[Promise](https://www.notion.so/Promise-19c04c3ffdd38090aa1bff652c5d661a?pvs=21)

## 十四、模块化

模块化优势：

1. 防止命名冲突
2. 代码复用
3. 高维护性

模块化功能主要由两个命令构成：export 和 import

- export 用于规定模块的对外接口
- import 命令用于输入其他模块提供的功能

```jsx
// export 暴露
export let school = "wujinhao";
export function Hello() {
  console.log("Hello");
}

// 统一暴露
let school = "wujinhao";
function Hello() {
  console.log("Hello");
}

export { school, Hello };

// 默认暴露
let school = "wujinhao";
function Hello() {
  console.log("Hello");
}

export default {
  school,
  Hello,
};
```

```jsx
// 结构赋值
import { school, Hello } from "...";
import { school as Wujinha, Hello as Greeting } from "..."; // as 主要用于防止重名
import { default as mm } from "..."; // 针对默认暴露
// 简便形式，针对默认暴露
import mm from "..."; // mm为默认暴露模块
```

## 十五、浏览器使用 ES6 模块化方式二

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body>
    <script src="./app.js" type="module"></script>
  </body>
</html>
```

在 HTML 中通过 src 导入入口文件，同时 type 设置为 module

```jsx
import m1 from "./index1.js";
import m2 from "./index2.js";
import m3 from "./index3.js";
```

在入口文件中可以导入一些内容，这样就减少了 html 代码的体积

## 十六、async await
