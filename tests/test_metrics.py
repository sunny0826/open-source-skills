import importlib.util
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch
from urllib.error import HTTPError, URLError

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "skills/openrank/scripts/metrics.py"
spec = importlib.util.spec_from_file_location("metrics", SCRIPT)
metrics = importlib.util.module_from_spec(spec)
spec.loader.exec_module(metrics)


class SeriesTests(unittest.TestCase):
    def test_latest_respects_period_kind(self):
        values = {"2025-12": 0, "2025Q4": 7, "2025": 23, "2025-13": 99, "2024-11": 8}
        self.assertEqual(metrics.extract(values, "stars"), ("ok", "2025-12", 0))
        self.assertEqual(metrics.extract(values, "stars", kind="quarter"), ("ok", "2025Q4", 7))
        self.assertEqual(metrics.extract(values, "stars", kind="year"), ("ok", "2025", 23))

    def test_nested_average_quantile_and_distribution(self):
        data = {"avg": {"2025Q4": 6}, "quantile_2": {"2025Q4": 2}, "levels": {"2025Q4": [3, 0, 1, 3]}}
        self.assertEqual(metrics.extract(data, "issue_response_time", "2025Q4"), ("ok", "2025Q4", 6))
        self.assertEqual(metrics.extract(data, "issue_response_time", "2025Q4", statistic="quantile_2")[2], 2)
        self.assertEqual(metrics.extract(data, "issue_response_time", "2025Q4", statistic="levels")[2], [3, 0, 1, 3])

    def test_no_annual_aggregation(self):
        self.assertEqual(metrics.extract({"2025-01": 2, "2025-02": 3}, "openrank", "2025"),
                         ("missing_period", "2025", None))

    def test_null_latest_does_not_silently_fall_back(self):
        self.assertEqual(metrics.extract({"2025-11": 8, "2025-12": None}, "stars"),
                         ("missing_period", "2025-12", None))

    def test_invalid_shapes_do_not_look_like_missing_period(self):
        for data in ([], {"avg": {"2025-01": 2}}, {"2025-01": True}, {"2025-01": "2"}, {"2025-01": float("nan")}):
            with self.subTest(data=data):
                self.assertEqual(metrics.extract(data, "stars", "2025-01")[0], "unsupported_shape")

    def test_absent_statistic(self):
        self.assertEqual(metrics.extract({"avg": {}}, "issue_age", statistic="quantile_4")[0], "unsupported_shape")

    def test_empty_periods(self):
        self.assertEqual(metrics.extract({}, "stars")[0], "missing_period")

    def test_target_validation(self):
        self.assertEqual(metrics.validate_target("owner/repo"), "repository")
        self.assertEqual(metrics.validate_target("user"), "developer")
        for bad in ("../repo", "https://evil.test", "owner/repo/extra", "owner/", "a?b", "a#b"):
            with self.assertRaises(ValueError):
                metrics.validate_target(bad)

    def test_distinct_network_failures(self):
        args = ("stars", "github", "owner/repo", "2025-01", "month", "avg")
        for error, status in ((HTTPError("url", 404, "missing", {}, None), "not_found"),
                              (HTTPError("url", 403, "denied", {}, None), "fetch_error"),
                              (URLError("unavailable"), "fetch_error")):
            with patch.object(metrics, "urlopen", side_effect=error):
                self.assertEqual(metrics.observe(*args)["status"], status)

    def test_developer_does_not_fetch_repository_only_metrics(self):
        with patch.object(metrics, "urlopen") as fetch:
            self.assertEqual(metrics.observe("stars", "github", "person", "latest", "month", "avg")["status"], "not_applicable")
            fetch.assert_not_called()

    def test_cli_uses_standalone_fixtures(self):
        fixtures = ROOT / "skills/openrank/evals/fixtures"
        proc = subprocess.run([sys.executable, str(SCRIPT), "--target", "a/b", "--metrics", "issue_response_time,stars",
                               "--period", "2025-12", "--input-dir", str(fixtures)], capture_output=True, text=True)
        self.assertEqual(proc.returncode, 0, proc.stderr)
        rows = json.loads(proc.stdout)["observations"]
        self.assertEqual([x["value"] for x in rows], [0, 0])
        self.assertEqual([x["unit"] for x in rows], ["day", "count"])

    def test_invalid_json_and_missing_file(self):
        with tempfile.TemporaryDirectory() as tmp:
            Path(tmp, "stars.json").write_text("not json")
            self.assertEqual(metrics.observe("stars", "github", "a/b", "latest", "month", "avg", tmp)["status"], "unsupported_shape")
            self.assertEqual(metrics.observe("activity", "github", "a/b", "latest", "month", "avg", tmp)["status"], "not_found")

    def test_cli_rejects_bad_period_before_network(self):
        proc = subprocess.run([sys.executable, str(SCRIPT), "--target", "a/b", "--period", "2025-13"], capture_output=True)
        self.assertEqual(proc.returncode, 2)


if __name__ == "__main__":
    unittest.main()
