# Worker 0.1.15+8bb77c84

## What changed since worker-v0.1.15-553b7590149e

- Plane: the escrow's twin reads bondDue, and the anvil test deploys BudgetEscrow linked to its BudgetJury library
- Paid goals: an earnings epoch excludes its largest payees from its juries, leaves out accounts refunded or due a refund, comes an hour after a stop, and a void epoch frees its units (solidity-auditor)
- Paid goals: the TypeScript twin commits to an epoch's jury exclusions as the escrow does, and the plane reads the escrow's refund delay with its settings
- Paid goals: the plane reads stops and refunds from the escrow, refuses a quote into an account stopped on chain, stops a goal its payer stopped on chain, and checks PAID_GOAL_ESCROW against the escrow at boot (solidity-auditor, 1 pass)
- Paid goals: dry earnings epochs publish what each seat earned as plane-signed IPFS documents an outside party rebuilds from IPFS alone, behind GOAL_EARNINGS_ENABLED=dry
- Paid goals: goal.open and goal.topup pay a goal's own BudgetEscrow account, the goal seats nothing once its units are spent, and its payer's signed stop ends it, behind PAID_GOAL_ENABLED

Source commit `8bb77c8487a1`.
