import assert from 'node:assert/strict';
import * as fs from 'node:fs/promises';
import { constants as FS } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import vm from 'node:vm';

// This repository distributes a bundle rather than its original source tree.
// Exercise the actual host-exposure functions, without starting the CLI, making
// network/model calls, or inspecting the developer's real home or sockets.
const bundle = await fs.readFile(new URL('../dist/cli.js', import.meta.url), 'utf8');
const start = 'function secretProbes(home)';
const end = 'async function fetchStanding(';
assert.equal(bundle.split(start).length, 2, 'unique exposure-section start');
assert.equal(bundle.split(end).length, 2, 'unique exposure-section end');
const section = bundle.slice(bundle.indexOf(start), bundle.indexOf(end));
function exposureApi(overrides = {}) {
  const context = vm.createContext({
    join36: join, stat8: fs.stat, readdir7: fs.readdir,
    access5: fs.access, openNpmrc: fs.open, FS, Buffer, TextDecoder,
    RUNTIME_SOCKETS: [], ...overrides,
  });
  return vm.runInContext(`${section}; ({readHostExposure, judgeHostExposure, hostExposureBlocks})`, context);
}
async function withHome(run) {
  const home = await fs.mkdtemp(join(tmpdir(), 'imd-host-exposure-'));
  try { await run(home); } finally { await fs.rm(home, { recursive: true, force: true }); }
}

const cases = [
  ['absent', null, false],
  ['empty', '', false],
  ['blank', ' \t\r\n', false],
  ['comments only', '# npm config\n; no credentials configured\n', false],
  ['README prefix', 'prefix=/home/test/.npm-global\n', false],
  ['prefix with whitespace and comments', '# user install\r\n prefix = /home/test/.npm-global \r\n', false],
  ['Windows prefix', 'prefix=C:\\Users\\test\\npm-global\n', false],
  ['scoped auth token', '//registry.npmjs.org/:_authToken=SYNTHETIC_TOKEN\n', true],
  ['prefix plus auth token', 'prefix=/home/test/.npm-global\n//registry.npmjs.org/:_authToken=SYNTHETIC_TOKEN\n', true],
  ['legacy auth', '_auth=SYNTHETIC_AUTH\n', true],
  ['password', '_password=SYNTHETIC_PASSWORD\n', true],
  ['environment token reference', '//registry.npmjs.org/:_authToken=${NPM_TOKEN}\n', true],
  ['quoted credential key', '"//registry.npmjs.org/:_authToken"=SYNTHETIC_TOKEN\n', true],
  ['unknown setting', 'custom-setting=unknown\n', true],
  ['section syntax', '[registry]\n_authToken=SYNTHETIC_TOKEN\n', true],
  ['multiline ambiguity', 'prefix=/home/test/.npm-global\nSYNTHETIC_TOKEN\n', true],
  ['interpolated prefix', 'prefix=${PRIVATE_VALUE}\n', true],
  ['relative prefix', 'prefix=relative/path\n', true],
  ['empty prefix', 'prefix=\n', true],
  ['oversized input', 'prefix=/' + 'a'.repeat(16384), true],
  ['invalid UTF-8', Buffer.from([0xff, 0xfe, 0x41]), true],
  ['control byte before prefix', '\u000bprefix=/home/test/.npm-global\n', true],
  ['control byte in comment', '# comment\u0000\n', true],
  ['auth before prefix', '_authToken=SYNTHETIC_TOKEN\nprefix=/home/test/.npm-global\n', true],
  ['quoted prefix', 'prefix="/home/test/.npm-global"\n', true],
  ['auth beyond read limit', '# ' + 'a'.repeat(16384) + '\n_authToken=SYNTHETIC_TOKEN\n', true],
  ['exact read limit', 'prefix=/' + 'a'.repeat(16384 - 8), false],
];
for (const [name, content, expected] of cases) {
  test(`npmrc: ${name}`, () => withHome(async home => {
    if (content !== null) await fs.writeFile(join(home, '.npmrc'), content);
    const api = exposureApi();
    const exposure = await api.readHostExposure(home, {});
    assert.equal(exposure.secrets.some(label => label.includes('.npmrc')), expected);
    assert.equal(api.hostExposureBlocks(exposure, { IDENTITYMD_REQUIRE_ISOLATION: '1' }), expected);
    assert.ok(!JSON.stringify(api.judgeHostExposure(exposure)).includes('SYNTHETIC_'), 'no configuration values in diagnostic');
  }));
}

test('non-npm credential-file and directory probes are unchanged', () => withHome(async home => {
  await fs.writeFile(join(home, '.npmrc'), 'prefix=/home/test/.npm-global\n');
  await fs.mkdir(join(home, '.aws'));
  await fs.writeFile(join(home, '.aws', 'credentials'), 'SYNTHETIC_AWS');
  await fs.mkdir(join(home, '.foundry', 'keystores'), { recursive: true });
  await fs.writeFile(join(home, '.foundry', 'keystores', 'test.json'), '{}');
  const api = exposureApi();
  const exposure = await api.readHostExposure(home, {});
  assert.equal(exposure.secrets.length, 2);
  assert.ok(exposure.secrets.some(label => label.includes('AWS')));
  assert.ok(exposure.secrets.some(label => label.includes('wallet keystores')));
  assert.equal(api.hostExposureBlocks(exposure, { IDENTITYMD_REQUIRE_ISOLATION: '1' }), true);
}));

