# Worker 0.1.33+3a9efcd3

## What changed since worker-v0.1.32-adaa52c0d933

- Linux scenarios: the timer's schedule read from systemd's listing, and the status read by root's copy as the worker's user
- Worker 0.1.33: the sync's journal keeps what the sync says, and not the session lines PAM logs for each runuser
- Docs: the juror user keeps itself up to date, hourly, as root, and why
- Linux scenarios: enable turns the juror's timer on, a sync writes it back, and its service brings a juror left behind up to date
- Worker 0.1.33: a juror user keeps itself up to date by root's hourly timer
- Worker: a root worker's start that brought its juror up says so once, and not also that it did not

Source commit `3a9efcd3de16`.
