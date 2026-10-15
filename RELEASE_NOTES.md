# Worker 0.1.2+63e0a393

## What changed since worker-v0.1.2-c0fadb97de30

- The self-test runs under the jail where it holds, and a runtime that exits on start is a fault
- A hook's constructor can take its launch number as "$launchNumber"
- A Claude sandbox refused by a nested-userns kernel reads as a sandbox that cannot start

Source commit `63e0a3936c13`.