test('container isolation override remains unchanged', () => withHome(async home => {
  await fs.writeFile(join(home, '.npmrc'), '_authToken=SYNTHETIC_TOKEN\n');
  const api = exposureApi();
  const exposure = await api.readHostExposure(home, { IDENTITYMD_CONTAINER_IS_SANDBOX: '1' });
  assert.equal(exposure.sandbox, true);
  assert.equal(exposure.secrets.length, 0);
  assert.equal(api.hostExposureBlocks(exposure, { IDENTITYMD_REQUIRE_ISOLATION: '1' }), false);
}));

test('npmrc inspection errors retain a warning without leaking error details', () => withHome(async home => {
  await fs.writeFile(join(home, '.npmrc'), 'prefix=/home/test/.npm-global\n');
  const api = exposureApi({ openNpmrc: async () => { throw new Error('SYNTHETIC_SECRET'); } });
  const exposure = await api.readHostExposure(home, {});
  assert.ok(exposure.secrets.some(label => label.includes('.npmrc')));
  assert.ok(!JSON.stringify(api.judgeHostExposure(exposure)).includes('SYNTHETIC_SECRET'));
}));

for (const stage of ['stat', 'read']) {
  test(`npmrc ${stage} failure after open warns and closes descriptor`, () => withHome(async home => {
    await fs.writeFile(join(home, '.npmrc'), 'prefix=/safe\n');
    let closed = false;
    const failure = () => { throw Object.assign(new Error('SYNTHETIC_SECRET'), { code: 'ENOENT' }); };
    const api = exposureApi({ openNpmrc: async () => ({
      stat: stage === 'stat' ? failure : async () => ({ isFile: () => true, size: 0 }),
      read: failure,
      close: async () => { closed = true; },
    }) });
    const exposure = await api.readHostExposure(home, {});
    assert.equal(exposure.secrets.length, 1);
    assert.equal(closed, true);
    assert.ok(!JSON.stringify(exposure).includes('SYNTHETIC_SECRET'));
  }));
}

test('short reads are continued to EOF on the same descriptor', () => withHome(async home => {
  await fs.writeFile(join(home, '.npmrc'), 'prefix=/safe\n_authToken=SYNTHETIC_TOKEN\n');
  let closed = false;
  let reads = 0;
  const api = exposureApi({ openNpmrc: async (...args) => {
    const handle = await fs.open(...args);
    return {
      stat: async () => ({ isFile: () => true, size: 0 }),
      read: async (buffer, offset, length, position) => {
        reads++;
        return handle.read(buffer, offset, Math.min(length, 3), position);
      },
      close: async () => { closed = true; await handle.close(); },
    };
  } });
  const exposure = await api.readHostExposure(home, {});
  assert.equal(exposure.secrets.length, 1);
  assert.ok(reads > 2);
  assert.equal(closed, true);
}));

test('growing file cannot exceed the bounded read even with stale size', () => withHome(async home => {
  await fs.writeFile(join(home, '.npmrc'), 'prefix=/' + 'a'.repeat(32768));
  let bytes = 0;
  let closed = false;
  const api = exposureApi({ openNpmrc: async (...args) => {
    const handle = await fs.open(...args);
    return {
      stat: async () => ({ isFile: () => true, size: 0 }),
      read: async (...args) => { const result = await handle.read(...args); bytes += result.bytesRead; return result; },
      close: async () => { closed = true; await handle.close(); },
    };
  } });
  const exposure = await api.readHostExposure(home, {});
  assert.equal(exposure.secrets.length, 1);
  assert.equal(bytes, 16385);
  assert.equal(closed, true);
}));

test('a directory at npmrc stays suspicious', () => withHome(async home => {
  await fs.mkdir(join(home, '.npmrc'));
  const exposure = await exposureApi().readHostExposure(home, {});
  assert.equal(exposure.secrets.length, 1);
}));

test('symlink to a synthetic credential file still warns', () => withHome(async home => {
  await fs.writeFile(join(home, 'auth-fixture'), '_auth=SYNTHETIC_AUTH\n');
  await fs.symlink('auth-fixture', join(home, '.npmrc'));
  const exposure = await exposureApi().readHostExposure(home, {});
  assert.equal(exposure.secrets.length, 1);
}));

test('reachable container socket detection and enforcement stay unchanged', () => withHome(async home => {
  const api = exposureApi({ RUNTIME_SOCKETS: ['/synthetic/docker.sock'], access5: async () => {} });
  const exposure = await api.readHostExposure(home, {});
  assert.equal(exposure.socket, '/synthetic/docker.sock');
  assert.equal(api.judgeHostExposure(exposure).ok, false);
  assert.equal(api.hostExposureBlocks(exposure, { IDENTITYMD_REQUIRE_ISOLATION: '1' }), true);
}));
