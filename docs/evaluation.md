# Running Skill evaluations

`mise run check` validates catalog paths, metadata, references, fixture/schema
consistency and deterministic parser/runner regressions. It does not run an LLM.

## Prepare a blind evaluation

```sh
mise exec -- python scripts/evaluate.py prepare --output /tmp/skill-eval-run
```

Requests include only discovery metadata for trigger tests. Behavior tests also
include the target Skill, raw fixtures, and `skill_root` pointing to a copied
standalone package under the run's `resources/` directory. Read supporting files
from that root, not from a host's previously loaded Skill path. Expected answers and trigger booleans
are omitted. Use a new output directory for each model/version/condition. For an
unskilled baseline omit `skill` from the adapter's model input; keep the original
request for provenance and label that condition in the observation metadata.

## Use an existing model runner

The adapter is an executable supplied by the operator, not a hard-coded provider
or new dependency. It reads one JSON request from stdin and emits one observation
object. Its arguments are passed directly without a shell. Use an absolute path
because each invocation gets a temporary working directory.

```sh
mise exec -- python scripts/evaluate.py run --skill openrank \
  --output /tmp/skill-eval-new-run --timeout 120 \
  --adapter /absolute/path/to/your-adapter
```

The adapter must enforce fixture-only/sandboxed tools. A temporary directory is
not an OS security sandbox. It must not call real GitHub mutations, deployments,
credential changes or destructive commands. Instrument actual tool calls;
do not accept model-invented tool histories as execution evidence.

Observation format:

```json
{
  "selected_skills": ["openrank"],
  "response": "Actual model response",
  "tool_calls": [],
  "model": "actual model identifier",
  "condition": "with-skill"
}
```

Use `<skill>--<case-id>.observation.json`. For manual agent experiments, record
the actual model/host if available and identify fixture-only/no-tools conditions.
Never submit an authored expected answer as a model observation.

## Grade evidence, not headings

Trigger selection is checked directly. Positive tests must select only the
target; negative tests must exclude it. An unrelated selection on a negative
case is not a complete routing-quality verdict: inspect the selected neighbor.

Behavior grading needs a reviewer to inspect the answer, fixtures and actual
tool record against every expectation, in order. Save a review as
`<skill>--<case-id>.review.json`:

```json
{
  "run_sha256": "sha256 of the exact observation file",
  "case_id": "behavior-1",
  "checks": [true, false, true],
  "evidence": "Explain which observed behavior supports each verdict."
}
```

```sh
mise exec -- python scripts/evaluate.py score \
  --output /tmp/skill-eval-run --reviews /tmp/skill-eval-reviews
```

Missing observations, unreviewed behavior, invalid results and adapter failures
produce nonzero exit status. They are never counted as passes. Bind runs to the
repository revision and model/host configuration in the final validation record.
For changed prompts or instructions, create a new run; old observations are not
evidence for a new version.
The scorer rejects stale requests when the current catalog, body, fixture or
supporting-resource hashes differ. Preserve run directories with their resource
snapshots and observations together; their absolute paths are local execution data.

Report routing positives/negatives and behavior separately. The small hand-curated
suite is a regression probe, not an estimate of production accuracy; use fresh
holdout prompts and repeated independent runs before claiming a broad improvement.
