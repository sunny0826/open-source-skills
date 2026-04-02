# pr-description

## 功能说明
这个 skill 旨在根据用户提供的代码改动（`git diff`）或文字描述，自动生成结构化、高质量的 Pull Request (PR) 描述。它能够：
- 分析代码差异，提取核心改动（如新增了什么库，修改了哪个组件逻辑）。
- 自动判定改动类型（Bug 修复、新功能、重构等），并勾选对应复选框。
- 支持直接输入 GitHub PR 链接，Agent 会自动拉取 diff 进行分析。
- 引导撰写规范的 PR 模板（包含标题、摘要、主要变更、测试情况和 Reviewer 提示）。
- 支持中英双语输出，会根据用户的提问语言自动适配。

## 使用场景
当你准备提交一个 Pull Request 时，不想手动编写长篇的改动说明，可以直接将 `git diff` 结果粘贴给 Agent，或者简单描述你的改动意图，Agent 将为你生成一份标准专业的 PR 描述。

## 提问示例

**中文模式：**
```text
帮我根据以下 git diff 生成一份 PR 描述：
--- a/src/auth.js
+++ b/src/auth.js
@@ -1,5 +1,5 @@
-function login(user, pass) {
+function login(user, pass, token) {
-  return user === 'admin' && pass === '1234';
+  return (user === 'admin' && pass === '1234') || validateToken(token);
 }
```

```text
生成一份中文的 PR description，这是我刚做的重构，把所有的 var 换成了 let 和 const，没有新增功能。
```

**英文模式：**
```text
Write a PR description for these changes:
--- a/package.json
+++ b/package.json
@@ -10,2 +10,3 @@
     "express": "^4.17.1",
+    "cors": "^2.8.5"
```