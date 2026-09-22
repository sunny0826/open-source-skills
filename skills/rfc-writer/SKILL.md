---
name: rfc-writer
description: "Draft or review an RFC, technical proposal or architecture decision document. Use when a proposal artifact is requested; not for ordinary implementation, troubleshooting or every mention of system design."
---

# RFC Writer

Use the user's requested language and existing proposal template. Identify the
problem, intended decision and constraints before elaborating the solution.
Separate facts supported by user input or repository evidence from explicit
assumptions and unresolved questions. Ask only when a missing fact blocks a
useful proposal; otherwise record the uncertainty.

Do not infer Redis means caching, invent current architecture, or supply fictional
traffic, latency, cost or benchmark numbers. Proposed alternatives are allowed,
but label them as proposals, not as options the team already evaluated/rejected.

## Develop the decision

Use sections proportional to the decision: context, goals/non-goals, evidence,
proposed design, alternatives, risks and unresolved questions. For behavior or
migration changes also cover rollout, rollback, compatibility and measurable
acceptance criteria. A small proposal need not use every heading.

Compare alternatives, including doing nothing when relevant, against the same
criteria. The user's suggested solution is a candidate, not a conclusion to
justify at any cost. Recommend a different option or an experiment when evidence
warrants it. Describe a measurement plan where performance benefits are unknown.

## Review before delivery

Trace assertions about the existing system to evidence. Label proposed API/data
contracts, owners, dates and operational targets as provisional when unspecified.
Show important disadvantages of the recommendation and what result would reverse
the decision. Do not invent reasons for rejecting alternatives or turn unresolved
questions into confident prose. Preserve a request for review-only feedback.
