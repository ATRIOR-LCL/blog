# Git Tag & Releases


## 1. **Tag（标签）**

标签就是给某个 commit 打上一个“版本号标记”，常用于发布版本。
有两种类型：

* **轻量标签（Lightweight Tag）**
  就是一个指向某个 commit 的别名，没有额外信息。

  ```bash
  git tag v1.0.0
  ```

* **附注标签（Annotated Tag）**
  含有作者、时间、说明信息，更适合发布。

  ```bash
  git tag -a v1.0.0 -m "Release version 1.0.0"
  ```

* **推送到远端**

  ```bash
  git push origin v1.0.0
  ```

  或者推送所有标签：

  ```bash
  git push origin --tags
  ```

---

## 2. **Release（发布版本）**

Release 是 GitHub / GitLab 等托管平台在标签基础上的“增强功能”。
它通常会包含：

* 一个 **tag**（发布版本号对应的 tag）
* 一个 **标题和描述**（发布说明，如更新内容 changelog）
* 可选的 **二进制文件/安装包附件**

### GitHub 发布 Release 的方式

1. 在本地创建 tag 并推送到远端。

   ```bash
   git tag -a v1.0.0 -m "First stable release"
   git push origin v1.0.0
   ```

2. 打开 GitHub 项目页面 → **Releases** → **Draft a new release**

   * 选择 `tag v1.0.0`
   * 填写 Release title、Description
   * 上传附件（可选，例如构建好的二进制）

3. 发布完成后，用户可以在 Releases 页面下载源码或附件。

---

## 3. **常见发布流程**

1. 开发完成后，切到 `main/master` 分支：

   ```bash
   git checkout main
   git pull origin main
   ```
2. 打 tag（附注标签比较常用）：

   ```bash
   git tag -a v1.2.0 -m "Add new feature X and fix bug Y"
   ```
3. 推送 tag：

   ```bash
   git push origin v1.2.0
   ```
4. 在 GitHub 上进入 **Releases** → 新建 Release → 选择对应的 tag，写 changelog → 发布。

---

## 4. **区别总结**

* **Tag**：版本的快照（纯 Git 概念）。
* **Release**：以 tag 为基础的“正式发布”，通常包含更新说明和可下载文件（托管平台概念）。


---

## Tag 常见命令

### 1. 查看 tag

```bash
# 查看所有 tag
git tag

# 按照模式过滤
git tag -l "v1.*"
```

---

### 2. 创建 tag

```bash
# 轻量标签
git tag v1.0.0

# 附注标签（推荐）
git tag -a v1.0.0 -m "Release version 1.0.0"

# 给历史 commit 打 tag
git tag -a v1.0.0 <commit-hash>
```

---

### 3. 推送 tag

```bash
# 推送单个 tag
git push origin v1.0.0

# 推送所有 tag
git push origin --tags
```

---

### 4. 删除 tag

#### 本地删除 tag

```bash
git tag -d v1.0.0
```

#### 远程删除 tag

```bash
git push origin :refs/tags/v1.0.0
```

或新语法（更直观）：

```bash
git push origin --delete tag v1.0.0
```

---

### 5. 覆盖（更新）tag

Git 的 tag 一般不建议改，但如果确实需要：

```bash
# 先删除本地旧的
git tag -d v1.0.0

# 在新的 commit 打 tag
git tag -a v1.0.0 -m "Update release v1.0.0"

# 强制推送
git push origin -f v1.0.0
```

---

## Release 删除（以 GitHub 为例）

注意：**Release ≠ Tag**。
删除 Release 只是移除 GitHub 页面上的“发布记录”，不会删除 tag。

### 方法 1：GitHub 网页操作

1. 打开仓库 → Releases → 找到要删除的 Release
2. 点进去 → 右上角 **Delete** → 确认
3. 这样只删除 Release，tag 还在。

### 方法 2：同时删除 Release 和 Tag

* 先网页上删掉 Release
* 再用命令删掉远程 tag：

  ```bash
  git push origin --delete tag v1.0.0
  ```
* 如果本地 tag 也不要了：

  ```bash
  git tag -d v1.0.0
  ```