# Worker 0.1.8+c78f45fe

## What changed since worker-v0.1.8-0354a8355e4c

- Worker and verifier: a killed solc is read only from a build, as forge's own whole line
- Revert "Worker and verifier: a site export step that finds dist/ already built submits the tree as it is"
- Launch check: copies of one source at two profiles stay attested, and twins from two files are refused as before
- Skills: a site's import step may write dist/.well-known/, where a Farcaster mini app's manifest lives
- Worker and verifier: a site export step that finds dist/ already built submits the tree as it is
- Worker and verifier: a build whose solc the machine killed is the machine's, though forge exits 1
- Launch check: a contract two build artifacts share is refused only when launch.json names it
- Plane: a step that may write anywhere is redone when its earlier output no longer applies, as a path-scoped one is
- Report bot: a bug report tagged in the daemon group, or spotted there by a cheap model, becomes an issue for the fix workflow

Source commit `c78f45fe4ce3`.
