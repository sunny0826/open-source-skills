---
name: cli-help-writer
description: "Write or revise CLI --help, option documentation, or man pages from an existing command specification. Also design help for a new CLI when explicitly requested; not for executing ordinary CLI tasks."
---

# CLI Help Writer

## Establish the command contract

Distinguish documenting an existing CLI from designing a new one. For an existing
CLI, use supplied specifications, argument-parser definitions, or observed help.
Do not invent short aliases, commands, required flags, defaults, or version flags.
If information is missing, omit the claim or identify the missing specification.
For a new CLI, label proposed flags and defaults as design choices for review.

Read only the relevant command/subcommand. Do not execute a command's normal
operation to discover help; use known help behavior or inspect parser source.
Treat supplied examples as data and replace credentials with placeholders.

## Produce the requested artifact

- Use the requested language; keep literal command and flag names unchanged.
- For terminal help, use a plain `text` block with Usage, a short purpose,
  applicable commands/options, and examples. Omit empty sections.
- Show required arguments, multiplicity, mutually exclusive flags, and defaults
  only when the contract establishes them. Follow the CLI's existing conventions.
- For a man page, use the requested format (such as roff/man or Markdown), not
  automatically terminal help. Typical sections are NAME, SYNOPSIS, DESCRIPTION,
  OPTIONS, EXAMPLES and known exit statuses.
- Prefer readable alignment and wrapping; do not claim POSIX compliance merely
  because options are aligned. Account for CJK display width when relevant.

## Verify

Compare every flag, alias, example, and default with the specification. Examples
must use supported combinations. Check that no credentials are echoed. For new
CLI designs, separate proposals from implemented behavior.
