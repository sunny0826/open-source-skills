# Common Compliance Issues

| Finding | Evidence needed | Remediation |
| --- | --- | --- |
| No declared license | Source files, distribution package, upstream license | Ask the rights holder; do not assume public means reusable. |
| Apache NOTICE lost | Upstream NOTICE and shipped derivative | Preserve applicable attribution under section 4(d); do not fabricate a NOTICE. |
| GPL version ambiguous | “only”, “or later”, exceptions in the actual notice | Resolve expression before compatibility advice. |
| LGPL static binary | Version, link method and relinking/source materials | Assess version-specific compliance route, not a categorical ban. |
| AGPL service | Modified covered work, user interaction, distribution | Assess network and distribution obligations separately. |
| Minified third-party bundle | Bundler output and retained legal notices | Restore applicable license/notices in shipped output. |
| License change | Contribution rights and existing grants | Obtain required permissions and preserve third-party terms. |

Do not recommend process isolation as guaranteed legal circumvention. Use a
conditional alternative and state the boundary facts requiring review.

- [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)
- [GNU FAQ](https://www.gnu.org/licenses/gpl-faq.en.html)

## Sources and review boundary

Reviewed 2026-09-21. These notes are conditional guidance, not a replacement for
the exact license/version and facts of the combination. Verify the linked primary
source when using a rule; do not infer a project's current license from examples.
