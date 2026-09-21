#!/usr/bin/env python3
"""Prepare, execute and score isolated model observations without a fake text grader."""
import argparse
import hashlib
import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path
from skill_suite import ROOT, cases, request


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def score(case, observation, skill, review=None, run_hash=None):
    selected = observation.get("selected_skills")
    if (not isinstance(selected, list) or not all(isinstance(n, str) for n in selected)
            or len(selected) != len(set(selected))):
        return "invalid_observation"
    if not isinstance(observation.get("response"), str) or not isinstance(observation.get("tool_calls"), list):
        return "invalid_observation"
    correct = selected == [skill] if case["should_trigger"] else skill not in selected
    if not correct:
        return "fail"
    if case["kind"] == "trigger":
        return "pass"
    if review is None:
        return "unreviewed"
    checks = review.get("checks", [])
    if (review.get("run_sha256") != run_hash or review.get("case_id") != case["id"]
            or len(checks) != len(case["expectations"]) or not checks
            or not all(type(v) is bool for v in checks)
            or not isinstance(review.get("evidence"), str) or not review["evidence"].strip()):
        return "invalid_review"
    return "pass" if all(checks) else "fail"


def main(argv=None):
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("mode", choices=("prepare", "run", "score"))
    p.add_argument("--skill")
    p.add_argument("--output", type=Path, required=True, help="isolated run directory")
    p.add_argument("--reviews", type=Path)
    p.add_argument("--adapter", nargs=argparse.REMAINDER, help="executable and arguments; JSON stdin/stdout, no shell")
    p.add_argument("--timeout", type=int, default=120)
    args = p.parse_args(argv)
    if args.mode == "run" and not args.adapter:
        p.error("run requires --adapter as the last argument")
    if args.timeout <= 0:
        p.error("timeout must be positive")
    args.output.mkdir(parents=True, exist_ok=True)
    results = []
    for entry, case in cases(skill=args.skill):
        name = f"{entry['name']}--{case['id']}"
        input_path = args.output / f"{name}.request.json"
        run_path = args.output / f"{name}.observation.json"
        if args.mode in ("prepare", "run"):
            if input_path.exists() or run_path.exists():
                raise ValueError(f"use a new run directory; existing case: {name}")
            payload = request(entry, case)
            if case["kind"] == "behavior":
                snapshot = args.output.resolve() / "resources" / entry["name"]
                if not snapshot.exists():
                    shutil.copytree(entry["path"], snapshot,
                                    ignore=shutil.ignore_patterns("evals", "__pycache__"))
                payload["skill_root"] = str(snapshot)
            input_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n")
        if args.mode == "run":
            if run_path.exists():
                raise ValueError(f"refusing to overwrite existing observation: {run_path}")
            with tempfile.TemporaryDirectory(prefix="skill-eval-") as scratch:
                try:
                    proc = subprocess.run(args.adapter, input=json.dumps(payload), text=True,
                                          capture_output=True, cwd=scratch, timeout=args.timeout)
                    if proc.returncode:
                        raise ValueError(f"adapter exit {proc.returncode}: {proc.stderr[:1000]}")
                    result = json.loads(proc.stdout)
                    if not isinstance(result, dict):
                        raise ValueError("adapter must return an object")
                    run_path.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n")
                except (subprocess.TimeoutExpired, ValueError, OSError) as error:
                    results.append({"case": name, "status": "adapter_error", "error": str(error)})
                    continue
        if args.mode == "prepare":
            results.append({"case": name, "status": "prepared"})
            continue
        if not run_path.exists():
            results.append({"case": name, "status": "missing_observation"})
            continue
        try:
            saved_request = json.loads(input_path.read_text()) if input_path.exists() else None
            current_request = request(entry, case)
            if saved_request is not None:
                current_request["skill_root"] = saved_request.get("skill_root")
            if saved_request != current_request:
                results.append({"case": name, "status": "stale_or_missing_request"})
                continue
            observation = json.loads(run_path.read_text())
            if not isinstance(observation, dict):
                raise ValueError("observation must be an object")
            review_path = args.reviews / f"{name}.review.json" if args.reviews else None
            review = json.loads(review_path.read_text()) if review_path and review_path.exists() else None
            status = score(case, observation, entry["name"], review, digest(run_path))
        except (ValueError, TypeError, AttributeError) as error:
            status = "invalid_observation"
        results.append({"case": name, "status": status})
    summary = {"mode": args.mode, "results": results,
               "counts": {s: sum(r["status"] == s for r in results) for s in sorted({r["status"] for r in results})}}
    (args.output / f"{args.mode}-summary.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps(summary["counts"]))
    return int(any(r["status"] not in ("pass", "prepared") for r in results))


if __name__ == "__main__":
    try:
        sys.exit(main())
    except (ValueError, OSError) as error:
        print(str(error), file=sys.stderr)
        sys.exit(1)
