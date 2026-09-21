# OpenDigger metric contract

Reviewed 2026-09-21. The helper's REGISTRY is a conservative query list, not an
exhaustive capability claim. OpenRank/activity support repository and developer
paths here; remaining metrics are queried only for repositories. Availability
varies by platform/target. A 404 is not evidence of a zero score.

| Family | JSON shape | Value |
| --- | --- | --- |
| openrank, activity, attention | period → number | upstream score, not a count |
| stars, forks, issue/PR events | period → number | events in the period, not cumulative totals |
| contributors, participants, bus_factor | period → number | upstream period count; do not add across periods |
| code_change_lines_* | period → number | lines with the upstream metric's sign/definition |
| response/resolution/age | statistic → period → number | duration; upstream default unit is day |
| timing levels | levels → period → array | counts in upstream threshold buckets |

Statistics are avg, quantile_0 through quantile_4, or levels. Do not call levels
a duration. Keep its thresholds unknown unless the export configuration establishes
them. The default duration unit follows the upstream CHAOSS query implementation;
verify configuration before applying this helper to a custom export.

The registry retains community_openrank as a query candidate; availability and
shape must be confirmed by the response. Unsupported structures are reported,
not flattened or silently discarded. Missing_period differs from not_found,
fetch_error, unsupported_shape and not_applicable. Latest selects valid monthly,
quarterly or yearly keys separately and does not skip a null latest record in
favor of an older value without telling the caller.

Sources:
- [OpenDigger CHAOSS implementation](https://github.com/X-lab2017/open-digger/blob/master/src/metrics/chaoss.ts)
- [OpenDigger data documentation](https://github.com/X-lab2017/open-digger)
- [Observed nested response-time export](https://oss.open-digger.cn/github/X-lab2017/open-digger/issue_response_time.json)
