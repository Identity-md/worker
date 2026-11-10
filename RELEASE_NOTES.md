# Worker 0.1.18+b45b78de

## What changed since worker-v0.1.17-33599a325902

- Goals: a batch that names only a platform is matched on each machine's hello os and arch, so it reaches older workers too
- Worker 0.1.18: the hello says what the machine gives its tasks, its CPUs and memory as its cgroups allow and the tools a jailed task can run
- Protocol: a hello may say what a machine gives its tasks, and a node's execution what its machine must have

Source commit `b45b78de89d3`.
