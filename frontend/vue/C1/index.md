# Class Component

使用 `@Component` 装饰器，使类成为 Vue 组件

```ts
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class HelloWorld extends Vue {}
```

## Data

初始`data`可以声明为类属性
```vue
<template>
  <div>{{ message }}</div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class HelloWorld extends Vue {
  message = 'Hello World!'
}
</script>
```

如果初始值为 `undefined`，则类属性将不会具有响应性，这意味着将不会检测到属性的更改
```ts
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class HelloWorld extends Vue {
  // `message` will not be reactive value
  message = undefined
}
```
为了避免这种情况，您可以使用 `null` 值或使用 `data` hooks
```ts
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class HelloWorld extends Vue {
  // `message` will be reactive with `null` value
  message = null

  // See Hooks section for details about `data` hook inside class.
  data() {
    return {
      // `hello` will be reactive as it is declared via `data` hook.
      hello: undefined
    }
  }
}
```

## Methods

组件 `methods` 可以直接声明为类原形方法

```vue
<template>
  <button v-on:click="hello">Click</button>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class HelloWorld extends Vue {
  hello() {
    console.log('Hello World!')
  }
}
</script>
```

## Computed Properties
计算属性可以声明为类属性 getter / setter

```vue
<template>
  <input v-model="name">
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class HelloWorld extends Vue {
  firstName = 'John'
  lastName = 'Doe'

  get name() {
    return this.firstName + ' ' + this.lastName
  }

  set name(value) {
    const splitted = value.split(' ')
    this.firstName = splitted[0]
    this.lastName = splitted[1] || ''
  }
}
</script>
```

## Hooks
`data`、`render`以及所有 Vue 生命周期狗子都可以直接声明为类原型方法，但不能直接在实例本身上调用他们。
```ts
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class HelloWorld extends Vue {
  mounted() {
    console.log('mounted')
  }

  render() {
    return <div>Hello World!</div>
  }
}
```

## Other Options

对于所有其他选项，都可以传递给装饰器函数。比如注册一个子组件并使用：
```vue
<template>
  <OtherComponent />
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import OtherComponent from './OtherComponent.vue'

@Component({
  components: {
    OtherComponent
  }
})
export default class HelloWorld extends Vue {}
</script>
```