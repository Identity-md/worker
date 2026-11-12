# Worker 0.1.28+9fc6a798

## What changed since worker-v0.1.27-0026a23a8b0f

- Worker: a juror refuses a gas mandate whose executor does not run this release's JuryExecutor code
- Protocol: the release names each chain's gas station factory with the first worker that knows it, and the executor's code by its masked hash
- Protocol: chains whose gas is not ETH, Arc first
- Worker 0.1.27: a juror reads a mandate's gas station from the factory its release names, and refuses one the factory did not make
- Protocol: a gas station is known only by the chain's factory record, pays in the chain's WETH, and keeps its margin under 50,000
- Worker: a juror signs under a mandate's gas station only when the station on chain pays no more than the owner signed
- Deployer: DEPLOYER_ROLE=submitter sends a jury action's transactions through its gas station, with a key that holds only gas
- Protocol: a mandate may name a gas station, and holds its limits to the gas budget the owner signed

Source commit `9fc6a798a5f4`.
