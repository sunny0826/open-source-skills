#!/usr/bin/env python3
"""Read OpenDigger series without confusing missing data with zero."""
import argparse
import json
import math
import re
import sys
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import quote
from urllib.request import urlopen

PERIODS = {
    "month": re.compile(r"^\d{4}-(0[1-9]|1[0-2])$"),
    "quarter": re.compile(r"^\d{4}Q[1-4]$"),
    "year": re.compile(r"^\d{4}$"),
}
CORE = ("openrank", "activity")
COUNTS = (
    "stars", "technical_fork", "contributors", "new_contributors",
    "inactive_contributors", "participants", "bus_factor", "issues_new",
    "issues_closed", "issue_comments", "change_requests",
    "change_requests_accepted", "change_requests_reviews", "code_change_lines_add",
    "code_change_lines_remove", "code_change_lines_sum",
)
DURATIONS = (
    "issue_response_time", "issue_resolution_duration", "issue_age",
    "change_request_response_time", "change_request_resolution_duration",
    "change_request_age",
)
REGISTRY = {
    **{m: {"shape": "flat", "unit": "score", "targets": ["repository", "developer"]}
       for m in CORE},
    **{m: {"shape": "flat", "unit": "count", "targets": ["repository"]}
       for m in COUNTS},
    **{m: {"shape": "duration", "unit": "day", "targets": ["repository"]}
       for m in DURATIONS},
    "attention": {"shape": "flat", "unit": "score", "targets": ["repository"]},
    "community_openrank": {"shape": "flat", "unit": "score", "targets": ["repository"]},
}
for _metric in ("code_change_lines_add", "code_change_lines_remove", "code_change_lines_sum"):
    REGISTRY[_metric]["unit"] = "line"
STATISTICS = ("avg", "quantile_0", "quantile_1", "quantile_2", "quantile_3", "quantile_4", "levels")


def period_kind(value):
    return next((kind for kind, pattern in PERIODS.items() if pattern.fullmatch(value)), None)


def validate_target(value):
    parts = value.split("/")
    if len(parts) not in (1, 2) or any(
        part in (".", "..") or not re.fullmatch(r"[A-Za-z0-9_.-]+", part) for part in parts
    ):
        raise ValueError("target must be login or owner/repository, not a URL or path")
    return "repository" if len(parts) == 2 else "developer"


def numeric(value):
    return type(value) in (int, float) and math.isfinite(value)


def extract(data, metric, period="latest", kind="month", statistic="avg"):
    """Return status, actual period and raw value. Never aggregate or interpolate."""
    if metric not in REGISTRY or kind not in PERIODS or statistic not in STATISTICS:
        raise ValueError("unsupported metric, period kind, or statistic")
    if period != "latest" and period_kind(period) is None:
        raise ValueError("invalid period")
    if not isinstance(data, dict):
        return "unsupported_shape", None, None
    nested = REGISTRY[metric]["shape"] == "duration"
    series = data.get(statistic) if nested else data
    if not isinstance(series, dict):
        return "unsupported_shape", None, None
    if series and not any(period_kind(str(key)) for key in series):
        return "unsupported_shape", None, None
    if period == "latest":
        candidates = [key for key in series if isinstance(key, str) and PERIODS[kind].fullmatch(key)]
        if not candidates:
            # A nonempty flat object without any period keys is not an empty series.
            if series and not any(period_kind(str(key)) for key in series):
                return "unsupported_shape", None, None
            return "missing_period", None, None
        period = max(candidates)
    if period not in series or series[period] is None:
        return "missing_period", period, None
    value = series[period]
    if nested and statistic == "levels":
        valid = isinstance(value, list) and all(numeric(v) for v in value)
    else:
        valid = numeric(value)
    if not valid:
        return "unsupported_shape", period, None
    return "ok", period, value


def observe(metric, platform, target, period, kind, statistic, input_dir=None, timeout=15):
    target_type = validate_target(target)
    meta = REGISTRY[metric]
    url = f"https://oss.open-digger.cn/{platform}/{quote(target, safe='/')}/{metric}.json"
    out = dict(metric=metric, status="not_applicable", period=None, value=None,
               statistic=statistic if meta["shape"] == "duration" else None,
               unit="count_by_bucket" if meta["shape"] == "duration" and statistic == "levels" else meta["unit"],
               source=url)
    if target_type not in meta["targets"]:
        return out
    try:
        if input_dir is not None:
            path = Path(input_dir) / f"{metric}.json"
            out["source"] = str(path.resolve())
            data = json.loads(path.read_text())
        else:
            with urlopen(url, timeout=timeout) as response:
                data = json.load(response)
        out["status"], out["period"], out["value"] = extract(data, metric, period, kind, statistic)
    except HTTPError as error:
        out["status"] = "not_found" if error.code == 404 else "fetch_error"
        out["error"] = f"HTTP {error.code}"
    except FileNotFoundError:
        out["status"] = "not_found"
        out["error"] = "fixture file missing"
    except (json.JSONDecodeError, UnicodeDecodeError):
        out["status"] = "unsupported_shape"
        out["error"] = "invalid JSON payload"
    except (URLError, OSError, TimeoutError) as error:
        out["status"] = "fetch_error"
        out["error"] = type(error).__name__
    return out


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--platform", choices=("github", "gitee"), default="github")
    parser.add_argument("--target", required=True, help="owner/repository or developer login")
    group = parser.add_mutually_exclusive_group()
    group.add_argument("--metrics", default="openrank,activity", help="comma-separated registry metric names")
    group.add_argument("--all", action="store_true", help="query every registered metric applicable to the target")
    parser.add_argument("--period", default="latest", help="YYYY, YYYY-MM, YYYYQ1..4 or latest")
    parser.add_argument("--period-kind", choices=PERIODS, default="month", help="kind used for latest only")
    parser.add_argument("--statistic", choices=STATISTICS, default="avg")
    parser.add_argument("--input-dir", type=Path, help="offline directory of metric-name.json fixtures")
    parser.add_argument("--timeout", type=float, default=15)
    args = parser.parse_args(argv)
    try:
        target_type = validate_target(args.target)
    except ValueError as error:
        parser.error(str(error))
    if args.period != "latest" and period_kind(args.period) is None:
        parser.error("period must be YYYY, YYYY-MM, YYYYQ1..4 or latest")
    if not math.isfinite(args.timeout) or args.timeout <= 0:
        parser.error("timeout must be positive and finite")
    names = ([m for m, meta in REGISTRY.items() if target_type in meta["targets"]]
             if args.all else list(dict.fromkeys(args.metrics.split(","))))
    if any(m not in REGISTRY for m in names):
        parser.error("unknown metric; available: " + ", ".join(REGISTRY))
    results = [observe(m, args.platform, args.target, args.period, args.period_kind,
                       args.statistic, args.input_dir, args.timeout) for m in names]
    print(json.dumps({"target": args.target, "platform": args.platform, "observations": results},
                     ensure_ascii=False, indent=2, allow_nan=False))
    return int(any(item["status"] in ("fetch_error", "unsupported_shape") for item in results))


if __name__ == "__main__":
    sys.exit(main())
