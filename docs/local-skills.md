# 项目本地 Skill 维护

发布源码只有 `skills/<name>/` 一份。`.agents/skills`、`.claude/skills`、
`.trae/skills` 的 14 个发布入口分别链接到这份源码，共 42 个入口。
这些目录本身被 Git 忽略；新克隆不会自动获得入口。

## 创建或迁移入口

先核对现有复制安装的本地修订，再预览迁移：

```sh
mise exec -- python scripts/sync_local_skills.py
```

确认预览范围后，使用一个尚不存在的备份目录执行。工具把旧入口移入备份，
创建相对链接，并备份 `skills-lock.json` 后移除其中本项目发布 Skill 的记录。
其他来源的条目不受该脚本影响；再次运行时已正确链接的入口不变。

```sh
mise exec -- python scripts/sync_local_skills.py --apply \
  --backup-dir /absolute/path/to/new-backup
mise run skills:check-local
```

这是项目开发入口，维护者是本仓库；不要再使用远端 `npx skills update`
覆盖这些同名入口。本项目未登记到 Skill Control 的部署 profile，未更改
任何全局 Skill、插件缓存或全局 profile。宿主可能缓存旧元信息，实际发现
新名称和描述需要重新加载或新建会话。

## 2026-09-21 的辅助 Skill 补丁

辅助 Skill 不进入 marketplace，也不随本仓库发布。原始第三方资产、许可证、
脚本及引用保留；本次本地差异存于 [patches/local-skills](../patches/local-skills/)。

| 本地 Skill            | 修复                                                                            | 本地范围                           |
| --------------------- | ------------------------------------------------------------------------------- | ---------------------------------- |
| hue                   | 简短入口、按任务读取长流程；小改动不生成整套预览；字体支持本地和 CJK            | 三个项目根                         |
| impeccable            | 明确 UI 意图；缺 PRODUCT.md 不阻断局部任务；使用实际 Skill 根路径；已有设计优先 | 三个项目根                         |
| repo-skill-scaffolder | 原 skill-creator 改名，专注脚手架/按需打包；保留 README/evals；声明 PyYAML 依赖 | .agents、.trae                     |
| linear-design         | 保持显式触发与实验状态；Google Fonts 可选，补 CJK、离线及连续字重支持           | skills/linear-design，未安装为入口 |

本机 hue、impeccable、skill-creator 的旧上游锁记录已随完整备份保存，并从
活动锁文件移出，避免下次自动更新抹掉本地补丁。保留来源凭证用于追溯；其存在
不代表仍由上游更新器管理。其他历史锁记录未清理。

升级辅助 Skill 时先取得上游干净副本，在临时目录对对应补丁运行
`patch --dry-run -p1 -d <skill-directory> < <patch-file>`，人工解决冲突后验证再替换。
scaffolder 补丁相对原 skill-creator 目录应用，完成后目录名与 frontmatter
统一为 repo-skill-scaffolder。不要把本地补丁直接写回第三方全局来源。

## 备份与恢复

本次完整快照保存三个项目根、linear-design、锁文件和 SHA-256 清单：

```text
~/.local/share/agent-skills/project-backups/open-source-skills-20260921-204119/
```

另有核心入口迁移备份：

```text
~/.local/share/agent-skills/project-backups/open-source-skills-core-links-20260921-2044/
```

恢复单项时先另存当前改动，检查当前入口确为符号链接后只解除该链接，再从完整
快照复制原目录。不要跟随链接删除 `skills/` 源文件。恢复旧 creator 名称前，先保留
当前 repo-skill-scaffolder 目录；恢复锁文件也应对照其他工具后续写入，避免整体覆盖。
