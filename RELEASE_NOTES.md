# Worker 0.1.8+ddb63cea

## What changed since worker-v0.1.8-1d98f47e11a0

- Worker: Venice has 15 seconds to answer the worker's own reads, at start and before a goal task
- Worker: a Venice reply cut off in the middle of a tool call says max_tokens, as Anthropic's does
- Worker: a Venice reply still streaming stops when its task ends or its runtime hangs up
- Worker: the login's rerun of a failed Venice run starts where that run did
- Worker: a Venice rate limit past the CLI's retries runs the goal task again on the login

Source commit `ddb63ceaa77b`.
