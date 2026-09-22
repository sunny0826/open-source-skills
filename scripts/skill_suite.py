"""Shared catalog/evaluation IO; no model or network side effects."""
import json
import hashlib
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def metadata(path):
    text = path.read_text()
    if not text.startswith("---\n") or "\n---\n" not in text[4:]:
        raise ValueError(f"{path}: missing frontmatter")
    front, body = text[4:].split("\n---\n", 1)
    fields = {}
    for line in front.splitlines():
        key, sep, value = line.partition(":")
        if not sep:
            raise ValueError(f"{path}: invalid metadata line")
        if key not in ("name", "description"):
            continue
        if key in fields:
            raise ValueError(f"{path}: duplicate metadata field {key}")
        value = value.strip()
        fields[key] = json.loads(value) if value.startswith('"') else value
    if not all(isinstance(fields.get(k), str) and fields[k].strip() for k in ("name", "description")):
        raise ValueError(f"{path}: name/description required")
    return fields, body.strip()


def catalog(root=ROOT):
    manifest = json.loads((root / ".claude-plugin/marketplace.json").read_text())
    return manifest, [{"name": entry["name"], "path": root / "skills" / entry["name"],
                       **metadata(root / "skills" / entry["name"] / "SKILL.md")[0]}
                      for entry in manifest["plugins"]]


def cases(root=ROOT, skill=None):
    _, entries = catalog(root)
    found = False
    for entry in entries:
        if skill and entry["name"] != skill:
            continue
        found = True
        suite = json.loads((entry["path"] / "evals/evals.json").read_text())
        for case in suite["evals"]:
            yield entry, case
    if skill and not found:
        raise ValueError(f"unknown Skill: {skill}")


def request(entry, case, root=ROOT):
    _, entries = catalog(root)
    return {
        "case": {k: v for k, v in case.items() if k not in ("expectations", "should_trigger")},
        "catalog": [{"name": e["name"], "description": e["description"]} for e in entries],
        "skill": (entry["path"] / "SKILL.md").read_text() if case["kind"] == "behavior" else None,
        "skill_root": str(entry["path"].resolve()) if case["kind"] == "behavior" else None,
        "resource_sha256": {
            str(p.relative_to(entry["path"])): hashlib.sha256(p.read_bytes()).hexdigest()
            for folder in ("references", "scripts", "assets")
            for p in sorted((entry["path"] / folder).rglob("*"))
            if p.is_file() and "__pycache__" not in p.parts
        } if case["kind"] == "behavior" else {},
        "fixtures": [{"path": path, "content": (entry["path"] / path).read_text()}
                     for path in case["files"]],
    }
