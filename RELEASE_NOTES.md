# Worker 0.1.7+2955ca33

## What changed since worker-v0.1.5-0f0bbf529816

- Worker: a jailed run's pnpm 11, Yarn 4 and Corepack caches are in its workspace too
- Goals: the code item's worker release numbered after master's
- Goals: the orchestrator's migration and worker release numbered after master's
- Worker: a Codex run's subagent tokens are counted
- Verifier: a named output is held to the JSON Schema its task gives
- Worker 0.1.5: a goal's code item runs jailed, with its package caches in its checkout
- Protocol: a signed task for merging a goal's code wave into its trunk
- Worker: a goal task's runs may hold four subagents, one level deep, on both runtimes
- Worker: a Claude task has only its profile's tools, none that reach past the task
- Worker: a Codex task spawns no subagents, as a Claude task already does
- Worker 0.1.4: a goal's orchestrator and judge run under the read jail

Source commit `2955ca33bf4b`.
