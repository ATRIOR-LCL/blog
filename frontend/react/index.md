# React
React 是一个由 **Facebook（现在的 Meta）开发的开源 JavaScript 库**，用于构建用户界面，尤其是单页应用（SPA）中的视图层。它主要用于开发网页和移动应用的前端界面。

---

### 📌 React 的几个核心特点：

| 特性         | 说明                                                         |
| ---------- | ---------------------------------------------------------- |
| **组件化**    | UI 被拆分为小的组件（例如按钮、表单、页面等），每个组件独立管理自己的逻辑和样式。                 |
| **JSX**    | 一种 JavaScript 的语法扩展，可以在 JavaScript 中写 HTML（看起来像 HTML 的语法）。 |
| **虚拟 DOM** | React 会用 Virtual DOM 来提升性能，避免直接操作真实 DOM。                   |
| **单向数据流**  | 数据从父组件“单向”流向子组件，便于管理和调试。                                   |
| **声明式 UI** | 你只需要声明“界面长什么样”，React 负责更新和渲染变化。                            |

---

### 🧩 举个例子（React 代码示例）：

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Alice" />
      <Welcome name="Bob" />
    </div>
  );
}
```

这个代码定义了一个 `Welcome` 组件，然后在 `App` 组件中多次使用它。

---

### 🚀 React 适合做什么？

* 单页应用（如 Gmail、Twitter）
* 管理后台（如 CMS 系统）
* 移动应用（通过 React Native）
* 任何需要复杂交互的用户界面
