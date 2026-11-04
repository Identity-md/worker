# Worker 0.1.12+dadf30a7

## What changed since worker-v0.1.11-7f615fcc0906

- Tests: the doors' red team makes Claude Code's own temp folder for srt, as Claude Code does, so pnpm builds there on Linux
- Worker: the jail's startup check and every run jailed before 0.1.12 read exactly master's roots; a door's build adds only paths a sandbox can mount
- Worker: the door skills run jailed wherever this machine's jail holds and as before where it does not, so no machine stops running one
- Protocol: oracleJuryDigest is the attester's digest of an answer in its consumer's domain
- Worker: the jail opens a user npm prefix's launcher folder beside its packages, so pnpm installed there is found
- Worker: a jailed Codex run is handed allow_local_binding only from Codex 0.163.0, the fleet's floor
- Protocol: the oracle jury's struct hash, draw key, approval digest and proof, as OracleJuryVerifier computes them
- Worker 0.1.12: every door a goal's child goes through runs under the read jail, on Claude and Codex

Source commit `dadf30a7bde4`.
