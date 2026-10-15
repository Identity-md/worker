# Worker 0.1.2+b326004f

## What changed since worker-v0.1.2-fa23b3eaf1ba

- Add an egress filter: a tiny CONNECT proxy that refuses private, reserved or local addresses by resolved IP
- Key the read jail to the skill id the plane keeps, not a read name it strips
- Deny the sandbox the known cloud-metadata hosts, so a WebFetch or curl we did not catch at the door still cannot reach them

Source commit `b326004f0a52`.
