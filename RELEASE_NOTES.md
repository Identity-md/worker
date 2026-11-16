# Worker 0.1.36+17d5dce1

## What changed since worker-v0.1.35-89b367629909

- Worker 0.1.36: the juror invite, since 0.1.35 is the EPERM fix (#1044)
- CI: the invite probe's handler asks for keys on the machine as the worker does
- Worker 0.1.35: a request carries an earlier key's jail marker over and never removes one while a juror key is on the machine
- CI: the invite scenario reads done as the worker now says it, a state with no words
- CI: a process an unjailed task left still running means no key, and the marker that jails every task is root's
- Worker 0.1.35: a juror request's jail survives a restart, cancels no one's work, ends what earlier runs left, and withdraws its link if the worker stops
- Worker: each agent run's process group is known, so what a run left behind can be ended later
- Protocol: a juror invite's status says where it stands as a fixed code, the machine's words beside it for the holder
- CI: the invite scenario checks every task is jailed and work held before any key, the operator's switch, codes, and a replay after a restart
- Worker 0.1.35: a juror request jails every task and waits on the unjailed ones before any key, and its operator can turn requests off
- Protocol: a machine's juror eligibility says why not as a fixed code, and its invite status names the key it made
- Worker 0.1.35: the worker's log never carries the link a juror request leaves, and CI checks its own words
- CI: a root worker takes a holder's relayed request, refuses forged ones, and files a key request the holder signs
- Worker 0.1.35: a machine with no juror says what it can do toward one, and becomes one when its holder asks from the seat's page
- Worker: the jury's machine deps live in jury/machine.ts, unchanged, so a test can run them
- Protocol: a holder's JurorInvite, the hello's jurorEligibility, and the frames that carry an invite to a machine and its answer back

Source commit `17d5dce116dc`.
