# Worker 0.1.0+f0753cb7

## What changed since worker-v0.1.0-20b2eed83728

- A request that names the metadata address, loopback or an .internal host in plain prose is refused
- A keyless public RPC endpoint is not a secret, so work that cites it is submitted
- Oracle seats may read their own RPC relay, and cite the public endpoint it stands in for
- A worker never submits or reports its own device key, RPC key or tool key
- A worker reads a cited page only on the public internet
- Oracle panels read only the public internet: a request that points them elsewhere is refused at the quote

Source commit `f0753cb7ef61`.
