# Worker 0.1.17+1dd97a72

## What changed since worker-v0.1.16-3850b8948cda

- Worker 0.1.17: the release that carries the four goal step fixes
- Worker: an upload the plane could not take is sent again, three tries in all
- Worker: a decisions file is checked against its schema before it is sent, and a fault names its field
- Worker: a run on Claude Code is told how many turns it has
- Worker: what a goal item leaves in its workspace is left behind, not a path violation
- Worker tests: the 2,500-file diff test gets 60 s of its own, the suite's 20 s being a loaded runner's coin flip

Source commit `1dd97a726ab7`.
