# Lessons From Claude Code Skills

Source: Anthropic, "Lessons from building Claude Code: How we use skills", published June 3, 2026, https://claude.com/blog/lessons-from-building-claude-code-how-we-use-skills

This reference summarizes and operationalizes the article's experience for agents designing or reviewing Skills. It paraphrases the article rather than preserving long excerpts.

## Core Thesis

Skills are a folder-level context engineering mechanism, not only Markdown instructions. A strong Skill combines a trigger description, concise workflow, non-obvious gotchas, and optional resources such as references, scripts, assets, config, memory, hooks, and evals.

The article's practical lesson is that Skills work best when they are small, focused, and shaped by real failures. Many useful Skills start as a short instruction file plus one gotcha, then become durable as the team adds edge cases, scripts, and verification routines discovered through use.

## What Makes A Skill Worth Building

Build a Skill when at least one of these is true:

- The agent repeatedly makes the same mistake because it lacks local domain knowledge.
- A workflow has a stable sequence that humans expect the agent to follow.
- Verification requires tools, product flows, credentials, dashboards, or assertions the agent will not infer.
- The task requires deterministic helper code or templates that should not be regenerated every time.
- The workflow benefits from shared team conventions, safety guardrails, or historical memory.

Do not build a Skill when a normal prompt or repo inspection is enough. A Skill has a permanent context cost through its metadata, so it must earn that cost.

## Nine Skill Categories

### 1. Library And API Reference

Use this for internal libraries, SDKs, CLIs, database tables, or APIs where the agent needs exact usage patterns and known traps.

Best resources:

- API examples and function signatures in `references/`
- Short code snippets
- "wrong vs right" examples
- Gotchas about edge cases, naming, versioning, auth, or staging behavior

Failure mode: turning the Skill into generic API documentation. Keep only the parts the agent actually gets wrong or cannot discover quickly.

### 2. Product Verification

Use this for proving a product actually works after code changes. The article emphasizes this category as one of the highest-impact areas because it directly improves output quality.

Best resources:

- Playwright or browser scripts
- tmux or TTY drivers for interactive CLIs
- Programmatic assertions after each state transition
- Video or screenshot capture when visual state matters

Failure mode: saying "test it" without defining what counts as success. A good verification Skill names observable states and assertions.

### 3. Data Fetching And Analysis

Use this for metrics, dashboards, monitoring, logs, cohorts, and business analysis.

Best resources:

- Query helpers
- Dashboard IDs
- canonical table names and join keys
- metric prefix conventions
- field-name mappings across systems

Failure mode: letting the agent guess data sources. Name the canonical systems and exact identifiers.

### 4. Business Process And Team Automation

Use this for standups, recaps, ticket creation, weekly reports, reviewer pings, or other repeatable team workflows.

Best resources:

- Workflow steps
- Required fields and enum values
- Output templates
- Config files for team-specific channels or owners
- Append-only logs to compare against prior runs

Failure mode: hiding setup requirements. If the workflow needs a channel, tracker, reviewer, or team ID, define config and ask when it is missing.

### 5. Code Scaffolding And Templates

Use this for new services, migrations, handlers, apps, packages, or standardized files.

Best resources:

- Template files in `assets/`
- generator scripts
- examples from the target repo
- gotchas about naming, imports, test location, or deployment wiring

Failure mode: hardcoding a single happy path when natural-language requirements require adaptation. Provide patterns, not brittle one-size output.

### 6. Code Quality And Review

Use this for review, style, testing practice, security, maintainability, and organization-specific quality bars.

Best resources:

- review rubrics
- deterministic lint/test commands
- adversarial review workflow
- hooks or CI steps for repeatable checks

Failure mode: generic code review advice. Encode the standards that the agent does not already know or frequently misses.

### 7. CI/CD And Deployment

Use this for PR monitoring, flaky CI handling, deploys, smoke tests, rollbacks, hotfixes, or cherry-picks.

Best resources:

- release or deployment runbooks
- service names and environments
- smoke test commands
- rollout and rollback criteria
- PR templates

Failure mode: missing failure branches. Deployment Skills need explicit checks, stop conditions, and rollback paths.

### 8. Runbooks

Use this for symptoms such as alerts, Slack threads, request IDs, error messages, or incidents where the agent must investigate across tools and produce a finding.

Best resources:

- symptom-to-tool maps
- query patterns
- known dashboard links
- report templates
- escalation criteria

Failure mode: writing a generic troubleshooting list. A good runbook Skill encodes local topology and the order of investigation.

### 9. Infrastructure Operations

Use this for routine maintenance and risky operational work such as cleanup, quota investigation, dependency updates, or resource deletion.

Best resources:

- guardrail scripts
- dry-run modes
- confirmations
- soak periods
- rollback instructions
- hooks that block dangerous commands when the Skill is active

Failure mode: automating destructive actions without staged verification and user confirmation.

## High-Signal Design Patterns

### Do Not State The Obvious

Assume the agent can code, read files, and inspect the repo. Use the Skill for information that changes behavior: local conventions, failure modes, exact workflows, and non-obvious quality standards.

### Build A Gotchas Section

The Gotchas section is often the highest-value part of a Skill. Populate it from observed failures, not imagined possibilities. Each gotcha should be specific enough that the agent can act differently.

Examples of strong gotcha shapes:

- "Use the highest version row, not the newest timestamp."
- "These two fields have different names across systems but represent the same ID."
- "A successful HTTP status in staging does not prove the downstream event processed."

