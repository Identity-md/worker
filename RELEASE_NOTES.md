# Worker 0.1.25+af53a304

## What changed since worker-v0.1.24-34df1ac63553

- foundry-guard tests: the abort comes once the grandchild has recorded its pid, not 300 ms in
- Worker tests: a run is cancelled once its check has started, not 200 ms in
- Worker: the seat written down is the one the last read names, and a key the plane registered in place of this machine's is said in those words
- Juror docs: a pairing never replaces a juror key, the move between one holder's seats, and what a machine is told
- Worker: a machine that reads paired waits for what became of its juror key, and says what happened
- juror-linux: the pairing scenario runs while Claude's sandbox engine is installed, and pairs as before where the jail cannot start
- juror-linux: imd pair as root makes a juror with one signature, and pairs as before with --no-juror or on an older plane
- Worker 0.1.25: a new machine becomes a juror when it pairs, with the one signature that pairs it
- Protocol: one message for pairing a machine and naming its juror key, and the key's own proof for a pairing code

Source commit `af53a3044754`.
