# Worker 0.1.9+a6eb4461

## What changed since worker-v0.1.8-c78f45fe4ce3

- Worker 0.1.9: a quick answer runs under the read jail
- Worker: a jailed Claude run whose sandbox refused every shell command it tried sends nothing, and its self-test fails
- Worker: Claude's jail check nests a user namespace as its sandbox does

Source commit `a6eb446119eb`.
