# Worker 0.1.20+2e42ff9c

## What changed since worker-v0.1.19-15e8bc6b0128

- Jury: a juror key link is made only for the machine the seat's holder paired to it
- Worker 0.1.20: the release that carries the hang fixes
- Worker: every step after the agent is bounded, and a task 30 minutes past its wall clock is stopped and reported
- Worker: a cited page that never ends no longer holds its goal item, and the citation check returns by its minute
- Jury: a juror's machine leaves its key change with the plane, and the holder's signature for it comes back by a link
- Dependencies: the wallet kit's unused query-string is dropped, and decode-uri-component with it
- Dependencies: follow-redirects moves to 1.16.2, since the pinned 1.16.1 has an advisory of its own

Source commit `2e42ff9c876c`.
