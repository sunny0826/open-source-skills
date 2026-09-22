---
name: contributor-guide-writer
description: "Write or update CONTRIBUTING.md, repository setup instructions, or developer onboarding documentation. Not for diagnosing an installation failure, running setup/tests, or drafting a general README."
---

# Contributor Guide Writer

Use the requested language. Read existing contribution documentation before
editing, and preserve project-specific policies and useful content.

## Discover rather than assume

Inspect manifests, lockfiles, runtime/version configuration, actual scripts,
CI jobs, repository layout, PR templates and documented contribution conventions.
Use the established toolchain and working directories. Derive default branch
from repository evidence; do not assume `main`. Check commit conventions and
Code of Conduct presence before presenting them as required policies.

For monorepos/multiple repositories, explain the relevant setup and test scope.
Do not install tools, alter configuration or run expensive setup solely to write
a guide. Where safe and appropriate, verify listed commands; otherwise say they
were discovered but not executed. A missing test command is an explicit gap,
not permission to invent `npm test`, `pytest` or a new testing policy.

## Draft proportionally

A typical guide covers prerequisites, setup, development, checks and PR submission.
Use only applicable sections. Missing facts may be clearly marked for maintainer
input; suggested policies stay separate from existing requirements. Do not require
forking when the documented contributor workflow uses branches in the same repo.
Do not state that a Code of Conduct exists without finding it or a valid link.

Use valid Markdown; an outer example fence must be longer than nested fences.
Before delivery verify every command, branch, path and rule against evidence,
check links, and ensure existing useful guidance was preserved. Report any commands
not run instead of claiming the onboarding process was tested end to end.
