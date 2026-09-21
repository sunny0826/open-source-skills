# License Selection

Use facts already provided; ask only questions that materially change selection.
Start with adoption goals, desired reciprocity, patent grant preferences,
dependency obligations and ownership of contributions.

- Low adoption friction: compare MIT/BSD and Apache-2.0; explicit patent language
  often makes Apache-2.0 worth considering, but it is not blanket patent immunity.
- Explicit Chinese/English permissive text: consider Mulan PSL v2 when requested,
  with its own obligations rather than treating it as translated Apache.
- File-level reciprocity: assess MPL-2.0 and its compatibility conditions.
- Library reciprocity with application linking: assess the precise LGPL version
  and compliance mechanism, not merely whether linking is dynamic.
- Strong reciprocity on distribution: assess the appropriate GPL version against
  actual dependency constraints and rights.
- Reciprocity for modified remote service versions: assess AGPL and its additional
  network requirement along with distribution obligations.

Present a recommendation tied to the stated goal and a credible alternative.
Avoid asking the same goal questions again when already answered. Do not choose
GPL-2.0 merely because a project mentions Linux; combination and version matter.

Read [comparison-matrix.md](comparison-matrix.md) and the relevant license family.
Before creating files, confirm missing copyright information only if required.

## Sources and review boundary

Reviewed 2026-09-21. These notes are conditional guidance, not a replacement for
the exact license/version and facts of the combination. Verify the linked primary
source when using a rule; do not infer a project's current license from examples.
