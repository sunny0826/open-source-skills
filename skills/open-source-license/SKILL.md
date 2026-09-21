---
name: open-source-license
description: "Compare or select open-source licenses, review OSS compliance, or prepare LICENSE/NOTICE/source headers. Use for licensing decisions, not every repository containing a LICENSE file."
---

# Open Source License

Provide informational guidance in the requested language, not a definitive legal
opinion. Escalate unresolved commercial, patent or jurisdiction-specific decisions
to qualified counsel when appropriate; a disclaimer does not replace analysis.

## Establish the exact scenario

Identify the license expression/version (including only/or-later and exceptions),
what is copied/linked/modified, what is distributed to whom, and any remote service
use. Read the actual license and notices. Ask only for facts that change the answer.
Do not equate “open source” with “no obligations” or use a generic compatibility
tick as proof that a combined work can keep the chosen project's license.

## Read only relevant references

- Selection: [decision-tree](references/selection/decision-tree.md).
- Comparison: [comparison-matrix](references/selection/comparison-matrix.md),
  plus [permissive](references/licenses/permissive.md),
  [copyleft](references/licenses/copyleft.md), or
  [specialty](references/licenses/specialty.md) for the requested family.
- Compliance: [compatibility](references/compliance/compatibility.md) and
  [checklist](references/compliance/checklist.md); use
  [common-issues](references/compliance/common-issues.md) for remediation.
- Files: [license-files](references/templates/license-files.md),
  [notice-files](references/templates/notice-files.md), or
  [source-headers](references/templates/source-headers.md).
- Mulan PSL v2: [official bilingual text and application](references/mulan-psl-v2.md).

## Conditions that change the answer

Apache-2.0 is incompatible with GPL-2.0-only; GPL-2.0-or-later may permit using
GPLv3 terms if the complete combination allows it. LGPL is not an exception that
can be applied to arbitrary GPL code. LGPL static linking is not categorically
forbidden; version-specific relinking/source/notice conditions matter.
AGPL carries distribution obligations as well as its additional remote-network
condition for modified versions; do not reduce all obligations to “modified AND
SaaS.” Separate processes do not automatically establish legal independence.
MIT lacks an express patent clause; do not assert that this proves there can be
no implied patent rights. Avoid unsourced examples of projects' current licenses.

## Produce and verify

Give the conditional conclusion, evidence, applicable obligations, missing facts
and practical alternatives. Distinguish compatibility from relicensing permission.
For files, copy canonical text exactly, filling only applicable placeholders;
never reconstruct license language from memory or paraphrase legal clauses.
Use supplied copyright values or ask when required. Verify against the official
source, preserve upstream notices, and report source/date. If the source cannot
be verified, identify that limitation rather than label invented text canonical.
Do not silently replace an existing license or claim rights to relicense others'
contributions. Selection and compliance advice do not authorize publication.
