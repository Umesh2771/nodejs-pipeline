import '../common/index.mjs';
import { test } from 'node:test';
import * as fixtures from '../common/fixtures.mjs';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert';

test('correctly reports errors when an ESM module is required with --no-experimental-require-module', () => {
  // The following regex matches the error message that is expected to be thrown
  //
  // package-type-module/require-esm-error-annotation/index.cjs:1
  // const app = require('./app');
  //             ^

  const matchRegex = /package-type-module\/require-esm-error-annotation\/index\.cjs:1[\r?\n]const app = require\('\.\/app'\);[\r?\n]\s{12}\^/;
  const fixture = fixtures.path('es-modules/package-type-module/require-esm-error-annotation/index.cjs');
  const args = ['--no-experimental-require-module', fixture];

  const result = spawnSync(process.execPath, args);

  assert.strictEqual(result.status, 1);
  assert(result.stderr.toString().match(matchRegex));
  assert.strictEqual(result.stdout.toString(), '');
});
