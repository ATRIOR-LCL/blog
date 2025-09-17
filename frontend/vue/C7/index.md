# Built-in Hook Methods

- data
- beforeCreate
- created
- beforeMount
- mounted
- beforeDestroy
- destroyed
- beforeUpdate
- updated
- activated
- deactivated
- render
- errorCaptured
- serverPrefetch

### **创建阶段**

1. **data**

   * 在组件实例初始化时执行（`beforeCreate` 之前），用来返回响应式数据对象。
   * 这个并不是生命周期钩子，而是一个选项。

2. **beforeCreate**

   * 在实例初始化之后，数据观测（`data`、`props` 等）和事件配置 **之前** 调用。
   * 此时还拿不到 `data` 和 `props`，只能访问 `this` 上极少的属性。

3. **created**

   * 实例已经创建完成，`data`、`props` 已经可用，`methods` 也能访问。
   * 但组件还没挂载到 DOM 上，`$el` 还不可用。
   * 常用于 **初始化数据、发起请求**。

---

### **挂载阶段**

4. **beforeMount**

   * 在挂载开始之前调用。
   * 此时已编译好虚拟 DOM，还没有真正渲染到页面上。

5. **mounted**

   * 组件挂载完成后调用。
   * 此时 `$el` 已经插入到页面，可以进行 **DOM 操作、第三方库初始化**。

---

### **更新阶段**

6. **beforeUpdate**

   * 当响应式数据更新时，在虚拟 DOM 重新渲染、打补丁之前调用。
   * 适合在视图更新前基于旧数据做一些处理。

7. **updated**

   * 虚拟 DOM 重新渲染并更新到真实 DOM 后调用。
   * 此时 DOM 已经和数据保持一致。
   * 注意避免在这里再次修改数据，否则会导致更新死循环。

---

### **销毁阶段**

8. **beforeDestroy**

   * 在实例销毁之前调用。
   * 此时实例依然可用，常用于 **清理定时器、解绑事件监听**。

9. **destroyed**

   * 实例销毁后调用。
   * 所有事件监听、子组件都被销毁，组件彻底失效。

---

### **缓存相关（keep-alive 特有）**

10. **activated**

    * 当 `keep-alive` 缓存的组件被激活时调用。
    * 适合在组件重新显示时重新获取数据或恢复状态。

11. **deactivated**

    * 当 `keep-alive` 缓存的组件被停用（切换出去）时调用。
    * 适合在组件隐藏时做缓存处理。

---

### **渲染/错误/服务端**

12. **render**

    * 不是生命周期钩子，而是一个 **渲染函数**，决定组件如何渲染。
    * 通常只在手写渲染函数时才用。

13. **errorCaptured**

    * 当子组件抛出错误时触发，返回 `false` 可阻止错误继续向上传播。
    * 常用于错误边界处理。

14. **serverPrefetch (SSR 特有)**

    * 仅在服务端渲染（SSR）时调用。
    * 返回一个 `Promise`，服务器会等待其完成再渲染 HTML。
    * 适合做 **数据预取**。

---

**总结时序大致流程：**
`beforeCreate → created → beforeMount → mounted → (数据变化: beforeUpdate → updated) → beforeDestroy → destroyed`
（如果使用 keep-alive，则在 mounted 之后会有 `activated/deactivated` 的切换）

