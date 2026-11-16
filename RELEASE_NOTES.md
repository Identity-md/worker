# Worker 0.1.34+6340c569

## What changed since worker-v0.1.33-3a9efcd3de16

- Worker 0.1.34: uninstall removes the worker's user's folders without root walking them
- Worker 0.1.34: the newer copy a triggered sync hands over to is never answered by the last sync
- Worker 0.1.34: a request is answered by the last sync only while the copy is still the release it left
- Docs: a juror follows its worker's auto-update, and its holder is told when it is behind
- Linux scenarios: the worker's request brings a juror left behind up to date through root's trigger, and a second request is answered by that sync
- Worker 0.1.34: a juror follows its worker's auto-update within seconds, and its holder is told when it is behind
- Protocol: a hello may say what state its juror user's copy of the worker is in

Source commit `6340c569e5cb`.
