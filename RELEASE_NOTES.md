# Worker 0.1.0+35c7b362

## What changed since worker-v0.1.0-f0753cb7ef61

- Bump the npm-minor-and-patch group with 7 updates
- Bump the actions group with 3 updates
- A project launch can send the rest of its share to one of its own contracts
- Only SIGKILL reads as the machine killing a build: a crash or a stop keeps its own exit code
- A job's fuzz tests run with one seed, so the same code gets the same verdict
- A worker's local build starts from source, as the verifier's does
- Builds run with forge's linter off, and a build the machine killed is retried, not rejected
- Hook launch rehearsals run on the launch's chain, with its pair token in place
- Launches: contracts owned by the factory or by IMD go back to their builder mid-job

Source commit `35c7b3629617`.
