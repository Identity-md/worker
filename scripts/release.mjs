#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdtemp, readFile, rename, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const repository = 'Identity-md/worker';
const run = (command, args, options = {}) => execFileSync(command, args, {
  encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], ...options,
});
const build = JSON.parse(await readFile('build.json', 'utf8'));
const manifest = JSON.parse(await readFile('package.json', 'utf8'));
const expected = `worker-v${manifest.version}-${build.sourceCommit.slice(0, 12)}`;
const tag = process.env.RELEASE_TAG;
if (tag !== expected || build.version !== manifest.version || build.sourceDirty) {
  throw new Error('Release tag, package version and clean source build must agree.');
}
const current = JSON.parse(run('gh', ['api', `repos/${repository}/contents/build.json?ref=main`]));
const mainBuild = JSON.parse(Buffer.from(current.content, 'base64').toString('utf8'));
const isLatest = mainBuild.sourceCommit === build.sourceCommit;
const temporary = await mkdtemp(join(tmpdir(), 'imd-worker-release-'));
try {
  const [packed] = JSON.parse(run('npm', ['pack', '--json', '--ignore-scripts', '--pack-destination', temporary]));
  const archive = join(temporary, 'identitymd-worker.tgz');
  await rename(join(temporary, packed.filename), archive);
  const hash = createHash('sha256').update(await readFile(archive)).digest('hex');
  const sums = join(temporary, 'SHA256SUMS');
  await writeFile(sums, `${hash}  identitymd-worker.tgz\n`);
  const prefix = join(temporary, 'prefix');
  run('npm', ['install', '--global', '--prefix', prefix, '--offline', '--ignore-scripts', '--no-audit', '--no-fund', archive]);
  const help = run(join(prefix, 'bin', 'imd'), ['help']);
  if (!help.includes('imd start') || !help.includes(build.daemonVersion)) throw new Error('Installed CLI smoke check failed.');
  let existing;
  try { existing = JSON.parse(run('gh', ['release', 'view', tag, '--repo', repository, '--json', 'isDraft,assets'])); }
  catch (error) {
    if (!String(error.stderr).includes('release not found')) throw error;
  }
  if (existing && !existing.isDraft) {
    run('gh', ['release', 'download', tag, '--repo', repository, '--pattern', 'SHA256SUMS', '--dir', join(temporary, 'existing')]);
    const published = await readFile(join(temporary, 'existing', 'SHA256SUMS'), 'utf8');
    if (published !== await readFile(sums, 'utf8')) throw new Error('Existing release has different bytes; refusing to replace it.');
    console.log(`Release ${tag} already published with the same checksum.`);
  } else {
    // What changed comes from RELEASE_NOTES.md, written by the sync beside build.json; the page
    // then says how to install and what the archive hashes to.
    let changed = '';
    try { changed = (await readFile('RELEASE_NOTES.md', 'utf8')).replace(/^# .*\n+/, '').trim(); } catch (error) { if (error.code !== 'ENOENT') throw error; }
    const notes = join(temporary, 'notes.md');
    await writeFile(notes, `${changed ? `${changed}\n\n` : ''}## Install\n\nInstall the attached identitymd-worker.tgz with npm install -g, or run \`imd update\` on a machine that already has the worker. Releases are public downloads; the README covers download, checksum verification and installation.\n\nSHA-256: \`${hash}\`\n`);
    if (!existing) run('gh', ['release', 'create', tag, '--repo', repository, '--verify-tag', '--draft', '--title', `Worker ${build.daemonVersion}`, '--notes-file', notes]);
    run('gh', ['release', 'upload', tag, archive, sums, 'build.json', '--repo', repository, '--clobber']);
    run('gh', ['release', 'edit', tag, '--repo', repository, '--draft=false', `--latest=${isLatest}`, '--notes-file', notes]);
    console.log(`Published release ${tag}.`);
  }
} finally {
  await rm(temporary, { recursive: true, force: true });
}
