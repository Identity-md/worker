# Worker 0.1.7+def7b689

## What changed since worker-v0.1.7-81f38041521a

- Worker: the run-environment test covers both Artifact switches, and its comments say where settings clear them
- Worker: a Claude run carries its pins in its own settings, which outrank the contributor's settings.json
- Worker: a research run without WebFetch answers from WebSearch instead of publishing the init check's refusal
- Worker: the init check's comments name the releases tried and when a stopped run's attempt goes back
- Worker: the wrong-tools fix names the settings.json env entry that outranks the worker's checklist pin
- Worker: a research or connected run on a provider without web search goes on with WebFetch
- Worker: a Claude run's environment cannot reshape it, link it to the contributor's session or keep its memory
- Worker: Claude denies every built-in tool that reaches past the task, from a census of 2.1.307 to 2.1.310
- Worker: a Codex run gets no subagents yet, a goal task's included
- Worker: a Claude run that starts without the tools it asked for is stopped at its init event
- Worker: a goal run's Claude subagents can only be its own read-only helper

Source commit `def7b689f068`.
