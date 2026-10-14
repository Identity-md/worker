# Worker 0.1.2+3648896b

## What changed since worker-v0.1.2-aca6c68825ef

- Root Claude workers install bubblewrap and socat where missing, and imd jail-setup does it under sudo
- Runtime updates manage a CLI named by IDENTITYMD_*_BIN when it is a real install, and use the worker's npm
- The jail re-opens the whole npm tree a runtime lives in, and the runtime IDENTITYMD_*_BIN names

Source commit `3648896bf071`.
