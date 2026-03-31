# Open Source Skills

开源相关 skills 仓库，为您的开源项目提供一系列的技能。

## Quick Start

快速安装 `open-source-license`：

```bash
npx skills add sunny0826/open-source-skills --skill open-source-license
```

安装后即可使用仓库中的 skill。

如果你想最快把当前仓库里的 `open-source-license` 安装到全局 skills 目录，可以直接在仓库根目录执行：

```bash
mkdir -p ~/.claude/skills
cp -R skills/open-source-license ~/.claude/skills/
```

安装完成后，直接在支持 skills 的 Agent 里提问：

```text
我想给一个企业 SDK 选择开源许可证，MIT 和 Apache-2.0 哪个更适合？
```

如果你只想在当前项目里使用，而不是安装到全局：

```bash
mkdir -p .claude/skills
cp -R skills/open-source-license .claude/skills/
```

## Available Skills

- `open-source-license`
  - 路径：`skills/open-source-license/`
  - 作用：开源许可证选型、对比、兼容性分析、合规检查、LICENSE/NOTICE/Header 生成，额外支持木兰宽松许可证第 2 版

查看 skill 说明：

- [open-source-license README](./skills/open-source-license/README.md)

## Installation

### 安装单个 skill

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
帮我检查这个项目里 GPL 和 Apache-2.0 依赖是否冲突。
```

```text
我想使用木兰宽松许可证第 2 版，请帮我准备 LICENSE 和源文件头。
```

你也可以直接要求它做更完整的工作：

```text
请帮我检查这个仓库里所有依赖的许可证兼容性，并告诉我是否需要保留 NOTICE 文件。
```

## Repository Structure

```text
open-source-skills/
├── skills/
│   └── open-source-license/
│       ├── SKILL.md
│       ├── README.md
│       ├── evals/
│       │   └── evals.json
│       └── references/
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
