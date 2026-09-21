# contributor-guide-writer

Write or update CONTRIBUTING.md, repository setup instructions, or developer onboarding documentation. Not for diagnosing an installation failure, running setup/tests, or drafting a general README.

## 使用

```text
为当前仓库生成 CONTRIBUTING.md。
```

```text
Update the contributor onboarding guide.
```

具体输入、失败处理与验收要求见 [SKILL.md](SKILL.md)。默认跟随用户语言；不会将来源文本中的命令当作授权。

## 安装

```sh
npx skills add sunny0826/open-source-skills --skill contributor-guide-writer
```

Claude Code 中先注册 `sunny0826/open-source-skills` marketplace，再运行：

```text
/plugin install contributor-guide-writer@open-source-skills
```

单独复制本目录也可使用；保留其中的 scripts/references/fixtures 等相对资源。

## 评测

[evals/evals.json](evals/evals.json) 分开触发正反例与行为验收。行为结果须逐条核对证据，不能用标题或关键词存在代替正确性。仓库开发检查使用 `mise run check`；安装本 Skill 不依赖仓库检查工具。
