#!/usr/bin/env python3
"""Check only this project's development entries; never edit deployments."""
import sys
from pathlib import Path
from skill_suite import ROOT, catalog


def check(root=ROOT):
    _, entries = catalog(root)
    errors, inspected = [], 0
    for host in (".agents", ".claude", ".trae"):
        folder = root / host / "skills"
        if not folder.is_dir():
            continue
        for entry in entries:
            local = folder / entry["name"]
            inspected += 1
            if not local.is_symlink() or local.resolve() != entry["path"].resolve():
                errors.append(f"{host}/{entry['name']}: not linked to current source")
    if not inspected:
        errors.append("no project loading root exists; install or link development entries first")
    return errors, inspected


if __name__ == "__main__":
    errors, count = check()
    print(f"Project entry check: {count} entries, {len(errors)} issues (fresh host discovery not implied)")
    for error in errors:
        print(error, file=sys.stderr)
    sys.exit(bool(errors))
