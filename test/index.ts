import t from 'tap'
import { load, parse } from '../src/index'
import { parse as PARSE } from '../src/parse'

t.equal(parse, PARSE, 're-exported parse function')

const cwd = process.cwd()

t.beforeEach(() => {
  for (const k of Object.keys(process.env).filter(k => /^TAP_/.test(k))) {
    delete process.env[k]
  }
})

t.test('ours', t => {
  const { config, argv } = load(['run'])
  t.strictSame(argv, ['run'])
  t.match(config, {
    coverageMap: 'map.js',
    nodeArg: [ '--loader=ts-node/esm', '--no-warnings' ],
  })
  t.end()
})

t.test('pj configs', t => {
  t.teardown(() => process.chdir(cwd))
  process.chdir(t.testdir({
    'package.json': JSON.stringify({
      tap: {
        bail: true,
        'coverage-map': 'm.js',
        only: false,
        'node-arg': ['--expose-gc', '--loader', 'ts-node/esm'],
      },
    })
  }))
  t.strictSame(load([]).config, {
    bail: true,
    coverageMap: 'm.js',
    only: false,
    nodeArg: ['--expose-gc', '--loader', 'ts-node/esm'],
  })
  t.end()
})

t.test('bad pj', t => {
  t.teardown(() => process.chdir(cwd))
  process.chdir(t.testdir({
    'package.json': '! not json',
  }))
  t.strictSame(load([]).config, {})
  t.end()
})

t.test('pj no tap', t => {
  t.teardown(() => process.chdir(cwd))
  process.chdir(t.testdir({
    'package.json': '{"name":"no tap section"}'
  }))
  t.strictSame(load([]).config, {})
  t.end()
})

t.test('pj has bad config', t => {
  t.teardown(() => process.chdir(cwd))
  process.chdir(t.testdir({
    'package.json': '{"tap":{"camelCase": "nope"}}'
  }))
  t.throws(() => load([]))
  t.end()
})

t.test('config already in env', t => {
  process.env.TAP_BAIL = '1'
  t.teardown(() => process.chdir(cwd))
  process.chdir(t.testdir({
    'package.json': '{"tap":{"bail": false}}'
  }))
  t.strictSame(load([]).config, { bail: true })
  t.end()
})
