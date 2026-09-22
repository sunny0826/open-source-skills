#!/usr/bin/env python3
"""Validate static packaging/schema contracts, never model behavior."""
import json
import re
import sys
from pathlib import Path
from skill_suite import ROOT, catalog, metadata


def validate(root=ROOT):
    errors = []
    manifest, entries = catalog(root)
    names = [e["name"] for e in entries]
    if len(names) != len(set(names)):
        errors.append("duplicate catalog names")
    total = 0
    for entry, plugin in zip(entries, manifest["plugins"]):
        name, directory = entry["name"], entry["path"]
        if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", name) or directory.name != name:
            errors.append(f"{name}: invalid name/directory")
        if plugin["name"] != name or plugin.get("description") != entry["description"]:
            errors.append(f"{name}: marketplace metadata drift")
        if plugin.get("strict") is not False or plugin.get("source") != "./":
            errors.append(f"{name}: expected marketplace-owned root plugin")
        paths = plugin.get("skills", [])
        if paths != [f"./skills/{name}"]:
            errors.append(f"{name}: must load exactly its own Skill")
        for relative in paths:
            resolved = (root / plugin["source"] / relative).resolve()
            if not resolved.is_relative_to(root.resolve()) or not (resolved / "SKILL.md").is_file():
                errors.append(f"{name}: unresolved or escaping plugin path {relative}")
        for md in directory.rglob("*.md"):
            for target in re.findall(r"\]\(([^)]+)\)", md.read_text()):
                if re.match(r"[a-z]+:", target) or target.startswith("#"):
                    continue
                target = target.split("#", 1)[0]
                resolved = (md.parent / target).resolve()
                if not resolved.is_relative_to(directory.resolve()) or not resolved.exists():
                    errors.append(f"{md.relative_to(root)}: missing/nonportable link {target}")
        suite = json.loads((directory / "evals/evals.json").read_text())
        if not isinstance(suite, dict) or suite.get("schema_version") != 1 or suite.get("skill_name") != name:
            errors.append(f"{name}: invalid suite header")
            continue
        ids, triggers, negative, behavior = set(), 0, 0, 0
        for case in suite.get("evals", []):
            total += 1
            ident = case.get("id")
            if not isinstance(ident, str) or not re.fullmatch(r"[a-z0-9-]+", ident) or ident in ids:
                errors.append(f"{name}: invalid/duplicate case id {ident}")
            ids.add(ident)
            if case.get("kind") not in ("trigger", "behavior") or type(case.get("should_trigger")) is not bool:
                errors.append(f"{name}/{ident}: invalid case kind/trigger expectation")
            if not isinstance(case.get("prompt"), str) or not case["prompt"].strip():
                errors.append(f"{name}/{ident}: empty prompt")
            checks = case.get("expectations")
            if not isinstance(checks, list) or not checks or not all(isinstance(x, str) and x.strip() for x in checks):
                errors.append(f"{name}/{ident}: observable expectations required")
            files = case.get("files")
            if not isinstance(files, list):
                errors.append(f"{name}/{ident}: files must be an array")
                files = []
            for path in files:
                resolved = (directory / path).resolve()
                if not resolved.is_relative_to(directory.resolve()) or not resolved.is_file():
                    errors.append(f"{name}/{ident}: fixture missing or escapes Skill: {path}")
            if case.get("kind") == "trigger":
                triggers += case.get("should_trigger") is True
                negative += case.get("should_trigger") is False
            else:
                behavior += 1
                if case.get("should_trigger") is not True:
                    errors.append(f"{name}/{ident}: behavior cases must select the Skill")
        if min(triggers, negative, behavior) < 2:
            errors.append(f"{name}: require two positives, two negatives and two behavior cases")
        if not (directory / "README.md").is_file():
            errors.append(f"{name}: missing user documentation")
    return errors, len(entries), total


if __name__ == "__main__":
    try:
        errors, count, total = validate()
    except (ValueError, KeyError, TypeError, OSError) as exc:
        print(f"Invalid catalog: {exc}", file=sys.stderr)
        sys.exit(1)
    for error in errors:
        print(error, file=sys.stderr)
    print(f"Static validation: {count} Skills, {total} cases, {len(errors)} errors; model behavior not evaluated")
    sys.exit(bool(errors))
