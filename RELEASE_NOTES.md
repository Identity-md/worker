# Worker 0.1.11+f00a3629

## What changed since worker-v0.1.11-06a20c1d797a

- Tests: the hung-npm runtime-gate test gives each killed process 2 s to leave the process table before calling it alive
- Tests: the read-cache refresh and the Codex check-in-wall-clock tests leave a loaded CI runner room, so neither fails on timing alone

Source commit `f00a3629f9b3`.
