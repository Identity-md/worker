# Worker 0.1.42+7d29ca19

## What changed since worker-v0.1.41-c253a67bf8ef

- Worker: a gh that exits before reading its input is answered by its exit, never an uncaught EPIPE that stops the worker
- Worker 0.1.42: gh's HTTP status is read with String.match, so the shell-taint rule sees no exec
- Worker 0.1.42: imd doctor says whether this machine links its contributor's GitHub account
- Worker 0.1.42: the service runs the gh that imd github link found, and status asks the running worker whether it can
- Worker 0.1.42: a contributor allows each repository on their machine, so a new desk needs no release
- Protocol: a proof file's rules are keyed by its desk's kind, and its path comes from the desk's template
- Worker 0.1.42: imd github link proves the account is the contributor's with a short-lived secret gist before it keeps the link
- Outside desks: a contributor's GitHub link counts only once a secret gist of that account proves it theirs
- Worker 0.1.42: a contributor opts in to take part in outside proof desks under their own GitHub account
- Outside desks: only contributors who opted in take part; steps go under their handles and to their machines, and their own workers open the proofs
- Protocol: a proof for an outside desk is held to the desk's rules in plain TypeScript, and an outside pull request has a wire of its own

Source commit `7d29ca1926d5`.
