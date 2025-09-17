# Custom Decorators

Vue 类组件提供了 `createDecorator` 辅助函数来创建自定义装饰器。需要接收一个回调函数作为第一个参数，回调函数将接收以下参数：
- `options`：Vue 组件选项对象。此对象的更改将影响提供的组件。
- `key`：装饰器锁应用的属性活方法的键名。
- `parameterIndex`：如果自定义装饰器用于参数，则为装饰器的索引。

创建 `Log` 装饰器的示例，当调用装饰方法时，打印带有方法名称和传递的参数的日志消息：

```ts
// decorators.ts
import { createDecorator } from 'vue-class-component'

// Declare Log decorator.
export const Log = createDecorator((options, key) => {
  // Keep the original method for later.
  const originalMethod = options.methods[key]

  // Wrap the method with the logging logic.
  options.methods[key] = function wrapperMethod(...args) {
    // Print a log.
    console.log(`Invoked: ${key}(`, ...args, ')')

    // Invoke the original method.
    originalMethod.apply(this, args)
  }
})
```

使用它作为方法装饰器：
```ts
import Vue from 'vue'
import Component from 'vue-class-component'
import { Log } from './decorators'

@Component
class MyComp extends Vue {
  // It prints a log when `hello` method is invoked.
  @Log
  hello(value) {
    // ...
  }
}
```

当传递 10 作为参数调用 hello 时，会打印：
```
Invoked: hello( 42 )
```