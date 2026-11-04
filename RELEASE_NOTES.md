# Worker 0.1.14+212b225e

## What changed since worker-v0.1.13-48c1bcfc1b2c

- Worker: git the daemon runs after a jailed run reads none of the repository's own configuration or hooks that run wrote
- Worker 0.1.14: a jailed run starts without the session's runtime folder and bus, so a jailed Linux task is told of no Secret Service

Source commit `212b225e006a`.
