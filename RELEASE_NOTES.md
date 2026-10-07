# Worker 0.1.0+be003835

## What changed since worker-v0.1.0-986b9f582b07

- Intake sells in each chain's IMD and is ready for mainnet
- pnpm audit passes again: source-map-js and sharp take their patched versions
- Robinhood Chain links go to robin.etherscan.io instead of Blockscout
- Custom tokens on Ethereum can pair with FWA; chains can name more than one pair token
- The intake reads its own logs, and pins what it completes
- Make the intake pass the security checks: scoped dependency lifts, two slither notes, two scanner allowlists
- Buy swarm work with one transaction: the Intake contract, its indexer, and the plane's on-chain door

Source commit `be003835b494`.
