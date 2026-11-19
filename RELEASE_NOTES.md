# Worker 0.1.40+2bde77dd

## What changed since worker-v0.1.39-11e05da8c1c9

- Worker 0.1.40: public operators read an old pinned block only where this machine's endpoint gave no answer
- Juror root check: a group held under a wallet's name stays acceptable, and key-log reads are bounded
- Worker 0.1.40: decline a cancel on the plane's word, and read old owners on the public pair
- Juror root check: a cancel signs only on what the chain shows, and only signed changes count
- Juror root: refuse a root only for a key changed before its proposal
- Worker 0.1.40: a root's clusters by the shared grouping, its age by its proposal
- Protocol: one grouping for a next juror root, and a root's age counted to its proposal
- Worker 0.1.40: a juror checks and signs juror root changes
- Protocol: what a juror checks before it signs a juror root change

Source commit `2bde77dd8693`.
