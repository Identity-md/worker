# Worker 0.1.2+78d471e4

## What changed since worker-v0.1.2-b326004f0a52

- Wire the egress filter into the worker behind IDENTITYMD_EGRESS_FILTER=1, with loopback bypass
- Open the macOS svm path in jailReadRoots, add a Codex smoke, and tie the per-runtime jail test to build-contract-project
- Phase B.2: jail build-contract-project tasks on both Claude and Codex workers
- Add SSH private keys to the host-exposure probe list
- Phase B.1: jail research-report tasks on both Claude and Codex workers
- A worker flags when a task could take over its host or read local secrets, and can be told to refuse

Source commit `78d471e48ecb`.
