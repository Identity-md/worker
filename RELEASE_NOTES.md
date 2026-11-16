# Worker 0.1.35+89b36762

## What changed since worker-v0.1.34-6340c569e5cb

- Tests: pin the QR cross-check's encoder back to qr 0.5.5
- Test: the adopted votes folder is made only where the test's user is not alice's uid 1000
- Juror without systemd: the supervisor's line makes the run folder, then hands it over
- Worker 0.1.35: the juror setup no longer stops at EPERM in the IMD box
- Bump the npm-minor-and-patch group with 11 updates
- CI: the juror sync's journal is read until it settles, so a run that just ended is never read empty

Source commit `89b367629909`.
