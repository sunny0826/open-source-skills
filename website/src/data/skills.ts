import {
  FileText,
  ShieldCheck,
  Activity,
  GitBranch,
  GitMerge,
  FileSignature,
  AlertCircle,
  Box,
  BookOpen,
  Terminal,
  CheckSquare,
  DraftingCompass,
} from "lucide-react";

export interface Skill {
  id: string;
  name: string;
  description: {
    en: string;
    zh: string;
  };
  category: string;
  icon: any;
}

export const skills: Skill[] = [
  {
    id: "open-source-license",
    name: "open-source-license",
    description: {
      en: "Open source license selection, comparison, compatibility analysis, compliance checks, and LICENSE/NOTICE/Header generation.",
      zh: "开源许可证选型、对比、兼容性分析、合规检查、LICENSE/NOTICE/Header 生成。",
    },
    category: "legal",
    icon: ShieldCheck,
  },
  {
    id: "open-source-analysis",
    name: "open-source-analysis",
    description: {
      en: "Evaluate project adoption, maintenance, documentation and community using dated source evidence.",
      zh: "基于注明日期的证据评估项目选型、维护、文档和社区状况。",
    },
    category: "developer_tools",
    icon: Activity,
  },
  {
    id: "openrank",
    name: "openrank",
    description: {
      en: "Read flat and nested OpenDigger metric series with explicit periods, units and failure states.",
      zh: "读取 OpenDigger 平铺或嵌套指标，明确周期、单位与数据缺失或请求失败状态。",
    },
    category: "developer_tools",
    icon: Activity,
  },
  {
    id: "git-helper",
    name: "git-helper",
    description: {
      en: "Comprehensive Git command assistant and workflow guide. Supports translating intent into specific commands and provides safety warnings for destructive operations.",
      zh: "详尽的 Git 命令助手与工作流指南。支持按需翻译意图为具体命令，并针对破坏性操作提供安全警告。",
    },
    category: "developer_tools",
    icon: GitBranch,
  },
  {
    id: "pr-description",
    name: "pr-description",
    description: {
      en: "Draft or update PR titles and descriptions from verified diffs, preserving existing authorization and separating actual test evidence from suggestions.",
      zh: "从真实 Diff 起草或更新 PR 标题与描述，沿用已有授权并区分已验证结果与测试建议。",
    },
    category: "developer_tools",
    icon: GitMerge,
  },
  {
    id: "release-notes",
    name: "release-notes",
    description: {
      en: "Write release notes from commits, PRs, tags or release URLs, with prominent breaking changes and evidence-backed upgrade guidance.",
      zh: "根据提交、PR、标签或 Release URL 编写发版说明，突出破坏性变更与有依据的升级指导。",
    },
    category: "developer_tools",
    icon: FileSignature,
  },
  {
    id: "issue-triage",
    name: "issue-triage",
    description: {
      en: "Triage issue reports or URLs, separate reported and reproduced behavior, and draft evidence-based maintainer replies.",
      zh: "分诊 Issue 文本或链接，区分报告内容与复现结果，依据证据起草维护者回复。",
    },
    category: "developer_tools",
    icon: AlertCircle,
  },
  {
    id: "dockerfile-optimizer",
    name: "dockerfile-optimizer",
    description: {
      en: "Review and refactor bloated, slow Dockerfiles. Provide best practice recommendations for multi-stage builds, layer caching optimization, and unused package cleanup.",
      zh: "审查并重构臃肿、缓慢的 Dockerfile。提供多阶段构建、层缓存优化、无用包清理等最佳实践建议。",
    },
    category: "developer_tools",
    icon: Box,
  },
  {
    id: "contributor-guide-writer",
    name: "contributor-guide-writer",
    description: {
      en: "Write contributor guides and repository setup documentation from verified toolchain, script and policy evidence.",
      zh: "依据实际工具链、脚本和项目约定编写贡献指南与开发环境文档。",
    },
    category: "developer_tools",
    icon: BookOpen,
  },
  {
    id: "rfc-writer",
    name: "rfc-writer",
    description: {
      en: "Draft or review technical proposals with explicit evidence, assumptions, alternatives and measurable validation criteria.",
      zh: "起草或审查技术提案，明确事实、假设、备选方案与可验证的验收标准。",
    },
    category: "developer_tools",
    icon: FileText,
  },
  {
    id: "cli-help-writer",
    name: "cli-help-writer",
    description: {
      en: "Write CLI help or man pages from the actual command specification; proposed flags and defaults remain explicit design suggestions.",
      zh: "按真实命令规格编写 help 或 man page，新增参数与默认值明确标为设计建议。",
    },
    category: "developer_tools",
    icon: Terminal,
  },
  {
    id: "prompt-reviewer",
    name: "prompt-reviewer",
    description: {
      en: "Review Prompts to identify ambiguities, missing constraints, and potential hallucination risks, providing improvement suggestions and optimized Prompts.",
      zh: "审查 Prompt，找出歧义、遗漏约束、潜在幻觉风险，并提供改进建议与优化后的 Prompt。",
    },
    category: "developer_tools",
    icon: CheckSquare,
  },
  {
    id: "skill-architect",
    name: "skill-architect",
    description: {
      en: "Design, review, and iterate AI Agent Skills by turning Claude Code Skills practices into maintainable SKILL.md files, references, evals, rollout plans, and measurement strategies.",
      zh: "设计、审查和迭代 AI Agent Skill，将 Claude Code Skills 实践转成可维护的 SKILL.md、references、evals、分发计划和度量策略。",
    },
    category: "developer_tools",
    icon: DraftingCompass,
  },
  {
    id: "readme-grader",
    name: "readme-grader",
    description: {
      en: "Evaluate open source project README texts, score them across 5 dimensions (overview, installation, usage, contributing, etc.), and provide specific improvement suggestions.",
      zh: "评估开源项目 README 文本，从简介、安装、使用、贡献等 5 个维度打分并提供具体的改进建议。",
    },
    category: "developer_tools",
    icon: CheckSquare,
  },
];
