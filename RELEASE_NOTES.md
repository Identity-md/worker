# Worker 0.1.11+7f615fcc

## What changed since worker-v0.1.11-27f5680865af

- Protocol: a dataset the previous run did not have is not compared, so its rows never all read as new
- Protocol: the epoch document, its IPFS CID, and the presence sample a signer checks before funding
- Protocol: goal-dataset-delta@1 compares a dataset with the previous run's on its key, row by row, with exact total changes
- Plane: a draw is for a commitment already on chain, and a pending root's cancel jury is drawn too
- Protocol: the jury lane's draw, trees and typed data, equal to the contracts' to the byte

Source commit `7f615fcc0906`.
