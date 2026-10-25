# Worker 0.1.8+f3653923

## What changed since worker-v0.1.7-176931c4c6b1

- Worker: a Codex's hello and its runs read one helper count, and the skills pin says what it leaves open
- Worker: the Codex probe reads its version with codexAtLeast, which master's #693 renamed
- Docs: a Codex run has no goals, questions, sleep, skills list or hooks from Codex 0.163
- Worker: a Codex the worker updates is never older than the one its tool pins hold on
- Worker: a Codex run has no goals, no question for a person, no sleep, no skills list and no hooks, from Codex 0.163.0
- Tests: the auto-update test's hellos say Codex holds no helpers and cannot meter them
- Docs: the protocol README says a hello's runtime may say what it does with helpers
- Plane: a task's helpers are what its machine's runtime says it holds, never its name
- Worker: each runtime says in the hello how many helpers it holds, within the machine's share
- Protocol: a hello's runtime says how many helpers it holds and whether their tokens are metered
- Worker: a run's helpers stay on its model when the contributor's settings.json turns the force off
- Worker: a Claude run stopped at init is checked to report no tokens, whatever its stream carries after
- Worker: the Codex subagent cap's comment names threadUsage, the reader's name on this branch
- Tests: imd start's helper cap reaches a goal task's runs, through the deps it builds for executeTask
- Worker: a Claude result that names no tokens is checked to send its messages' sum on its usage event
- Worker: a Codex session's usage record is taken only for the thread the file is
- Worker: a subagent run that reaches its result is checked not to add its messages' sum again
- Worker: a run's helpers run on the run's own model, whatever model a spawn names
- Docs: a skill's helper count, who may lower it, and that an audit's helpers read what the run can
- Worker 0.1.8: a contributor caps the helpers on their machine, and its tasks and helpers stay within eight agent loops
- Worker: a run's helpers are its task's pinned count, under the worker's own ceiling for the skill
- Worker: the README says how a run that ends before its last word is counted
- Worker: a Codex run that never reaches turn.completed reports its thread's tokens from its session
- Worker: Claude runs stream partial messages, so a killed run counts each message's output
- Worker: a Claude run that never reaches its result reports the tokens its messages spent
- Plane: /skills says how many helpers each skill's runs may use, and imd skills list says so too
- Protocol: a task's execution may carry its helper count, 0 to 16 on the wire

Source commit `f36539234d54`.
