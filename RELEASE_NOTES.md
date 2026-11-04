# Worker 0.1.15+e63fe50a

## What changed since worker-v0.1.15-c344ba4ff4f6

- Worker: goal jobs on a contributor's key take a yes: imd rpc goals off stands, and input that has ended is no answer
- Worker: piped input answers in order whenever it arrives, and imd rpc setup stops asking once it has ended
- Tests: the settings restart runs in a describe of its own, past the gate's 90 seconds
- Docs: imd rpc setup and the worker's own restart
- Worker: imd rpc setup fills Ethereum, Base and Robinhood Chain from one key, checks each, and asks about goal jobs
- Worker: a worker with --auto-update restarts itself, once idle, for RPC or provider settings saved while it runs
- Worker: a prompt holds nothing open once it is answered, so imd rpc add returns to the shell

Source commit `e63fe50a5dc3`.
