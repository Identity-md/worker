# Worker 0.1.29+7da67657

## What changed since worker-v0.1.29-960357226b8c

- Worker: Codex's own SOCKS proxy is off for every jailed run with the network
- Worker: a jailed task is not handed the contributor's browser tool
- Docs: what a jailed task reaches with its sandbox behind the worker's filter, and what is still open
- Worker: a jailed task's sandbox is put behind the worker's filter, and reaches its relays and nothing else on this machine
- Worker: a repository's submodules are fetched through the worker's egress filter

Source commit `7da676575909`.
