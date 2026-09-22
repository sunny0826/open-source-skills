# Conditional License Compatibility

Do not use a universal yes/no matrix. First distinguish combining, distributing,
linking, aggregating, and relicensing. “May combine” does not mean all files can
be relabeled under the destination project's license.

| Scenario | Conditions to investigate |
| --- | --- |
| Permissive dependency | Retain its license/notices and satisfy its own terms; the project license does not erase them. |
| Apache-2.0 + GPL-2.0-only | Incompatible for a combined derivative distribution; find a different dependency or obtain permission. |
| Apache-2.0 + GPL-2.0-or-later | Check whether choosing GPLv3 is permitted for the complete combination; do not silently relicense third-party code. |
| GPLv3 + AGPLv3 | Section 13 provides a combination permission, preserving terms for each part and applying the AGPL network requirement to the combination. |
| LGPL library + proprietary application | Check exact version, notices, library modifications, source/relinking materials, reverse-engineering rights and installation information where applicable. |
| MPL-2.0 + other code | File-level obligations remain; secondary-license use requires its conditions, including no Incompatible With Secondary Licenses restriction. |
| Separate process / network API | Functional separation is evidence to assess, not an automatic exemption or universal AGPL workaround. |

For LGPLv3, section 4(d) provides alternative compliance mechanisms. Static
linking is not categorically prohibited; a compliant relinking route can require
Corresponding Application Code and Minimal Corresponding Source. Dynamic linking
alone is not proof all obligations were met.

AGPL includes ordinary distribution obligations in addition to section 13 for
modified network-interactive versions. Do not promise that unchanged distribution
has no obligations or that all code on the same server must be disclosed.

Output the exact expression, scenario, conditional conclusion, missing facts and
remediation. For uncertain derivative-work boundaries or commercial decisions,
identify the question that needs qualified legal review.

- [Apache/GPL compatibility](https://www.apache.org/licenses/GPL-compatibility)
- [GNU license FAQ](https://www.gnu.org/licenses/gpl-faq.en.html)
- [LGPLv3, section 4](https://www.gnu.org/licenses/lgpl-3.0.txt)
- [AGPLv3, sections 4–6 and 13](https://www.gnu.org/licenses/agpl-3.0.html)
- [MPL FAQ](https://www.mozilla.org/en-US/MPL/2.0/FAQ/)

## Sources and review boundary

Reviewed 2026-09-21. These notes are conditional guidance, not a replacement for
the exact license/version and facts of the combination. Verify the linked primary
source when using a rule; do not infer a project's current license from examples.
