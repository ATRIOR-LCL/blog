# Vue Class Decorator

Vue Class Decorator 提供了 7 个装饰器和 1 个函数（Mixin）：

- @FunctionalVue
- @Filter
- @On
- @Once
- @Mounted
- @Cache
- @NoCache
- @Emit (from vue-property-decorator)
- @Inject (from vue-property-decorator)
- @Model (from vue-property-decorator)
- @Prop (from vue-property-decorator)
- @Provide (from vue-property-decorator)
- @Watch (from vue-property-decorator)
- @Component (from vue-class-component)
- Mixins (the helper function named mixins defined at vue-class-component)

## FunctionalVue class
```ts
import { FunctionalVue, Component, Filter } from 'vue-class-decorator'

@Component
export default class YourComponent extends FunctionalVue {
  //...
}
```
等效于
```ts
export default {
  functional: true
  //...
}
```

## @Filter(name?: string) decorator

```ts
import { Vue, Component, Filter } from 'vue-class-decorator'

@Component
export default class YourComponent extends Vue {
  @Filter('date')
  DateFilter(val: string) { }

  @Filter()
  date2(val: string) { }
}
```

等效于

```ts
export default {
  filter: {
    date(val) {},
    date2(val) {}
  }
}
```

过滤器在 Vue 3 已被废弃（官方推荐用计算属性或方法代替）。

## @On(event?: string, reserve: boolean = true) decorator

```ts
import { Vue, Component, On } from 'vue-class-decorator'

@Component
export default class YourComponent extends Vue {
  @On("change")
  Handler(e) { 
    //handler1
  }

  @On()
  InputEvent(e) { 
    //handler2
  }

  @On("resize", false)
  Handler2(e) { 
    //handler3
  }
}
```
等效于
```ts
export default {
  methods: {
    Handler(e) { 
      //handler1
    },
    InputEvent(e) { 
      //handler2
    }
  },
  mounted() {
    this.$on("change", this.Handler)

    this.$on("input-event", this.InputEvent)

    this.$on("resize", () => {
      //handler3
    })
  }
}
```
