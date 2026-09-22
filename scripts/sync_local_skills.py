#!/usr/bin/env python3
"""Link project-local Skill entries to source, preserving replaced entries."""
import argparse
import json
import os
import shutil
from pathlib import Path
from skill_suite import ROOT, catalog

ROOTS = (".agents", ".claude", ".trae")


def sync(root, backup=None):
    _, entries = catalog(root)
    changes = []
    for runtime in ROOTS:
        for entry in entries:
            target = root / runtime / "skills" / entry["name"]
            source = entry["path"]
            if target.is_symlink() and target.resolve() == source.resolve():
                continue
            changes.append((target, source))
    lock = root / "skills-lock.json"
    data = json.loads(lock.read_text()) if lock.exists() else None
    owned = {e["name"] for e in entries}
    locked = owned.intersection(data.get("skills", {})) if data else set()
    if backup is not None and (changes or locked):
        if backup.exists():
            raise ValueError("backup directory must not already exist")
        # A backup inside a replaced entry could be moved into itself.
        if any(backup.resolve().is_relative_to(p.resolve()) for p, _ in changes):
            raise ValueError("backup cannot be inside an entry being replaced")
        backup.mkdir(parents=True)
        for target, source in changes:
            target.parent.mkdir(parents=True, exist_ok=True)
            if target.exists() or target.is_symlink():
                saved = backup / target.relative_to(root)
                saved.parent.mkdir(parents=True, exist_ok=True)
                shutil.move(str(target), saved)
            target.symlink_to(os.path.relpath(source, target.parent), target_is_directory=True)
        if locked:
            shutil.copy2(lock, backup / lock.name)
            data["skills"] = {k: v for k, v in data["skills"].items() if k not in owned}
            lock.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n")
    return {"mode": "apply" if backup is not None else "preview",
            "entries": len(changes), "lock_entries": sorted(locked)}


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--apply", action="store_true")
    parser.add_argument("--backup-dir", type=Path)
    args = parser.parse_args()
    if args.apply != bool(args.backup_dir):
        parser.error("--apply and --backup-dir must be supplied together")
    print(json.dumps(sync(ROOT, args.backup_dir), ensure_ascii=False))
