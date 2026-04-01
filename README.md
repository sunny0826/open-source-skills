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
│   ├── open-source-analysis/
│   │   ├── SKILL.md
│   │   ├── README.md
│   │   └── evals/
│   │       └── evals.json
│   └── openrank-metrics/
│       ├── SKILL.md
│       ├── README.md
│       └── evals/
│           └── evals.json
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
