# Open Source Skills

开源相关 skills 仓库，为您的开源项目提供一系列的技能。

## Quick Start

快速安装：

```bash
npx skills add sunny0826/open-source-skills
```

## Available Skills

| Skill 名称 | 路径 | 作用描述 | 说明文档 |
| :--- | :--- | :--- | :--- |
| `open-source-license` | `skills/open-source-license/` | 开源许可证选型、对比、兼容性分析、合规检查、LICENSE/NOTICE/Header 生成，额外支持木兰宽松许可证第 2 版。 | [README](./skills/open-source-license/README.md) |
| `open-source-analysis` | `skills/open-source-analysis/` | 分析 GitHub 开源项目并生成包含技术栈、数据、活跃度评分及多维度评价的结构化分析报告（支持中英双语）。 | [README](./skills/open-source-analysis/README.md) |
| `openrank-metrics` | `skills/openrank-metrics/` | 基于 OpenDigger 数据源，查询 GitHub/Gitee 开源项目或开发者的 OpenRank 值、活跃度等各项统计指标，并支持按指定周期生成指标全貌表格。 | [README](./skills/openrank-metrics/README.md) |
| `git-helper` | `skills/git-helper/` | 详尽的 Git 命令助手与工作流指南。支持按需翻译意图为具体命令，并针对破坏性操作提供安全警告。 | [README](./skills/git-helper/README.md) |
| `pr-description` | `skills/pr-description/` | 自动根据 Git diff 内容或文字描述，生成规范的、包含复选框的 Pull Request (PR) Description。 | [README](./skills/pr-description/README.md) |
| `release-notes` | `skills/release-notes/` | 从 GitHub Compare 链接或 commit 记录中提取并生成结构化的发版说明，自动进行 Breaking Change / Feature / Fix 分类。 | [README](./skills/release-notes/README.md) |
| `issue-triage` | `skills/issue-triage/` | 分析 GitHub Issue 内容（支持链接或纯文本），自动评估优先级、检查缺失信息（如复现步骤）并生成礼貌的专业回复模板。 | [README](./skills/issue-triage/README.md) |
| `dockerfile-optimizer` | `skills/dockerfile-optimizer/` | 审查并重构臃肿、缓慢的 Dockerfile。提供多阶段构建、层缓存优化、无用包清理和非 Root 用户的 DevOps 最佳实践建议。 | [README](./skills/dockerfile-optimizer/README.md) |
| `contributor-guide-writer` | `skills/contributor-guide-writer/` | 自动分析当前项目结构和构建工具（如 npm/Go/Python），生成量身定制且专业的开源 `CONTRIBUTING.md` 贡献指南。 | [README](./skills/contributor-guide-writer/README.md) |
| `rfc-writer` | `skills/rfc-writer/` | 将模糊的技术想法扩写为标准的、专业的 RFC（技术提案）文档，自动补全背景、优缺点及替代方案考量。 | [README](./skills/rfc-writer/README.md) |
| `cli-help-writer` | `skills/cli-help-writer/` | 将零散的命令行参数与说明转化为排版精美、符合 POSIX 标准的终端 `--help` 文案或 Man Page。 | [README](./skills/cli-help-writer/README.md) |
| `prompt-reviewer` | `skills/prompt-reviewer/` | 审查 Prompt，找出歧义、遗漏约束、潜在幻觉风险，并提供改进建议与优化后的 Prompt。 | [README](./skills/prompt-reviewer/README.md) |
| `readme-grader` | `skills/readme-grader/` | 评估开源项目 README，从简介、安装、使用、贡献等 5 个维度打分并提供具体的改进建议。 | [README](./skills/readme-grader/README.md) |

## Installation

### Claude Code Plugin 安装 (推荐)

