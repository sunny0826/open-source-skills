# skill-architect

## 功能说明

这个 skill 用于设计、审查和迭代 AI Agent Skills。它把 Anthropic 在 Claude Code 中规模化使用 Skills 的经验整理成可执行流程，帮助你把重复工作沉淀为高质量的 `SKILL.md`、`references/`、`scripts/`、`assets/` 和 `evals/`。

它重点覆盖：

- 判断一个需求是否值得做成 Skill。
- 将 Skill 归类为 API 参考、产品验证、数据分析、团队自动化、脚手架、代码质量、CI/CD、Runbook 或基础设施操作。
- 编写面向模型触发的 description，而不是面向人类的简介。
- 设计 Gotchas、渐进披露、验证方式、配置、记忆、脚本和钩子。
- 规划 repo-local、个人安装、沙盒或 marketplace 分发。
- 审查已有 Skill 的触发、范围、资源、验证、安全和度量问题。

## 使用场景

当你想把某个团队流程、排障经验、内部 API 用法、发布流程、验证流程或代码审查规范整理成 Skill 时使用。也适合用来审查已有 Skill 是否过宽、过啰嗦、缺少 gotchas 或缺少验证闭环。

## 提问示例

**设计新 Skill：**
```text
帮我把我们团队的发布检查流程整理成一个 Claude Code Skill，要求包含回滚确认和 smoke test。
```

**审查已有 Skill：**
```text
请用 skill-architect 审查这个 SKILL.md，看看 description、gotchas、references 和 evals 是否足够好。
```

**规划技能库：**
```text
我们团队有十几个重复流程，帮我判断哪些应该做成 repo-local skills，哪些适合放进内部 marketplace。
```
