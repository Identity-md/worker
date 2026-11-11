# Worker 0.1.21+06df2058

## What changed since worker-v0.1.20-2e42ff9c876c

- Worker 0.1.21: prebuilt files and builds ship in one release, the next after master's 0.1.20, and both floors name it
- Worker 0.1.22: a task leaves a build behind, packed the same way on every machine, and a fetch checks an archive's contents
- Worker: a prebuilt file is kept by its bytes and the form it is kept in, and fetched within half the task's time
- Worker: a prebuilt archive keeps no link that leads nowhere
- Worker 0.1.21: a task's prebuilt files, fetched once per machine and opened read only

Source commit `06df205845c7`.