### Use Progressive Disclosure

Treat the Skill directory as context architecture. Keep the main `SKILL.md` short and link to named files for deep material:

- `references/api.md` for signatures and examples
- `references/runbook.md` for detailed investigation trees
- `assets/template.md` for generated output
- `scripts/verify_checkout.js` for deterministic product checks

Give the agent load conditions such as "read this file when the job is pending" or "use this template when producing the final incident report."

### Avoid Railroading The Agent

Reusable instructions can become harmful when they are too narrow. Provide principles, decision criteria, and examples. Use hard constraints only where correctness or safety requires them.

Good hard constraints:

- destructive operations need confirmation
- a required field must use one of a known enum
- a verification step must assert final state

Good flexible guidance:

- choose the test command that matches the changed package
- adapt the template headings to the user's language
- split a large Skill if it spans multiple categories

### Design Setup Flows

Some Skills need user- or team-specific values. Store these in a config file or stable data directory when the environment supports it. Ask only for missing values that block execution.

Common setup values:

- Slack or Lark channel
- team/project ID
- default environment
- dashboard or datasource IDs
- reviewer group

### Write Descriptions For The Model

The description is a trigger surface, not a product summary. Include concrete user phrases, task verbs, tools, systems, and file types likely to appear in a request. This improves both activation and non-activation.

Weak description:

```text
Helps with deployment.
```

Stronger description:

```text
Use when monitoring a PR, retrying CI, deploying a service, running smoke tests, checking rollout health, handling rollback, or cherry-picking a production hotfix.
```

### Add Memory Deliberately

History helps when the next run needs to know what changed since the previous run. Keep memory simple unless there is a clear reason to use a database.

Useful memory forms:

- append-only text logs
- JSON records
- SQLite only for structured querying

Avoid memory for one-off Skills or workflows where stale history could mislead the agent.

### Store Scripts And Helper Code

Scripts are valuable when the agent would otherwise recreate fragile or repetitive code. Use scripts for verification, data fetching, transformations, packaging, or guardrails. Test scripts after adding them.

The agent can then spend context and reasoning on orchestration rather than boilerplate reconstruction.

### Use Hooks Sparingly

On-demand hooks are useful for session-scoped guardrails such as blocking dangerous shell commands or preventing edits outside a directory during debugging. Keep hooks narrow, explain why they exist, and avoid noisy always-on policies.

## Distribution Strategy

Choose distribution based on team size, repo count, and context cost:

| Mode | Best for | Tradeoff |
| --- | --- | --- |
| Repo-local Skill | Small teams, repo-specific workflows, tightly coupled code conventions | Every checked-in Skill adds metadata to model context |
| Personal/global Skill | Individual workflows, experiments, local preferences | Harder to standardize across a team |
| Plugin or marketplace | Many teams, many repos, opt-in installation, setup flows | Requires governance, packaging, and discoverability |
| Sandbox folder | Experimental Skills seeking traction | Needs an explicit promotion path |

For a marketplace, prefer organic promotion: start in a sandbox, share with likely users, observe adoption, then move to the official catalog when the owner sees traction.

## Composition

Skills can reference other Skills by name when they are installed, but dependency management may not be automatic. When composing Skills:

- Name dependencies explicitly.
- Provide a fallback when a dependency is not installed.
- Avoid long chains of dependent Skills for core workflows.
- Keep the primary Skill understandable on its own.

## Measurement

Measure Skills when they are shared broadly or expected to drive workflow quality.

Useful signals:

- invocation count
- undertriggering compared with expected usage
- repeated user corrections
- failed validation steps
- updates to the Gotchas section
- time saved in repeated workflows
- PRs or incidents where the Skill changed outcome

Hook-based usage logging can help, but treat logs as adoption signals rather than proof of quality. Pair usage with qualitative feedback and evals.

## Anti-Patterns

- A Skill that is mostly generic advice the model already knows.
- A broad "team handbook" Skill that spans multiple unrelated categories.
- A description written like marketing copy instead of trigger logic.
- A long `SKILL.md` that should be split into references.
- A gotchas section filled with hypothetical warnings instead of observed failures.
- A verification Skill without assertions.
- An operations Skill without confirmations, dry-runs, or rollback paths.
- A marketplace full of untested Skills with no owner or promotion criteria.

## Practical Conversion Checklist

When turning experience into a Skill:

1. Capture three realistic user prompts that should trigger it.
2. Name the primary category.
3. Write the shortest useful description that still includes trigger phrases.
4. Draft the core workflow in fewer than ten steps.
5. Add concrete gotchas from real failures or known local constraints.
6. Move deep reference material out of `SKILL.md`.
7. Add scripts only when deterministic reuse matters.
8. Add evals or examples that verify triggering and expected output shape.
9. Define validation: tests, screenshots, assertions, packaging checks, or review.
10. Decide distribution: local, repo, sandbox, or marketplace.
11. Decide measurement only if the Skill is shared or business-critical.

## How To Apply This In This Repository

This repository's existing Skills usually include:

- `SKILL.md` as the machine-facing instruction file
- `README.md` as human-facing usage documentation
- `evals/evals.json` as example prompts and expected behavior
- `references/` when long or specialized context would bloat `SKILL.md`

Follow that convention unless a future repo-level instruction says otherwise. Keep changes surgical: add only files that directly support the Skill.
