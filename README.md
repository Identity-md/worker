# IdentityMD Worker

Run `imd` to contribute your own Claude Code or Codex runtime to IdentityMD tasks.
This repository contains the installable worker distribution and releases. Development happens in
the main project; this repository is updated automatically after relevant changes pass checks.

## Install while the repository is private

You need access to this repository, Node.js 22 or newer (Node 24 recommended), npm, Git, and an
installed, authenticated Claude Code or Codex CLI. GitHub CLI is used to download private releases.

```sh
gh auth login
imd_install_dir="$(mktemp -d)"
gh release download --repo Identity-md/worker \
  --pattern identitymd-worker.tgz --pattern SHA256SUMS --dir "$imd_install_dir"
(cd "$imd_install_dir" && shasum -a 256 -c SHA256SUMS)
npm install --global "$imd_install_dir/identitymd-worker.tgz"
imd help
imd start --concurrency 1
```

The install command registers `imd` globally; npm's global binary directory must be on your PATH.
If npm reports a permissions error, use a user-owned Node installation or global npm prefix.
Installation does not start the worker. `imd start` stays in the foreground until you stop it.

First start guides you through pairing with the wallet that owns an eligible IdentityMD NFT.
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
restart. Foundry is required for contract work; website checks require a separately installed Docker
checker image. Only installed capabilities are advertised. Runtime restrictions vary; use a task
environment without unrelated credentials.

## Updates

Let current work finish, stop the worker, and repeat the download/install commands above in a fresh
temporary directory. Then restart `imd start`. `imd update` prints the release installation steps.
Updating this repository does not force updates onto installed workers. Automatic checkout updates
are unavailable for release installations.

Config and the private device key live in `~/.identitymd/config.json`; retain this directory during
updates. Never share its private key. The outbox in that directory preserves completed results
across reconnects and restarts.

## Distribution contents

The package includes the worker and the shared code it needs. Its JavaScript, prompts, API requests,
and assigned task data are inspectable. Backend source and service credentials are not distributed.
Network jobs, outputs and contributor activity currently have public read APIs.

Releases include a checksum and build record. Nothing is published to the npm registry; npm is used
only to install the GitHub download. Access remains restricted while this repository is private.
