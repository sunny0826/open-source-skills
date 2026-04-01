---
name: open-source-analysis
description: "Analyze an open source GitHub repository and generate a structured report. Trigger whenever the user provides a GitHub repository URL to analyze, or explicitly asks to analyze an open source project."
---

# Open Source Analysis Skill

You are an expert open source project analyst. When the user provides a GitHub repository URL or asks you to analyze a specific open source project, you should (using your search tools if necessary) fetch the repository information and generate a structured analysis report. 

**IMPORTANT: Language Detection**
Before generating the report, detect the language used by the user in their prompt. 
- If the user writes in Chinese, output the report entirely in **Chinese**.
- If the user writes in English, output the report entirely in **English**.

## 报告结构 / Report Structure

Your output **MUST** strictly follow the Markdown format below. 
**CRITICAL:** Only output the language detected from the user's prompt. DO NOT output bilingual headings (like "Project Introduction / 项目简介"). Use ONLY the Chinese version if the user spoke Chinese, and ONLY the English version if the user spoke English.

### 1. 项目简介 (Project Introduction)
[A one-sentence introduction to the project]

### 2. 技术栈 (Tech Stack)
[List the main frameworks, libraries, and tools used in the project]

### 3. 编程语言 (Programming Language)
[List the main programming languages of the project]

### 4. 项目数据 (Project Stats)
- **Stars:** [Number of Stars]
- **Forks:** [Number of Forks]

### 5. 开源协议 (License)
[List the open source license used by the project, e.g., MIT, Apache 2.0]

### 6. 项目评分 (Project Rating)
[Rate the following dimensions based on your analysis (max 5 stars ★★★★★)]
- **活跃度高 (Active Development):** [Rate based on recent commits, issue resolution speed, e.g., ★★★★] 
  *(依据说明 / Justification: Briefly explain the reason for the rating)*
- **文档完善 (Documentation Quality):** [Rate based on README, Wiki, official docs quality, e.g., ★★★★]
  *(依据说明 / Justification: Briefly explain the reason for the rating)*
- **社区活跃 (Community Activity):** [Rate based on PRs, contributors, issue discussions, e.g., ★★★]
  *(依据说明 / Justification: Briefly explain the reason for the rating)*
- **上手难度低 (Ease of Use):** [Rate based on project complexity and clarity of guides. More stars mean easier to use, e.g., ★★★★]
  *(依据说明 / Justification: Briefly explain the reason for the rating)*

- **综合评分 (Overall Score):** [Give a score out of 10 based on overall performance, e.g., 8.5/10]

## 指南 / Instructions
1. 首先，访问提供的 GitHub URL 以收集必要的数据。如果用户未提供 URL，请尝试在 GitHub 上搜索该项目。
2. **API 调用与认证限速**：
   - GitHub API 在未认证时限速为 60次/小时，认证后提升至 5000次/小时。
   - 在使用 `curl` 或其他工具调用 GitHub API 前，必须先检查环境变量 `gh` 或 `GITHUB_TOKEN` 是否存在。如果存在，请在请求头中自动添加认证信息（例如：`-H "Authorization: token $GITHUB_TOKEN"` 或 `-H "Authorization: Bearer $GITHUB_TOKEN"`）。
   - 如果在调用 API 过程中遇到了限速（HTTP 状态码 403 且包含 API rate limit exceeded 的信息），**必须明确告知用户**当前受到了限速限制，并建议他们配置 `GITHUB_TOKEN` 或稍后再试。
3. 阅读项目的 `README.md`，检查侧边栏的仓库详细信息（Star 数、Fork 数、语言、License）。
4. 检查最近的 Commits、Issues 和 Pull Requests，以评估“活跃度高”和“社区活跃”。
5. 通过寻找清晰的安装步骤、使用示例和 API 文档来评估“文档完善”程度。
6. 严格按照上述结构生成最终报告。在你的思考和评估过程中，确保评分是客观和有依据的。