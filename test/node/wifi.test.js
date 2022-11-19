import test from 'node:test'
import assert from 'node:assert/strict'
import wifiConfig from '../../javascripts/wifi.js'

test('escaping', () => {
  assert.strictEqual(wifiConfig('WPA', 'asdf', 'pass'), `WIFI:T:WPA;S:asdf;P:pass;;`)
  assert.strictEqual(wifiConfig('WPA', 'as:df', 'pass'), `WIFI:T:WPA;S:as\\:df;P:pass;;`)
  assert.strictEqual(wifiConfig('WPA', 'as::df', 'pass'), `WIFI:T:WPA;S:as\\:\\:df;P:pass;;`)
})
