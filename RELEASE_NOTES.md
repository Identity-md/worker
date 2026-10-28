# Worker 0.1.8+1d98f47e

## What changed since worker-v0.1.8-260efc412cca

- Docs: Venice for goal items, for contributors and operators
- Worker: a goal item the plane lets run on Venice goes through a gateway of its own on 127.0.0.1, on the contributor's own key, with Claude Code or Codex as the runtime
- Protocol: a runtime may name the providers it can run on, a goal item's task the provider it may run through, and a receipt the provider it ran on
- Worker: a fork check that fails says at startup that the machine is offered the same work
- Worker: a Codex fork task on Linux reaches its fork from the jail, which admits every socket it mounts there and checks that the rest stay out

Source commit `1d98f47e11a0`.
