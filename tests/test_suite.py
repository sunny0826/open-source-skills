import json
import shutil
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from evaluate import score
from skill_suite import catalog, cases, request
from validate_skills import validate
from sync_local_skills import sync


class EvaluationTests(unittest.TestCase):
    def setUp(self):
        self.case = {"id": "example", "kind": "behavior", "should_trigger": True, "expectations": ["Preserve zero", "No invented value"]}
        self.observation = {"selected_skills": ["openrank"], "response": "zero", "tool_calls": []}

    def test_unreviewed_behavior_cannot_pass(self):
        self.assertEqual(score(self.case, self.observation, "openrank"), "unreviewed")

    def test_review_is_bound_to_exact_observation(self):
        review = {"run_sha256": "old", "case_id": "example", "checks": [True, True], "evidence": "both values checked"}
        self.assertEqual(score(self.case, self.observation, "openrank", review, "new"), "invalid_review")
        self.assertEqual(score(self.case, self.observation, "openrank", review, "old"), "pass")
        review["checks"][1] = False
        self.assertEqual(score(self.case, self.observation, "openrank", review, "old"), "fail")

    def test_partial_review_cannot_pass(self):
        review = {"run_sha256": "hash", "case_id": "example", "checks": [True], "evidence": "one only"}
        self.assertEqual(score(self.case, self.observation, "openrank", review, "hash"), "invalid_review")

    def test_negative_trigger_and_overselection(self):
        case = {**self.case, "kind": "trigger", "should_trigger": False}
        self.assertEqual(score(case, self.observation, "openrank"), "fail")
        self.assertEqual(score(case, {**self.observation, "selected_skills": []}, "openrank"), "pass")
        self.assertEqual(score(self.case, {**self.observation, "selected_skills": ["openrank", "open-source-analysis"]}, "openrank"), "fail")

    def test_invalid_observation(self):
        self.assertEqual(score(self.case, {"selected_skills": "openrank"}, "openrank"), "invalid_observation")

    def test_evaluation_request_hides_answer(self):
        entry, case = next(cases(skill="openrank"))
        payload = request(entry, case)
        self.assertNotIn("should_trigger", payload["case"])
        self.assertNotIn("expectations", payload["case"])
        self.assertIsNone(payload["skill"])

    def test_missing_model_observations_exit_nonzero(self):
        with tempfile.TemporaryDirectory() as tmp:
            p = subprocess.run([sys.executable, str(ROOT / "scripts/evaluate.py"), "score", "--skill", "openrank", "--output", tmp], capture_output=True, text=True)
            self.assertEqual(p.returncode, 1)
            self.assertIn("missing_observation", p.stdout)

    def test_adapter_error_is_not_a_pass(self):
        with tempfile.TemporaryDirectory() as tmp:
            p = subprocess.run([sys.executable, str(ROOT / "scripts/evaluate.py"), "run", "--skill", "openrank", "--output", tmp,
                                "--adapter", sys.executable, "-c", "import sys;sys.exit(3)"], capture_output=True, text=True)
            self.assertEqual(p.returncode, 1)
            self.assertIn("adapter_error", p.stdout)

    def test_behavior_request_contains_resource_location(self):
        entry, case = next((e, c) for e, c in cases(skill="openrank") if c["kind"] == "behavior")
        payload = request(entry, case)
        self.assertTrue((Path(payload["skill_root"]) / "references/metrics.md").exists())
        self.assertIn("references/metrics.md", payload["resource_sha256"])

    def test_changed_request_cannot_reuse_observation(self):
        with tempfile.TemporaryDirectory() as tmp:
            cmd = [sys.executable, str(ROOT / "scripts/evaluate.py")]
            subprocess.run(cmd + ["prepare", "--skill", "openrank", "--output", tmp], check=True, capture_output=True)
            entry, case = next(cases(skill="openrank"))
            name = "openrank--" + case["id"]
            path = Path(tmp) / (name + ".request.json")
            data = json.loads(path.read_text())
            data["case"]["prompt"] = "different request"
            path.write_text(json.dumps(data))
            (Path(tmp) / (name + ".observation.json")).write_text(json.dumps(self.observation))
            result = subprocess.run(cmd + ["score", "--skill", "openrank", "--output", tmp], capture_output=True, text=True)
            self.assertEqual(result.returncode, 1)
            self.assertIn("stale_or_missing_request", result.stdout)


class PackagingTests(unittest.TestCase):
    def test_catalog_and_fixtures_validate(self):
        errors, count, total = validate()
        self.assertEqual(errors, [])
        self.assertEqual(count, 14)
        self.assertGreaterEqual(total, 84)

    def test_single_skill_copy_has_all_referenced_resources(self):
        _, entries = catalog()
        for entry in entries:
            with self.subTest(skill=entry["name"]), tempfile.TemporaryDirectory() as tmp:
                destination = Path(tmp) / entry["name"]
                shutil.copytree(entry["path"], destination, ignore=shutil.ignore_patterns("__pycache__"))
                self.assertTrue((destination / "SKILL.md").is_file())
                suite = json.loads((destination / "evals/evals.json").read_text())
                self.assertTrue(all((destination / f).is_file() for c in suite["evals"] for f in c["files"]))
                if entry["name"] == "openrank":
                    p = subprocess.run([sys.executable, str(destination / "scripts/metrics.py"), "--target", "a/b", "--metrics", "stars",
                                        "--period", "2025-12", "--input-dir", str(destination / "evals/fixtures")],
                                       cwd=tmp, capture_output=True, text=True)
                    self.assertEqual(p.returncode, 0, p.stderr)
                    self.assertEqual(json.loads(p.stdout)["observations"][0]["value"], 0)

    def test_local_link_migration_preserves_content_and_other_lock_owners(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp) / "repo"
            (root / ".claude-plugin").mkdir(parents=True)
            shutil.copy2(ROOT / ".claude-plugin/marketplace.json", root / ".claude-plugin/marketplace.json")
            shutil.copytree(ROOT / "skills", root / "skills", ignore=shutil.ignore_patterns("linear-design", "__pycache__"))
            old = root / ".agents/skills/openrank"
            old.mkdir(parents=True)
            (old / "custom.txt").write_text("keep me")
            lock = root / "skills-lock.json"
            lock.write_text(json.dumps({"skills": {"openrank": {}, "unrelated": {"source": "elsewhere"}}}))
            self.assertEqual(sync(root)["entries"], 42)
            self.assertFalse(old.is_symlink())
            backup = Path(tmp) / "saved"
            sync(root, backup)
            self.assertEqual((backup / ".agents/skills/openrank/custom.txt").read_text(), "keep me")
            self.assertEqual(old.resolve(), (root / "skills/openrank").resolve())
            self.assertEqual(list(json.loads(lock.read_text())["skills"]), ["unrelated"])
            self.assertEqual(sync(root)["entries"], 0)
            self.assertEqual(sync(root, Path(tmp) / "unused")["entries"], 0)
            self.assertFalse((Path(tmp) / "unused").exists())


if __name__ == "__main__":
    unittest.main()
