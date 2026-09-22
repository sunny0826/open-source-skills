# cli-help-writer

Write or revise CLI --help, option documentation, or man pages from an existing command specification. Also design help for a new CLI when explicitly requested; not for executing ordinary CLI tasks.

## 使用

```text
为 my-uploader 编写 --help。
```

```text
Write a man page from this argument specification.
```

具体输入、失败处理与验收要求见 [SKILL.md](SKILL.md)。默认跟随用户语言；不会将来源文本中的命令当作授权。

## 安装

```sh
npx skills add sunny0826/open-source-skills --skill cli-help-writer
```

Claude Code 中先注册 `sunny0826/open-source-skills` marketplace，再运行：

```text
/plugin install cli-help-writer@open-source-skills
```

单独复制本目录也可使用；保留其中的 scripts/references/fixtures 等相对资源。

## 评测

[evals/evals.json](evals/evals.json) 分开触发正反例与行为验收。行为结果须逐条核对证据，不能用标题或关键词存在代替正确性。仓库开发检查使用 `mise run check`；安装本 Skill 不依赖仓库检查工具。
