---
name: skill-architect
description: "Use when the user asks to design, create, review, improve, package, distribute, measure, or classify AI agent Skills, Claude Code Skills, Codex skills, or reusable agent workflows; convert recurring workflows, runbooks, verification steps, API usage, scaffolding, code review, CI/CD, infrastructure operations, data analysis, or team automation into a maintainable SKILL.md with gotchas, progressive disclosure, resources, evals, rollout guidance, and measurement."
---

# Skill Architect

Use this skill to turn repeatable agent work into a focused Skill, or to audit an existing Skill for trigger quality, scope, resources, validation, rollout, and maintainability.

If the user writes in Chinese, respond in Chinese. If the user writes in English, respond in English unless they ask otherwise.

## Workflow

1. State assumptions and clarify only blocking unknowns.
2. Identify the repeated agent task and the concrete prompts that should trigger the Skill.
3. Pick one primary category from the Skill Category Map. If the idea spans several categories, split it or define a narrow first version.
4. Decide the folder shape:
   - Use `SKILL.md` for trigger-critical workflow and gotchas.
   - Use `references/` for detailed docs, schemas, examples, policies, or long analysis.
   - Use `scripts/` when deterministic execution matters or the agent would otherwise rewrite the same code.
   - Use `assets/` for templates or files copied into outputs.
   - Use `evals/` when the host repo supports examples or regression checks.
5. Write the frontmatter description for model triggering, not human marketing. Include verbs, domains, file types, tools, and user phrases likely to appear in real requests.
6. Write the body as concise operational guidance. Keep obvious general knowledge out; include only what changes the agent's behavior.
7. Add a Gotchas section from known failure modes. If none are known, add a short placeholder that invites future edge cases rather than inventing fake ones.
8. Add validation guidance: tests, browser/product verification, assertions, packaging checks, or review checklists.
9. Propose rollout and measurement only when the Skill will be shared beyond one user or repo.

## Skill Category Map

Choose the closest category before writing:

| Category | Use for | Typical resources |
| --- | --- | --- |
| Library and API reference | Correct use of internal libraries, CLIs, SDKs, schemas, or brittle APIs | `references/api.md`, code snippets, gotchas |
| Product verification | Proving product behavior after code changes | Playwright/tmux scripts, assertions, videos, state checks |
| Data fetching and analysis | Querying metrics, dashboards, logs, cohorts, or monitoring systems | query helpers, dashboard IDs, schema notes |
| Business process and team automation | Repeatable team workflows such as standups, ticket creation, recaps | workflow steps, config, append-only logs |
| Code scaffolding and templates | Creating standard files, services, migrations, apps, or boilerplate | templates, generators, examples |
| Code quality and review | Enforcing review, style, testing, security, or org conventions | deterministic checks, review rubrics, hooks |
| CI/CD and deployment | Building, deploying, monitoring PRs, rollbacks, release operations | runbooks, smoke tests, rollout scripts |
| Runbooks | Investigating alerts, incidents, symptoms, or error signatures | symptom-to-tool maps, query patterns, report template |
| Infrastructure operations | Routine or risky operational maintenance | guardrails, confirmations, scripts, rollback steps |

## Design Rules

- Prefer one job per Skill. A Skill that straddles categories often undertriggers or gives the agent competing instructions.
- Make the description a trigger contract. Mention "when to use" details in frontmatter because that is what the model sees before loading the body.
- Do not restate obvious agent behavior. Add context the model would not reliably infer from the repo or general knowledge.
- Build Gotchas from real failures: wrong table versions, renamed IDs, misleading staging responses, unsafe commands, hidden setup steps, flaky checks.
- Use progressive disclosure. Keep `SKILL.md` lean and point to specific files when deeper context is needed.
- Avoid overconstraining the agent. Provide decision criteria, examples, and guardrails; let the agent adapt the implementation to the current repo.
- Plan setup explicitly. If a Skill needs org-specific configuration, tell the agent where config lives and when to ask the user.
- Add memory only when repeated runs benefit from history. Prefer append-only logs or JSON records in the Skill's stable data directory when available.
- Store scripts when reliability matters. Let the agent compose tested helpers instead of recreating fragile code each run.
- Use hooks only for scoped, high-value guardrails. Avoid always-on hooks that make normal work noisy.

## Review Checklist

Use this checklist when auditing a Skill:

- Triggering: Does the description include concrete task verbs and domain terms?
- Scope: Can the Skill be explained as one primary category?
- Signal: Does the body omit obvious advice and include non-obvious constraints?
- Gotchas: Are failure modes concrete and testable?
- Disclosure: Are long details moved to named references with clear load conditions?
- Resources: Are scripts, references, assets, and evals included only when useful?
- Validation: Does the Skill tell the agent how to prove success?
- Safety: Are destructive or production actions guarded by confirmations or hooks?
- Rollout: Is repo-local vs marketplace/plugin distribution chosen deliberately?
- Measurement: Is there a way to detect popularity, undertriggering, or repeated failure?

## Output Patterns

For a new Skill, provide:

1. Assumptions and success criteria.
2. Recommended skill name and primary category.
3. Proposed folder structure.
4. Draft `SKILL.md` frontmatter and body.
5. Any references, scripts, assets, evals, or README content that should be created.
6. Validation commands and rollout notes.

For a Skill review, lead with findings ordered by severity, then give a compact revision plan.

For a Skill library strategy, group candidates by category, flag overlaps, and recommend which Skills should be repo-local, private marketplace candidates, or experimental sandbox entries.

## Reference

Read `references/lessons-from-claude-code-skills.md` when the user asks for detailed rationale from Anthropic's "Lessons from building Claude Code: How we use skills" article, wants a Skill strategy, or needs a deeper checklist for distribution, composition, measurement, and anti-patterns.
