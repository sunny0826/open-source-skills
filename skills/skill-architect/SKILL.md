---
name: skill-architect
description: "Design, review or improve an AI agent Skill, or turn a repeatable workflow into a SKILL.md package. Not for executing the underlying workflow or generating a visual design language."
---

# Skill Architect

Use the requested language. Identify the repeated task, expected artifact and
concrete positive/near-miss prompts. When auditing, lead with actionable findings
ordered by impact rather than generating a new Skill automatically.

## Design and revise

- Scope one job and express its intent/object in the description. Add an exclusion
  when it separates a likely neighboring task; avoid exhaustive keyword lists.
- Keep workflow decisions, evidence requirements, failure handling and essential
  constraints in SKILL.md. Do not repeat generic model capabilities or policies.
- Move substantial conditional examples into references with explicit read conditions.
  Small Skills need no extra directories. Keep standalone installation functional.
- Add scripts only for genuinely reusable deterministic logic; run them against
  representative inputs. Store copyable output templates in assets when useful.
- Include real, testable failure modes; omit unknown gotchas rather than adding
  empty placeholders. Resolve conflicting old guidance, not just append a caveat.
- Follow the target repository's packaging and README/evaluation conventions.
  Do not force .skill archives or remove READMEs in a Git/plugin-distributed repo.
- Separate drafting, read-only tools and externally mutating operations. Preserve
  explicit user authorization without redundant approval loops.

## Validate

Check frontmatter, resource paths and a standalone installation. Test trigger
positives and near-miss negatives separately from output quality. Behavior cases
need raw artifacts, observable rubrics and tool-call evidence when actions matter.
Static lint is not a model pass. Compare a meaningful baseline when optimizing.
Report host/model/version and limitations; do not invent invocation statistics.

For this repository use `evals/evals.json` and the repository validation commands.
The Skill remains useful without those development tools when installed alone.
A generic skill-creator may scaffold files; this Skill owns workflow/routing review.
Use hue only for creating an explicitly requested design language, not general
Skill architecture. None of those optional helpers is a required dependency.

Read [references/lessons-from-claude-code-skills.md](references/lessons-from-claude-code-skills.md)
only for deeper category, distribution, composition and measurement rationale.
