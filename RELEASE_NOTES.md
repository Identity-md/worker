# Worker 0.1.2+d1681b55

## What changed since worker-v0.1.1-c23cfac63c00

- Root workers on Ubuntu 24.04 let only bubblewrap make user namespaces, so the jail runs without lifting the restriction
- CI: try the narrow bubblewrap AppArmor profile on stock Ubuntu 24.04, as a normal user and as root
- Claude's Linux jail check reads the kernel's user-namespace restriction, and CI requires its verdict to match the engine, as root too
- Claude's jail check maps the nested namespace, as the seccomp helper's setgroups write is what AppArmor refuses
- Claude's jail check nests a user namespace as its seccomp helper does: root on Ubuntu 24.04 passed one and failed the other
- CI: run the root jail check with root's own home, as a root worker does
- Name Ubuntu 24.04's namespace refusal correctly, and check the jail as root and with ripgrep in CI
- CI: stamp the worker build before its jail test, as its own test script does
- CI: build the worker's dependencies by its package name in the jail job
- Make the read jail work on Linux, where most workers run, and check it there in CI
- Worker 0.1.2: the read jail and runtime updates, so the plane can require them
- Keep Claude and Codex current from the idle updater, the newest release a day old
- Jail oracle members and research questions to their workspace, and start every agent with an allowlisted environment

Source commit `d1681b55b9ca`.
