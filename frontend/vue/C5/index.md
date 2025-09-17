# Caveats of Class Component

## `this` value in property initializer

如果将箭头函数定义为类属性并在其中访问 `this` ，它将不起作用。这是因为 `this` 只是初始化类属性时 Vue 实例的代理对象：

```ts
@Component
export default class MyComp extends Vue {
  foo = 123

  // DO NOT do this
  bar = () => {
    // Does not update the expected property.
    // `this` value is not a Vue instance in fact.
    this.foo = 456
  }
}
```

在这种情况下，可以简单地定义一个方法而不是类属性，因为 Vue 会自动绑定实例：

```ts
@Component
export default class MyComp extends Vue {
  foo = 123

  // DO this
  bar() {
    // Correctly update the expected property.
    this.foo = 456
  }
}
```

## Always use lifecycle hooks instead of `constructor`

由于类组件会调用原始构造函数来收集初​​始组件数据，因此不建议自行声明 `constructor` ：

```ts
@Component
export default class Posts extends Vue {
  posts = []

  // DO NOT do this
  constructor() {
    fetch('/posts.json')
      .then(res => res.json())
      .then(posts => {
        this.posts = posts
      })
  }
}
```

上述代码旨在在组件初始化时获取 Posts 列表，但由于 Vue 类组件的工作方式，获取操作将被意外调用两次。

编写生命周期钩子，例如 `created` 而不是 `constructor` ：

```ts
@Component
export default class Posts extends Vue {
  posts = []

  // DO this
  created() {
    fetch('/posts.json')
      .then(res => res.json())
      .then(posts => {
        this.posts = posts
      })
  }
}
```