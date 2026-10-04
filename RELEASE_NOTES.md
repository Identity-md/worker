# Worker 0.1.0+bb1c0c94

## What changed since worker-v0.1.0-6d86b7ef91a5

- Codex gets its prompt as an argument when it fits, and an invalid bearer token pauses the machine
- A hook launch's token supply is told to whoever writes the source, and checked at attestation
- A launch never asks for more gas than one transaction may use, and failures no longer carry RPC keys

Source commit `bb1c0c94e714`.
