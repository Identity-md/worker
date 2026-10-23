# Worker 0.1.4+dd1aa5f3

## What changed since worker-v0.1.2-a9b5b7319c35

- Worker: a configuration file the step's paths name may be changed
- Tests: on Linux, Codex's fork-socket check must agree with its sandbox, which refused the socket
- Worker: an endpoint has lost a fork's block only when it says so in those words
- Worker: Codex fork tasks go under the jail only where a startup check shows it admits a fork's socket
- Worker 0.1.4: fork sockets, Codex fork tests under the jail, and declining a block the endpoint lost
- Fork tests: a block that is no longer recent goes to machines whose RPC keeps the chain's history
- Verifier: forge runs submitted Solidity with no network but its fork's socket
- Worker: a fork-test task's fork is a socket, which Codex's sandbox admits and nothing else on the network
- Worker: a fork read naming the pinned block by its bare hash, as forge 1.8.3 does, is the pinned block
- Skills and worker: the verifier runs fork tests again at the same block
- Protocol: a media tool named by what it turns into what is a tool when it refuses
- Plane: a verifier re-running a submission's fork tests reads the chain through the plane's RPC
- Protocol: the fork rule and the fork variables' names are shared by the worker, the verifier and the plane
- Worker 0.1.3: runs a task's fork tests through its own RPC at the pinned block, and does not submit when they did not run or failed
- Plane: a request that asks for fork tests sends its tests step to machines with their own RPC, round the wallets, at a block pinned per job
- Docs: the worker's READMEs say what the worker does today

Source commit `dd1aa5f3d11e`.
