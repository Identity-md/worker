# Worker 0.1.8+35dc4050

## What changed since worker-v0.1.8-a375dd802924

- Bump the npm-minor-and-patch group with 3 updates
- Worker sync: the sync's check before it publishes is a function the tests drive through a stand-in gh, and one that steps aside says nothing to sync, which the workflow waits on no release for
- Worker sync: a build master has moved past is published when the commits since changed no worker file, as the gate already lets it through, not dropped for any newer commit

Source commit `35dc40502919`.
