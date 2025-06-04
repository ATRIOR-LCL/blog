# Rxjs

Rxjx 使用观察者模式，用来编写**异步队列**和事件处理。

- Observable 可观察的物件
- Subscription 监听 Observable
- Operators 纯函数可以处理管道的数据，如 map filter concat reduce 等

## Observale

编写一个 Obserbale 实现异步任务的封装

```ts
const observable = new Observable((subscribe) => {
  subscribe.next(1);
  subscribe.next(2);
  subscribe.next(3);
  setTimeout(() => {
    subscribe.next(4);
    subscribe.complete();
  }, 3000);
});
observable.subscribe({
  next: (value) => {
    console.log("value:", value);
  },
});
```

## 通过管道过滤数据

```ts
const subs = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
  .pipe(
    // 管道，下面是过滤条件
    map((v) => ({ num: v })),
    filter((e) => e.num % 2 === 0),
    retry(2) // Retry the observable up to 2 times on error
  )
  //   .pipe(take(5))
  .subscribe((e) => {
    console.log(e);
    if (e.num === 10) {
      subs.unsubscribe();
    }
  });
```
