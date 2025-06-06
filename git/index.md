# Git Format

## Git Commit 规范
- feat: 新增 feature
- fix: 修复 bug
- docs: 仅仅修改了文档，比如 README, CHANGELOG, CONTRIBUTE 等等
- style: 仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑
- refactor: 代码重构，没有加新功能或者修复 bug
- perf: 优化相关，比如提升性能、体验
- test: 测试用例，包括单元测试、集成测试等
- chore: 改变构建流程、或者增加依赖库、工具等
- revert: 回滚到上一个版本

## 远程协作规范

### 创建一个分支
```bash
$ git checkout -b feature_infinite_load    # 切换到一个feature分支或者bug fix分支
```

### 将代码提交到本地Git仓库，并填写符合要求的Commit message格式
```bash
$ git add .
$ git commit
```

### 将代码同步到远程Git仓库
```bash
 $ git push origin feature_infinite_load
```