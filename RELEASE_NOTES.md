# Worker 0.1.23+3b1cb836

## What changed since worker-v0.1.21-06df205845c7

- Worker: a sealed task leaves no build behind, since a build's archive leaves the machine plain
- Worker 0.1.23: the release that seals, now that 0.1.21 is the prebuilt files' and 0.1.22 is kept for the juror setup
- Worker tests: a sealed task is held to the upload try limit and the wall clock stop, and says no more for them
- Worker 0.1.21: the release that seals, now that 0.1.20 is the hang fixes'
- Sealed tasks: what a goal's item leaves elsewhere in its workspace stays behind, and its prompt says so
- Sealed audits: the job's key goes only to the seat that took the judge's step
- Protocol: a seal refuses a key that shares no secret, whatever OpenSSL does
- A sealed job's files are read a page at a time
- Worker 0.1.17: a sealed task's results leave the machine encrypted, and imd seal reads them
- Protocol: a file can be sealed so only the keys it names can read it

Source commit `3b1cb8367c19`.
