# Git Remote Cooperation

### 1. 从远端拉取最新代码

```bash
git fetch origin
git checkout master
git pull origin master
```

确保本地 master 是最新的。

---

### 2. 创建并切换到 debug 分支

```bash
git checkout -b debug
```

这会基于当前的 master 创建一个名为 `debug` 的分支。

---

### 3. 在 debug 分支上开发 / 调试

正常修改代码，然后提交：

```bash
git add .
git commit -m "fix: debug xxx 问题"
```

如果要同步到远端，推送分支：

```bash
git push origin debug
```

（这样协作者也能看到你的 debug 分支）

---

### 4. 调试完成后合并到 master

切换回 master 分支并更新：

```bash
git checkout master
git pull origin master
```

再把 debug 合并进来：

```bash
git merge debug
```

---

### 5. 推送 master 到远端

```bash
git push origin master
```

---

### 6. （可选）删除 debug 分支

本地删除：

```bash
git branch -d debug
```

远端删除：

```bash
git push origin --delete debug
```

---

### Summary

`master` 拉最新 → `checkout -b debug` → 在 debug 上开发 → commit/push → 回 master → merge debug → push master → 删除 debug
