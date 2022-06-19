import t from 'tap'
import projectDir from '../src/project-dir'
import {resolve} from 'node:path'

const cwd = process.cwd()

if (!process.env.HOME) {
  process.env.HOME = resolve(__dirname, '../..')
}

t.equal(projectDir(), resolve(__dirname, '..'))

t.test('subdir', t => {
  const dir = t.testdir({
    a: {
      'package.json': JSON.stringify({}),
      b: {
        c: {}
      },
    },
  })
  t.teardown(() => process.chdir(cwd))
  process.chdir(resolve(dir, 'a/b/c'))
  t.equal(projectDir(), resolve(dir, 'a'))
  t.end()
})

t.test('already at top', t => {
  t.teardown(() => process.chdir(cwd))
  const h = process.env.HOME || cwd
  process.chdir(h)
  t.equal(projectDir(), h)
  t.end()
})

t.test('outside of everywhere', t => {
  t.teardown(() => process.chdir(cwd))
  try {
    process.chdir(resolve(process.env.TMPDIR || process.env.TEMPDIR || '/tmp'))
  } catch (e) {
    process.chdir('/')
  }
  const h = process.cwd()
  t.equal(projectDir(), h)
  t.end()
})

t.test('no home, no problem', t => {
  const { HOME } = process.env
  delete process.env.HOME
  t.teardown(() => { process.env.HOME = HOME })
  t.teardown(() => process.chdir(cwd))
  try {
    process.chdir(resolve(process.env.TMPDIR || process.env.TEMPDIR || '/tmp'))
  } catch (e) {
    process.chdir('/')
  }
  const h = process.cwd()
  t.equal(projectDir(), h)
  t.end()
})
