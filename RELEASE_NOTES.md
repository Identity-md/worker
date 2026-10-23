# Worker 0.1.4+1103e27b

## What changed since worker-v0.1.4-962b3018e66f

- Seats: every bound seat's ERC-8004 document is published as one IPFS folder on ENS, and a holder can point its agentURI there
- Daemon: a move to the plane's next name keeps the reconnect backoff
- Daemon: a worker moves between the plane's names when one fails, and a listed name must sign as the plane

Source commit `1103e27bfa34`.
