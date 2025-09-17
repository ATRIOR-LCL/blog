# TypeScript Guide

## Props Definition

Vue 类组件没有提供专门的定义 props 的API。不过，可以使用 `Vue.extend` 来实现：

```vue
<template>
  <div>{{ message }}</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

// Define the props by using Vue's canonical way.
const GreetingProps = Vue.extend({
  props: {
    name: String
  }
})

// Use defined props by extending GreetingProps.
@Component
export default class Greeting extends GreetingProps {
  get message(): string {
    // this.name will be typed
    return 'Hello, ' + this.name
  }
}
</script>
```
由于 `Vue.extend` 推断出定义的 prop 类型，因此可以通过扩展它来在类组件中使用它们。

如果有一个超类组件或 mixins 需要扩展，使用 mixins 将定义的 props 与它们结合起来：

```vue
<template>
  <div>{{ message }}</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import Super from './super'

// Define the props by using Vue's canonical way.
const GreetingProps = Vue.extend({
  props: {
    name: String
  }
})

// Use `mixins` helper to combine defined props and a mixin.
@Component
export default class Greeting extends mixins(GreetingProps, Super) {
  get message(): string {
    // this.name will be typed
    return 'Hello, ' + this.name
  }
}
</script>
```

## Property Type Declaration
有时，需要在类组件之外定义组件属性和方法。例如， Vuex Vue 官方状态管理库提供了 `mapGetters` 和 `mapActions` 辅助函数，用于将 `store` 映射到组件属性和方法。这些辅助函数需要在组件选项对象中使用。


即使在这种情况下，也可以将组件选项传递给 `@Component` 装饰器的参数。但是，它不会在运行时自动在类型级别声明属性和方法。

需要在类组件中手动声明它们的类型：

```ts
import Vue from 'vue'
import Component from 'vue-class-component'
import { mapGetters, mapActions } from 'vuex'

// Interface of post
import { Post } from './post'

@Component({
  computed: mapGetters([
    'posts'
  ]),

  methods: mapActions([
    'fetchPosts'
  ])
})
export default class Posts extends Vue {
  // Declare mapped getters and actions on type level.
  // You may need to add `!` after the property name
  // to avoid compilation error (definite assignment assertion).

  // Type the mapped posts getter.
  posts!: Post[]

  // Type the mapped fetchPosts action.
  fetchPosts!: () => Promise<void>

  mounted() {
    // Use the mapped getter and action.
    this.fetchPosts().then(() => {
      console.log(this.posts)
    })
  }
}
```

## `$refs` Type Extension

组件的 `$refs` 类型被声明为最广泛的类型，以处理所有可能的 ref 类型。虽然理论上是正确的，但在大多数情况下，每个 ref 实际上只包含一个特定的元素或组件。

可以通过覆盖类组件中的 `$refs` 类型来指定特定的 ref 类型：

```vue
<template>
  <input ref="input">
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class InputFocus extends Vue {
  // annotate refs type.
  // The symbol `!` (definite assignment assertion)
  // is needed to get rid of compilation error.
  $refs!: {
    input: HTMLInputElement
  }

  mounted() {
    // Use `input` ref without type cast.
    this.$refs.input.focus()
  }
}
</script>
```

可以访问无需类型转换的 `input` 类型，因为在上面的示例中， `$refs.input` 类型是在类组件上指定的。

请注意，它应该是类型注释（使用冒号 `:` 而不是值赋值（ `=` ）。

## Hooks Auto-complete
Vue 类组件提供了内置钩子类型，用于在类组件声明中自动补全 `data` 、 `render` 和其他生命周期钩子，并支持 TypeScript 代码。要启用此功能，需要导入位于 `vue-class-component/hooks` hooks 类型。

```ts
// main.ts
import 'vue-class-component/hooks' // import hooks type to enable auto-complete
import Vue from 'vue'
import App from './App.vue'

new Vue({
  render: h => h(App)
}).$mount('#app')
```

如果想让它与自定义钩子一起工作，可以手动添加：

```ts
import Vue from 'vue'
import { Route, RawLocation } from 'vue-router'

declare module 'vue/types/vue' {
  // Augment component instance type
  interface Vue {
    beforeRouteEnter?(
      to: Route,
      from: Route,
      next: (to?: RawLocation | false | ((vm: Vue) => void)) => void
    ): void

    beforeRouteLeave?(
      to: Route,
      from: Route,
      next: (to?: RawLocation | false | ((vm: Vue) => void)) => void
    ): void

    beforeRouteUpdate?(
      to: Route,
      from: Route,
      next: (to?: RawLocation | false | ((vm: Vue) => void)) => void
    ): void
  }
}
```

## Annotate Component Type in Decorator
在某些情况下，可能需要将组件类型用于 `@Component` 装饰器参数中的函数。例如，要在监视处理程序中访问组件方法：

```ts
@Component({
  watch: {
    postId(id: string) {
      // To fetch post data when the id is changed.
      this.fetchPost(id) // -> Property 'fetchPost' does not exist on type 'Vue'.
    }
  }
})
class Post extends Vue {
  postId: string

  fetchPost(postId: string): Promise<void> {
    // ...
  }
}
```

上述代码会产生一个类型错误，指出在监视处理 `this` 中， `fetchPost` 不存在。发生这种情况是因为 `@Component` 装饰器参数中的 `this` 类型是 `Vue` 基类型。

要使用自己的组件类型（在本例中 `Post` ），可以通过其类型参数注释装饰器。

```ts
// Annotate the decorator with the component type 'Post' so that `this` type in
// the decorator argument becomes 'Post'.
@Component<Post>({
  watch: {
    postId(id: string) {
      this.fetchPost(id) // -> No errors
    }
  }
})
class Post extends Vue {
  postId: string

  fetchPost(postId: string): Promise<void> {
    // ...
  }
}
```