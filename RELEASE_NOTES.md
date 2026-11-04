# Worker 0.1.13+e2656771

## What changed since worker-v0.1.12-beb1864ae8dc

- Tests: a goal-chain task is handed the data relay on loopback, which its chain-only egress admits, after it is told its reach
- Worker 0.1.13: goal-chain's floor is the release that carries it, so no 0.1.12 worker is ever offered one
- Worker: a goal-chain task, a goal's intent item, runs jailed with chain-only egress on Claude and Codex, reaching its chain's endpoints and loopback and no other host
- Worker: a contributor lends tasks their own Etherscan, Dune or Brave Search key with imd data, served on 127.0.0.1 through a relay that allows only reads and stops each task at a quota
- Goals: chain batches compute figures over spans the plane pins, and the deployer's keyless figure lane reruns a tenth of them

Source commit `e2656771aa46`.
