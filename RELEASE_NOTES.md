# Worker 0.1.7+176931c4

## What changed since worker-v0.1.7-254534654339

- Worker: an inherited login descriptor name never points Claude at the other login's pipe
- Docs: a run's environment holds its own runtime's settings, and its commands not the CLI's login
- Worker: a contributor's CLAUDE_CODE_SUBPROCESS_ENV_SCRUB cannot stop a Claude run's edits
- Worker: a Claude run's login reaches Claude Code on a pipe, never its commands
- Worker: a Codex run's commands start in a plain shell, without Codex's keys and settings or a declared tool key
- Worker: no zsh startup file of the contributor's runs in a task's commands, and on macOS they keep the system's own PATH
- Worker: a run's environment carries its own runtime's settings and logins, never the other's

Source commit `176931c4c6b1`.
