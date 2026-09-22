# Open Source Skills

面向开源维护的 14 个独立 Skill：从 Git、Issue、PR、发版，到文档、指标与许可证。
Skill 按用户意图触发；输入事实、推定方案和实际验证结果分开呈现。

## 安装

```sh
npx skills add sunny0826/open-source-skills
# 或仅安装需要的一项
npx skills add sunny0826/open-source-skills --skill openrank
```

Claude Code 用户先注册 marketplace，再安装单个 Skill：

```text
/plugin marketplace add sunny0826/open-source-skills
/plugin install openrank@open-source-skills
```

也可以把完整 `skills/<name>/` 复制到对应 Agent 的技能目录。保留其
references、scripts 和相对资源；不同 Skill 不依赖仓库外的共享运行库。
OpenRank 可选解析脚本需要 Python 3.11+；其他 Skill 的正文无统一运行时依赖。

## Skills

| Skill                      | 使用说明                                                              |
| -------------------------- | --------------------------------------------------------------------- |
| `cli-help-writer`          | [cli-help-writer](skills/cli-help-writer/README.md)                   |
| `contributor-guide-writer` | [contributor-guide-writer](skills/contributor-guide-writer/README.md) |
| `dockerfile-optimizer`     | [dockerfile-optimizer](skills/dockerfile-optimizer/README.md)         |
| `git-helper`               | [git-helper](skills/git-helper/README.md)                             |
| `issue-triage`             | [issue-triage](skills/issue-triage/README.md)                         |
| `open-source-analysis`     | [open-source-analysis](skills/open-source-analysis/README.md)         |
| `open-source-license`      | [open-source-license](skills/open-source-license/README.md)           |
| `openrank`                 | [openrank](skills/openrank/README.md)                                 |
| `pr-description`           | [pr-description](skills/pr-description/README.md)                     |
| `prompt-reviewer`          | [prompt-reviewer](skills/prompt-reviewer/README.md)                   |
| `readme-grader`            | [readme-grader](skills/readme-grader/README.md)                       |
| `release-notes`            | [release-notes](skills/release-notes/README.md)                       |
| `rfc-writer`               | [rfc-writer](skills/rfc-writer/README.md)                             |
| `skill-architect`          | [skill-architect](skills/skill-architect/README.md)                   |

## 使用示例

- “根据当前分支 diff 写 PR 描述，测试尚未运行。” → `pr-description`
- “查询 OpenDigger 的 issue_response_time，2025Q4。” → `openrank`
- “审查当前 README，给出最重要的三项改进。” → `readme-grader`
- “把我们的发版检查流程做成 Skill。” → `skill-architect`

提供 GitHub URL 不会自动覆盖任务意图：修 Bug、分诊 Issue、写 PR 描述与
评估仓库健康是不同任务。生成文案也不等于授权发布或发送。

## 开发与验证

运行时由 [mise.toml](mise.toml) 固定；先安装 mise，再执行：

```sh
mise install
mise run check
# 网站检查（先安装网站依赖）
mise exec -- pnpm --dir website install --frozen-lockfile
mise run website:build
```

`mise run check` 校验分发路径、Skill 引用、评测格式并运行解析器/运行器回归。
这些检查不代表模型正确选择或执行了 Skill。
模型请求准备、运行器接口与逐条评审方式见 [评测指南](docs/evaluation.md)。

新增 Skill 时包含 SKILL.md、README.md 和 evals/evals.json；有实际需要时才增加
references、scripts 或 assets。补充 marketplace 和网站目录，并添加触发正例、
近似反例、事实缺失/工具失败和领域关键失败用例。

## 项目内加载与维护

`skills/` 是发布源码；本仓库开发时，各 Agent 项目入口应链接至这份源码。
修改正文后无需再维护多份副本；宿主已有会话可能仍需重新加载或新建会话。

```sh
mise run skills:check-local
```

该命令只读检查已有 `.agents`、`.claude`、`.trae` 项目入口，不修改全局技能。
已有复制安装迁移前需核对本地修订并保存备份；不要把 npx/Skill Control 与
项目开发链接交给多个管理者同时维护。第三方辅助 Skill 和实验设计语言不在
发布清单中；其本地补丁与恢复说明见 [本地开发记录](docs/local-skills.md)。

架构边界见 [Skill 契约](docs/skill-contract.md) 和
[ADR 0001](docs/adr/0001-skill-quality.md)。
