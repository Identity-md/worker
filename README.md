# IdentityMD Worker

Run `imd` to contribute your own Claude Code or Codex runtime to IdentityMD tasks.
This repository contains the installable worker distribution and releases. Development happens in
the main project; an operator explicitly dispatches synchronization and release publication after
checks pass. Installed workers can opt in to automatic updates from those published releases.

## Where to run it

We recommend a Linux VPS rather than a personal computer. The worker only earns while it is
connected, and a VPS stays online, survives reboots with `imd service install --boot`, and keeps
task workspaces away from your own files and credentials. A Mac or Windows PC works too, as long
as it stays awake and signed in. Whichever machine you choose, install and sign in to Claude Code
or Codex on it first; the worker drives that runtime and uses its quota.

## Install

You need Node.js 22 or newer (Node 24 recommended), npm, Git, and an installed, authenticated
Claude Code or Codex CLI. Releases are public downloads; no GitHub account is needed to install.
Use either path below.

**With your terminal**

```sh
imd_install_dir="$(mktemp -d)"
(cd "$imd_install_dir" \
  && curl -fsSLO https://github.com/Identity-md/worker/releases/latest/download/identitymd-worker.tgz \
          -O https://github.com/Identity-md/worker/releases/latest/download/SHA256SUMS \
  && shasum -a 256 -c SHA256SUMS)
npm install --global "$imd_install_dir/identitymd-worker.tgz"
imd help
```

**With an agent**

Paste this into Claude Code or Codex running on the machine that will be the worker. It ends
before pairing, because pairing needs your wallet.

```text
Install the IdentityMD worker on this machine. Do not use sudo, and do not touch ~/.identitymd.
1. Check that `node --version` is 22 or newer and that npm, git and curl exist. If something is
   missing, tell me what it is instead of installing system packages.
2. In a fresh temporary directory, download these two files:
   https://github.com/Identity-md/worker/releases/latest/download/identitymd-worker.tgz
   https://github.com/Identity-md/worker/releases/latest/download/SHA256SUMS
3. Verify the archive with `shasum -a 256 -c SHA256SUMS` (or `sha256sum -c SHA256SUMS`).
   If it does not say OK, stop and tell me.
4. Run `npm install --global ./identitymd-worker.tgz`. If npm reports a permissions error, do not
   use sudo: set a user-owned prefix with `npm config set prefix ~/.npm-global`, put
   ~/.npm-global/bin on PATH in my shell profile, and retry.
5. Confirm that `imd help` runs and show me its first line.
6. Do not run `imd start`, `imd pair` or `imd service`. I will pair it myself.
```

Either way, the install registers `imd` globally; npm's global binary directory must be on your
PATH. If npm reports a permissions error, use a user-owned Node installation or global npm prefix.
Installation does not start the worker.

## Start and pair

```sh
imd start --concurrency 1
```

`imd start` stays in the foreground until you stop it.

First start guides you through pairing with the wallet that owns an eligible IdentityMD NFT and
registering that token as an ERC-8004 agent. An unregistered token cannot connect for work. The
pairing page checks for an existing registration before offering the wallet transaction.
One NFT authorizes one active device. Independent reviewers must use different wallets.
No inbound port is needed: the worker connects to the IdentityMD control plane over WSS.

```sh
imd start --runtime codex --concurrency 1
imd start --runtime claude --concurrency 1
imd status
imd skills
imd unlink
```

Choose one start command. With both runtimes installed, the default is Claude. Tasks use your own
agent account and quota. Skills are enabled by default; use `imd skills remove <id>` to opt out and
restart. Foundry is required for contract work. Ordinary website skills use network access and
worker-side build, typecheck and interaction validation; the verifier checks structure and integrity.
Docker is needed only for workflows selecting the optional browser-checker profile. Only installed
capabilities are advertised. Runtime restrictions vary; use a task
environment without unrelated credentials.

## Updates

To enable automatic updates, add `--auto-update` to your usual start command:

```sh
imd start --auto-update --concurrency 1
```

The worker checks the latest GitHub release when it starts and every five minutes. When an update
is available, it stops accepting new tasks and lets current work finish. It downloads the release
from github.com over HTTPS, verifies the checksum, and tests an offline installation in a temporary
directory before replacing this global installation. It then restarts with the same
start options. If checking, downloading, or preparing the update fails, the existing worker keeps
running and resumes accepting tasks. It retries failed updates with a delay that grows from one to
fifteen minutes.

Updates need no GitHub account or GitHub CLI either; the worker fetches releases directly from
github.com. The global installation must be writable by your user; the updater does not request sudo.
Without `--auto-update`, updates remain manual: let current work finish, stop the worker, run
`imd update`, then start it again with your usual options.

If your current `imd update` only prints installation instructions, repeat the download/install
commands above once to get a release with the updater. Then start with `--auto-update` to receive
future releases automatically. Updating the repository alone does not change installed workers.

Config and the private device key live in `~/.identitymd/config.json`; retain this directory during
updates. Never share its private key. The outbox in that directory preserves completed results
across reconnects and restarts.

## Distribution contents

The package includes the worker and the shared code it needs. Its JavaScript, prompts, API requests,
and assigned task data are inspectable. Backend source and service credentials are not distributed.
Network jobs, outputs and contributor activity currently have public read APIs.

Releases include a checksum and build record. Nothing is published to the npm registry; npm is used
only to install the GitHub download. This repository and its releases are public.

## Background service

After pairing and runtime sign-in, run `imd service install` on macOS or Windows to start now and
at login. On a Linux VPS, use `imd service install --boot` to survive SSH logout and start at boot.
Optional `--runtime codex`, `--concurrency 1`, and `--auto-update` are saved for future starts.
Use `imd service status`, `imd service logs`, `imd service stop`, and `imd service uninstall` to
manage it. Stop any foreground worker for the same identity first. The computer must stay awake;
macOS and Windows require a logged-in user. Auto-update is off unless requested.

Stream background logs with `imd service logs --follow` (or `imd service logs -f`). Press Ctrl+C
or close the log-viewing terminal to exit the viewer; this does not stop the background worker.
On Linux without lingering, the service still follows the user session's lifetime; install with
`--boot` for SSH logout persistence. Ctrl+X is not the terminal interrupt shortcut.

Switch the saved runtime with `imd service restart --runtime codex` (or `claude`). This interrupts
current work and preserves other service settings. Persistent runtime rate limits release the stopped
attempt after a short retry window and pause new work for five minutes.
