# Worker 0.1.8+a375dd80

## What changed since worker-v0.1.8-f36539234d54

- Oracle: nft-sale-median prices only coin paid away from the buyer, and fails on a dropped read
- Oracle: nft-sale-median counts each token once, signs the token count, and takes a spot statistic
- Oracle: an NFT collection's sale quantile, priced from Seaport and Blur logs
- Worker: the space after Reported's equals sign is back
- Docs: a thread Codex starts for itself is no helper, a Codex older than 0.145.0 trips like one of unread version, a killed run keeps its reason, and the self-test passes on Codex
- Tests: Codex runs whose stand-in ends on its own, replayed or counted or rate limited, get a wall clock no run reaches, so a loaded machine never turns one into a timeout
- Tests: a Codex that starts a helper for the self-test's command is wrong_tools, with the fix that points IDENTITYMD_CODEX_BIN at the CLI
- Worker: the self-test says a Codex helper trip passes its one command and idles nothing, and its wrong_tools fix for Codex points IDENTITYMD_CODEX_BIN at the CLI
- Tests: a Codex run given no helpers that ran one fails on it whether it exited non-zero or exited 0 with no turn.completed, keeping Codex's own error and not the agent's message
- Worker: a Codex run that fails on a helper it was not given keeps the error Codex itself ended it with after its words, never the agent's message
- Tests: a Codex 0.164 run whose approval Codex's own reviewer answered, recorded, passes with the reviewer on its receipt, and a thread of a kind the worker does not know fails as a helper
- Worker: a thread Codex starts for itself in a run's session, as the reviewer of an approval, is billed and logged and is no helper; a kind the worker does not know still is
- Docs: a Codex run's own thread counts the larger of its session file and its stream, and the worker logs only a file short of the stream
- Worker: a Codex run's compressed-rollout warning counts only files whose thread id says it may be the run's, not every one compressed while it ran
- Tests: a replayed Codex run that was cancelled or timed out ends once its stand-in printed its stream, not after a set delay a loaded machine outlasts
- Tests: the Codex tree reader counts a thread from the first rollout naming it, reads the day before the run started, and reads a one-line rollout with no newline
- Worker: a Codex run's own thread is the first its stream announces, so a thread announced after it never stands in for the run's tree
- Worker: a Codex run's own thread counts the larger of its session's and its stream's tokens, so a remote compaction is on its receipt, and only a session short of its stream is logged
- Worker: a Codex run whose own session holds no token total counts its own thread as the stream stated it, not as 0
- Docs: a Codex run given no helpers that starts one fails as tools_unexpected: spawn_agent, and a helper's helpers are logged
- Tests: Codex 0.164 runs given no helpers, recorded through the adapter's own args, fail on a helper of their own and never on another session's
- Worker: a Codex run given no helpers that ran one fails as tools_unexpected: spawn_agent, billed for every thread, and a helper's own helpers are logged as helpers_nested
- Docs: a Codex receipt adds up every thread of the run's tree from Codex's own session files
- Tests: Codex 0.164 trees recorded against a stand-in add up to what it billed, through the reader and the adapter
- Worker: a Codex run's receipt counts every thread whose rollout names the run as its session, helpers of helpers included

Source commit `a375dd802924`.
