import { FileText, ShieldCheck, Activity, GitBranch, GitMerge, FileSignature, AlertCircle, Box, BookOpen, Terminal, CheckSquare } from 'lucide-react';

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
    id: 'open-source-license',
    name: 'open-source-license',
    description: {
      en: 'Open source license selection, comparison, compatibility analysis, compliance checks, and LICENSE/NOTICE/Header generation.',
      zh: '开源许可证选型、对比、兼容性分析、合规检查、LICENSE/NOTICE/Header 生成。'
    },
    category: 'legal',
    icon: ShieldCheck
  },
  {
    id: 'open-source-analysis',
    name: 'open-source-analysis',
    description: {
      en: 'Analyze GitHub open source projects and generate structured analysis reports including tech stack, data, activity scores, and multi-dimensional evaluations.',
      zh: '分析 GitHub 开源项目并生成包含技术栈、数据、活跃度评分及多维度评价的结构化分析报告。'
    },
    category: 'developer_tools',
    icon: Activity
  },
  {
    id: 'openrank-metrics',
    name: 'openrank-metrics',
    description: {
      en: 'Query OpenRank values, activity, and other statistical metrics for GitHub/Gitee open source projects or developers based on OpenDigger data.',
      zh: '基于 OpenDigger 数据源，查询 GitHub/Gitee 开源项目或开发者的 OpenRank 值、活跃度等各项统计指标。'
    },
    category: 'developer_tools',
    icon: Activity
  },
  {
    id: 'git-helper',
    name: 'git-helper',
    description: {
      en: 'Comprehensive Git command assistant and workflow guide. Supports translating intent into specific commands and provides safety warnings for destructive operations.',
      zh: '详尽的 Git 命令助手与工作流指南。支持按需翻译意图为具体命令，并针对破坏性操作提供安全警告。'
    },
    category: 'developer_tools',
    icon: GitBranch
  },
  {
    id: 'pr-description',
    name: 'pr-description',
    description: {
      en: 'Automatically generate standardized Pull Request (PR) Descriptions with checkboxes based on Git diff content or text descriptions.',
      zh: '自动根据 Git diff 纯文本内容或文字描述，生成规范的、包含复选框的 Pull Request (PR) Description。'
    },
    category: 'developer_tools',
    icon: GitMerge
  },
  {
    id: 'release-notes',
    name: 'release-notes',
    description: {
      en: 'Extract and generate structured release notes from commit history text, automatically categorizing Breaking Changes / Features / Fixes.',
      zh: '从 commit 记录纯文本中提取并生成结构化的发版说明，自动进行 Breaking Change / Feature / Fix 分类。'
    },
    category: 'developer_tools',
    icon: FileSignature
  },
  {
    id: 'issue-triage',
    name: 'issue-triage',
    description: {
      en: 'Analyze GitHub Issue content to automatically assess priority, check for missing information, and generate polite, professional response templates.',
      zh: '分析 GitHub Issue 文本内容，自动评估优先级、检查缺失信息并生成礼貌的专业回复模板。'
    },
    category: 'developer_tools',
    icon: AlertCircle
  },
  {
    id: 'dockerfile-optimizer',
    name: 'dockerfile-optimizer',
    description: {
      en: 'Review and refactor bloated, slow Dockerfiles. Provide best practice recommendations for multi-stage builds, layer caching optimization, and unused package cleanup.',
      zh: '审查并重构臃肿、缓慢的 Dockerfile。提供多阶段构建、层缓存优化、无用包清理等最佳实践建议。'
    },
    category: 'developer_tools',
    icon: Box
  },
  {
    id: 'contributor-guide-writer',
    name: 'contributor-guide-writer',
    description: {
      en: 'Automatically analyze the current project structure and build tools to generate a tailored and professional open source CONTRIBUTING.md guide.',
      zh: '自动分析当前项目结构和构建工具，生成量身定制且专业的开源 CONTRIBUTING.md 贡献指南。'
    },
    category: 'developer_tools',
    icon: BookOpen
  },
  {
    id: 'rfc-writer',
    name: 'rfc-writer',
    description: {
      en: 'Expand vague technical ideas into standard, professional RFC (Request for Comments) documents, automatically filling in background, pros/cons, and alternative considerations.',
      zh: '将模糊的技术想法扩写为标准的、专业的 RFC（技术提案）文档，自动补全背景、优缺点及替代方案考量。'
    },
    category: 'developer_tools',
    icon: FileText
  },
  {
    id: 'cli-help-writer',
    name: 'cli-help-writer',
    description: {
      en: 'Convert scattered command-line arguments and descriptions into beautifully formatted, POSIX-compliant terminal --help text or Man Pages.',
      zh: '将零散的命令行参数与说明转化为排版精美、符合 POSIX 标准的终端 --help 文案或 Man Page。'
    },
    category: 'developer_tools',
    icon: Terminal
  },
  {
    id: 'prompt-reviewer',
    name: 'prompt-reviewer',
    description: {
      en: 'Review Prompts to identify ambiguities, missing constraints, and potential hallucination risks, providing improvement suggestions and optimized Prompts.',
      zh: '审查 Prompt，找出歧义、遗漏约束、潜在幻觉风险，并提供改进建议与优化后的 Prompt。'
    },
    category: 'developer_tools',
    icon: CheckSquare
  },
  {
    id: 'readme-grader',
    name: 'readme-grader',
    description: {
      en: 'Evaluate open source project README texts, score them across 5 dimensions (overview, installation, usage, contributing, etc.), and provide specific improvement suggestions.',
      zh: '评估开源项目 README 文本，从简介、安装、使用、贡献等 5 个维度打分并提供具体的改进建议。'
    },
    category: 'developer_tools',
    icon: CheckSquare
  }
];
