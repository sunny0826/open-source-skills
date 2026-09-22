---
name: git-helper
description: "Explain, perform or recover a specific Git operation, including commits, branches, merges, rebase, reset and reflog. Not for drafting PR descriptions or release notes without a Git operation request."
---

# Git Helper

Use the user's language. Distinguish explanation from execution: a question about
a command should not mutate the repository. An action request authorizes the
necessary in-scope operation; do not end at a tutorial when you can perform it.

## Establish repository state

For an operation, inspect status, branch, relevant log and remotes as needed.
Before rewriting history, distinguish local commits from pushed/shared history.
Inspect available evidence first; ask about intent only when it changes the safe
operation. Preserve unrelated working changes. Do not assume a remote or `main`.

For undo/recovery, determine whether the lost work was committed, staged, stashed,
or never recorded by Git. Reflog recovers recorded commits/reference movements,
not arbitrary uncommitted file content. Previously staged objects may sometimes
remain, but recovery is not guaranteed; editor history/backups may be relevant.
Avoid cleanup/gc or destructive retries during recovery.

## Choose the smallest operation

- Prefer revert for an intended undo on shared history; reset/rebase may fit
  local-only history. Use a recoverable reference before a risky history rewrite.
- Warn concretely about data lost by hard reset or clean, and check scope first.
  Do not run destructive variants merely because they appear in an example.
- Before a requested force push, inspect divergence and use an explicit expected
  remote ref/lease when concurrent updates matter. A lease is not permission to
  overwrite work you have not inspected.
- `git pull` fetches then reconciles according to flags/config (merge, rebase or
  fast-forward-only); it is not unconditionally fetch plus merge.
- For leaked credentials, revoke/rotate first; removing a file or rewriting
  history alone does not invalidate the secret.

## Verify

Check the resulting branch, status, relevant diff/log and operation state.
When conflicts occur, inspect and resolve within task scope; do not silently
choose one side or discard other changes. Report exactly what ran and what remains.
For explanations, provide only the commands and caveats needed for the question.
