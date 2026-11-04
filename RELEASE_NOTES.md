# Worker 0.1.15+5315b319

## What changed since worker-v0.1.15-e63fe50a5dc3

- Worker: a jailed media task on Codex can copy the picture its image generation drew, so token-logo and create-image work under the jail again
- Protocol: BUYBACK_PINS, pinnedAddress and pinsArgument live beside BUYBACK_ARGS, so the juror's scope check can read the same pins the compiler holds
- Docs: say what the docker line in the public worker README is for
- Worker: a goal item stops at its cost cap, and every receipt carries what its run cost
- Protocol: a receipt says what its run cost, a provider task may carry a cost cap, and a runtime says it holds one
- Docs: the public worker README sets up RPC with imd rpc setup, and describes the relay as it is since 0.1.10
- Plane: buyback, distribution and vesting intents compile to the canonical owner contracts once CANONICAL_CONTRACTS names a chain

Source commit `5315b319865b`.