如果你正在使用 [Claude Code](https://github.com/anthropics/claude-code)，可以通过以下命令将本仓库注册为 Claude Code Plugin Marketplace：

```bash
/plugin marketplace add sunny0826/open-source-skills
```

然后，你可以通过以下步骤安装特定的 skill：

1. 输入并选择 `/plugin browse` (或者在菜单中选择 Browse and install plugins)
2. 选择 `open-source-skills`
3. 选择你需要的 skill (例如 `open-source-license`、`open-source-analysis` 等)
4. 选择 **Install now**

或者，你也可以直接通过以下命令安装特定的 Plugin：

```bash
/plugin install open-source-license@open-source-skills
/plugin install open-source-analysis@open-source-skills
/plugin install openrank-metrics@open-source-skills
/plugin install git-helper@open-source-skills
/plugin install pr-description@open-source-skills
/plugin install release-notes@open-source-skills
/plugin install issue-triage@open-source-skills
/plugin install dockerfile-optimizer@open-source-skills
/plugin install contributor-guide-writer@open-source-skills
/plugin install rfc-writer@open-source-skills
/plugin install cli-help-writer@open-source-skills
/plugin install prompt-reviewer@open-source-skills
/plugin install readme-grader@open-source-skills
```

### 安装单个 skill (npx)

如果仓库已经发布到 skills.sh 生态，优先推荐直接安装整个 skills 仓库：

```bash
npx skills add sunny0826/open-source-skills --skill open-source-license
```

如果你只想手动安装 `open-source-license`，把下面目录复制到你的 skills 目录即可：

```text
skills/open-source-license/
```

常见安装位置：

- 项目级：`.claude/skills/open-source-license/`
- 全局：`~/.claude/skills/open-source-license/`
- 其他支持 skills 的 Agent：复制到对应 Agent 的 skills 目录

### 本地仓库安装

如果你已经在仓库根目录：

```bash
mkdir -p ~/.claude/skills
cp -R skills/open-source-license ~/.claude/skills/
```

如果你想安装到当前项目：

```bash
mkdir -p .claude/skills
cp -R skills/open-source-license .claude/skills/
```

## Usage

安装完成后，skill 通常会根据你的提问自动触发。

以 `open-source-license` 为例，可以直接这样提问：

```text
我应该给这个 SDK 选 MIT 还是 Apache-2.0？
```

```text
我想使用木兰宽松许可证第 2 版，请帮我准备 LICENSE 和源文件头。
```

以 `open-source-analysis` 为例，可以直接这样提问：

```text
https://github.com/vuejs/core
```

```text
Analyze https://github.com/actionbook/actionbook
```

以 `openrank-metrics` 为例，可以直接这样提问：

```text
查询一下 X-lab2017/open-digger 的最新 OpenRank 数据和近期趋势
```

```text
请用表格的形式展示 https://github.com/vuejs/core 在 2024 年度的全部指标数据全貌
```

以 `git-helper` 为例，可以直接这样提问：

```text
我不小心 git reset --hard 删除了我刚写的一大堆代码，还能救回来吗？
```

```text
How do I squash my last 3 commits into one before making a pull request?
```

以 `pr-description` 为例，可以直接这样提问：

```text
为这个 PR 生成一份中文描述：https://github.com/vuejs/core/pull/10101
```

```text
帮我根据这个 diff 生成一份中文的 PR 描述：
--- a/src/auth.js
+++ b/src/auth.js
@@ -1,5 +1,5 @@
-function login(user, pass) {
+function login(user, pass, token) {
-  return user === 'admin' && pass === '1234';
+  return (user === 'admin' && pass === '1234') || validateToken(token);
 }
```

以 `release-notes` 为例，可以直接这样提问：

```text
帮我根据以下 commit 记录生成一份中文的发版说明：
feat(auth): 新增企业微信登录
fix(db): 修复并发导致的数据死锁
chore: 更新 README.md
BREAKING CHANGE: 移除 v1 版本的 API 接口
```

以 `issue-triage` 为例，可以直接这样提问：

```text
看看这个用户报的 Bug 怎么回复：
标题：APP 闪退了！
内容：我今天点开登录按钮，就直接崩溃了，没有任何报错。快修！
```

```text
帮我分诊一下这个 Issue：https://github.com/vuejs/core/issues/11252
```

以 `dockerfile-optimizer` 为例，可以直接这样提问：

```text
帮我看看这个 Dockerfile 怎么优化，感觉体积太大了：
FROM node:18
COPY . .
RUN npm install
CMD ["npm", "start"]
```

以 `contributor-guide-writer` 为例，可以直接这样提问：

```text
帮我为当前项目写一份 CONTRIBUTING.md
```

以 `rfc-writer` 为例，可以直接这样提问：

```text
写一个 RFC：我们现在的发验证码接口太容易被刷了，我打算加一个 Redis 限流，同一个 IP 1分钟只能发1次
```

以 `cli-help-writer` 为例，可以直接这样提问：

```text
帮我写个命令行工具的 help 文本，工具叫 my-uploader，用来传文件。有 --file (必须), --server (可选，默认 127.0.0.1), --verbose (打印日志)
```

以 `prompt-reviewer` 为例，可以直接这样提问：

```text
帮我审查一下这个 Prompt：“写一篇关于中国历史的文章。”
```

以 `readme-grader` 为例，可以直接这样提问：

```text
请给 https://github.com/vuejs/core 的 README 打个分并给出具体改进建议。
```

## Repository Structure

```text
open-source-skills/
├── skills/
│   ├── open-source-license/
│   │   ├── SKILL.md
│   │   ├── README.md
│   │   ├── evals/
│   │   │   └── evals.json
│   │   └── references/
│   ├── issue-triage/
│   │   ├── SKILL.md
│   │   ├── README.md
│   │   └── evals/
│   │       └── evals.json
│   ├── open-source-analysis/
│   │   ├── SKILL.md
│   │   ├── README.md
│   │   └── evals/
│   │       └── evals.json
│   ├── openrank-metrics/
│   │   ├── SKILL.md
│   │   ├── README.md
│   │   └── evals/
│   │       └── evals.json
│   ├── rfc-writer/
│   │   ├── SKILL.md
│   │   ├── README.md
│   │   └── evals/
│   │       └── evals.json
│   ├── cli-help-writer/
│   │   ├── SKILL.md
│   │   ├── README.md
│   │   └── evals/
│   │       └── evals.json
│   ├── prompt-reviewer/
│   │   ├── SKILL.md
│   │   ├── README.md
│   │   └── evals/
│   │       └── evals.json
│   ├── readme-grader/
│   │   ├── SKILL.md
│   │   ├── README.md
│   │   └── evals/
│   │       └── evals.json
│   ├── contributor-guide-writer/
│   │   ├── SKILL.md
│   │   ├── README.md
│   │   └── evals/
│   │       └── evals.json
│   ├── dockerfile-optimizer/
│   │   ├── SKILL.md
│   │   ├── README.md
│   │   └── evals/
│   │       └── evals.json
│   ├── git-helper/
│   │   ├── SKILL.md
│   │   ├── README.md
│   │   └── evals/
│   │       └── evals.json
│   └── pr-description/
│       ├── SKILL.md
│   │   ├── README.md
│   │   └── evals/
│   │       └── evals.json
│   └── release-notes/
│       ├── SKILL.md
│   │   ├── README.md
│   │   └── evals/
│   │       └── evals.json
└── skills-lock.json
```

## Add New Skills

建议新增 skill 时遵循以下结构：

```text
skills/
└── your-skill-name/
    ├── SKILL.md
    ├── README.md
    ├── evals/
    │   └── evals.json
    └── references/
```

建议每个 skill 至少包含：

- `SKILL.md`：skill 本体
- `README.md`：安装与使用说明
- `references/`：配套参考资料
- `evals/evals.json`：评测样例
