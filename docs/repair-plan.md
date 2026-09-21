# Skill repair plan

Owner: the current primary agent. Execution is serial; no concurrent file writers.

| Stage        | Depends on             | Owned files                                        | Acceptance                                                           |
| ------------ | ---------------------- | -------------------------------------------------- | -------------------------------------------------------------------- |
| Contract     | none                   | docs/adr, docs/skill-contract.md, this plan        | boundaries and evaluation IO frozen                                  |
| Instructions | Contract               | skills/\*/SKILL.md, README and references          | all audit findings addressed without contradictory examples          |
| Helpers      | Contract               | skills/openrank/scripts, scripts, tests, mise.toml | parser, validator, runner tests pass                                 |
| Evaluation   | Instructions + Helpers | skills/\*/evals                                    | fixtures, trigger negatives, behavior rubrics validated              |
| Distribution | Evaluation             | marketplace, root README, website catalog          | 14 individually resolvable entries                                   |
| Integration  | Distribution           | local project entries and verification record      | reviewed backups, source matches, full offline check and live sample |

No implementation subagents are scheduled. An independent read-only behavior
review may inspect representative prompts after the instructions are stable.
All integration edits and local entry migration remain owned by the primary agent.

## Read-only evaluation ownership

Independent evaluators receive frozen request JSON in `/tmp/oss-skills-eval-20260921`.
They cannot edit this repository. behavior_probe owns the six priority Skills'
behavior observation files; other_behavior_probe owns the other eight Skills'
behavior observations; routing_probe owns trigger observations. The primary
agent owns review verdicts and integration. These disjoint temporary artifacts
do not require code worktrees because no evaluator may modify source files.

## Risks and alternatives

Back up existing project copies before any migration and inspect differences;
do not replace locally customized global deployments. Model execution depends on
the configured host, so static validation is never reported as model evaluation.
Third-party auxiliary fixes are project-local patches with provenance, not edits
to an upstream cache. Keep them outside the published Skill set.
