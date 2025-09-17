# Extend and Mixins

## Extend

可以将现有的类组件扩展为原生类继承。假设有以下超类组件：

```js
// super.js
import Vue from 'vue'
import Component from 'vue-class-component'

// Define a super class component
@Component
export default class Super extends Vue {
  superValue = 'Hello'
}
```

可以使用类继承语法来扩展它：

```js
import Super from './super'
import Component from 'vue-class-component'

// Extending the Super class component
@Component
export default class HelloWorld extends Super {
  created() {
    console.log(this.superValue) // -> Hello
  }
}
```
注意，每个父类都必须是一个类组件。换句话说，它需要继承 `Vue` 构造函数作为祖先，并使用 `@Component` 装饰器进行修饰。

## Mixins

Vue 类组件提供了 `mixins` 辅助函数来使用 mixins 以类风格的方式。通过使用 `mixins`，TypeScript 可以推断 mixin 类型并在组件类型上继承它们。

声明 mixins `Hello` 和 `World` 的示例：

```ts
// mixins.js
@Component
export class Hello extends Vue {
  hello = 'Hello'
}

@Component
export class World extends Vue {
  world = 'World'
}
```

在类样式组件中使用它们：

```ts
import Component, { mixins } from 'vue-class-component'
import { Hello, World } from './mixins'

// Use `mixins` helper function instead of `Vue`.
// `mixins` can receive any number of arguments.
@Component
export class HelloWorld extends mixins(Hello, World) {
  created () {
    console.log(this.hello + ' ' + this.world + '!') // -> Hello World!
  }
}
```

与超类相同，所有 mixin 都必须声明为类组件。