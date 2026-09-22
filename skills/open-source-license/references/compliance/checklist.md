# Compliance Evidence Checklist

Collect only evidence relevant to the requested scope:

- Exact component/version, source, license expression and exceptions; inspect
  vendored code and actual shipped artifacts as well as manifests.
- Copyright/attribution and upstream NOTICE files; identify applicable retained
  notices rather than inventing a blanket NOTICE requirement.
- Modifications, combination/linking mechanism, distribution recipients and
  network interaction. A dependency list alone cannot settle these questions.
- Required source, build/relinking materials, offers and installation information
  for the applicable license/version and distribution method.
- Existing contributors' rights before a license change; project ownership is not
  automatic permission to relicense external contributions.

Report evidence, gaps, conditional risk and remediation separately. A scanner
result is an inventory aid, not a legal conclusion. Do not install scanners or
upload private code just to perform a documentation review.

Use [compatibility.md](compatibility.md) for scenario rules and
[common-issues.md](common-issues.md) for remediation patterns.

## Sources and review boundary

Reviewed 2026-09-21. These notes are conditional guidance, not a replacement for
the exact license/version and facts of the combination. Verify the linked primary
source when using a rule; do not infer a project's current license from examples.
