# ADR 0001: One source and evidence-based Skill delivery

Status: accepted for this repair, 2026-09-21.

## Decision

`skills/` is the source of published instructions. The marketplace enumerates
published skills explicitly. Local development entries resolve to these sources
after reviewed backups; third-party skills remain owned separately.

This supersedes the implicit copy-and-edit workflow, unconditional output
templates, and the two incompatible evaluation formats. There is no earlier
numbered ADR. Existing independent Skill installation and bilingual output remain.

Use Python standard-library helpers for OpenDigger parsing, catalog validation,
and evaluation orchestration. Pin development tools with mise. Instructions
separate evidence, assumptions, tool failures, and externally authorized actions.

## Alternatives and risks

- Continuing manual copies preserves drift and hides fixes from the agent.
- A shared runtime library across distributed Skills would break single-Skill
  installation. Keep the OpenRank helper inside that Skill.
- A hard-coded trigger classifier would test itself rather than model discovery.
  Store positive and negative prompts and grade actual model observations.
- Static checks cannot prove agent behavior. Report static, deterministic, live
  data, and model checks separately; missing model results are not passes.

## Acceptance

All 14 entries resolve, referenced resources and fixtures exist, evaluations use
one schema, the metrics helper passes shape/error tests, and the project loading
roots match their declared source. No third-party cache or global installation is
silently overwritten.
