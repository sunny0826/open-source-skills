---
name: openrank
description: "Fetch OpenRank or OpenDigger repository/developer metrics for a specified period or trend. Not for generic repository quality reviews without an OpenDigger metric request."
---

# OpenRank

Use the user's language. Resolve platform (github/gitee), repository owner/name
or developer login, metrics and requested month/quarter/year. For ambiguous
repository versus developer names, clarify before constructing endpoints.

## Read structured data

Use the bundled standard-library helper from this Skill directory:

```sh
python3 scripts/metrics.py --platform github --target X-lab2017/open-digger --metrics openrank,activity --period latest --period-kind month
python3 scripts/metrics.py --platform github --target X-lab2017/open-digger --metrics issue_response_time --period 2025Q4 --statistic avg
```

It needs Python 3.11+ and network access, no third-party packages. Use the host's
configured Python environment. `--input-dir` reads offline JSON fixtures. Run
`--help` for available options. `--all` queries the registry's applicable metrics,
not a promise of every metric OpenDigger might publish. For metric definitions,
units and applicability read [references/metrics.md](references/metrics.md).

Data source: `https://oss.open-digger.cn/{platform}/{target}/{metric}.json`.
Flat metrics contain period keys. Timing metrics contain avg/quantile series;
levels is an array-valued distribution, not a scalar duration. Select the requested
statistic and preserve its unit. Never infer absent years by adding OpenRank,
ratios, averages or contributor counts. Monthly stars are period additions, not
current cumulative GitHub stars.

## Present and verify

Show target, exact observation period, metric/statistic/unit and source URL.
Latest means latest available period of the selected kind; warn about differing
latest periods rather than implying they describe the same month. For trends,
request each actual period and state gaps; do not interpolate missing values.
Use a table when requested or when comparing metrics; do not forbid tables.

Distinguish zero, missing_period, not_found, fetch_error, unsupported_shape and
not_applicable. Keep partial results and explicitly list failures. Do not convert
errors into zero or a generic N/A that hides an unavailable endpoint. If Python
is unavailable, read JSON with another tool using the same shape/status rules;
do not silently fall back to flat-date extraction for nested metrics.
