# Worker 0.1.9+3dcb4df2

## What changed since worker-v0.1.9-a6eb446119eb

- Protocol: a review sender may report a batch deferred, nothing tried because its writer cannot pay for it at its fee, which costs the batch no attempt
- Scripts: a goal replay harness: stored bodies with answer keys, a runner that checks them with the plane's own schemas, a watcher that records the baseline, and a grader

Source commit `3dcb4df2b7b7`.
