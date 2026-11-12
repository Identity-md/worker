# Worker 0.1.26+b51cee5a

## What changed since worker-v0.1.25-af53a3044754

- Juror: the machine's opt-out reaches a juror user, public reads go under the tier's limits, and the plane's word is asked again
- Worker: a third operator settles a difference on a public fork, and one bad operator no longer stops the suite
- Docs: two operators on every read, what jurors may read through the tier, and JURY_PUBLIC_RPC
- Juror: public reads only where the plane accepts them, a failed read is a wait, and a disagreement is checked on a fresh pair
- Worker: every read of a public fork is two operators' answer, and an offer they do not serve is declined
- Protocol: each public operator's log range, the chains a juror can read through the tier, and how independent the operators are
- Docs: the public RPC tier, its switch and worker 0.1.25
- Worker 0.1.25: the public RPC tier
- Juror: with no endpoint of its own, it reads and simulates on two public operators and signs only when both agree
- Worker: fork tests run through the public tier where a machine has no endpoint of its own
- Worker: a reader for the public RPC list that trusts no one endpoint
- Protocol: a vetted public RPC list per chain, and a hello that names the chains read through it

Source commit `b51cee5acc0b`.
