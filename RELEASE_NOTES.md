# Worker 0.1.8+b0c2298f

## What changed since worker-v0.1.8-35dc40502919

- Worker: a client stopped and started at once keeps one socket, not two that replace each other on the plane
- Bundle size: hold a task to 8 MiB of its own work, not the history it was handed

Source commit `b0c2298ff364`.
