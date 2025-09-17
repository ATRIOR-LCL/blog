# Additional Hooks

如果要使用一些 Vue 插件，比如 Vue Router，如果希望类组件能解析他们提供的钩子，在这种情况下，`Component.registerHooks`允许注册这样的钩子:
```ts
// class-component-hooks.ts
import Component from 'vue-class-component'

// Register the router hooks with their names
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
])
```

注册完成后，类组件将它们实现为类原型方法：
```ts
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class HelloWorld extends Vue {
  beforeRouteEnter(to, from, next) {
    console.log('beforeRouteEnter')
    next()
  }

  beforeRouteUpdate(to, from, next) {
    console.log('beforeRouteUpdate')
    next()
  }

  beforeRouteLeave(to, from, next) {
    console.log('beforeRouteLeave')
    next()
  }
}
```

最好把这个注册代码放到一个单独的文件中，因为必须在任何组件定义之前注册它们，可以通过 `import` 放在主程序的顶部来确保执行顺序：
```ts
// main.ts

// Make sure to register before importing any components
import './class-component-hooks'

import Vue from 'vue'
import App from './App'

new Vue({
  el: '#app',
  render: h => h(App)
})
```