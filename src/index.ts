import { readFileSync } from 'fs'
import { resolve } from 'path'
import { parse } from './parse'
import getProjectDir from './project-dir'

const loadPkg = () => {
  const pj = resolve(getProjectDir(), 'package.json')
  try {
    const pkg = JSON.parse(readFileSync(pj, 'utf8'))
    if (pkg && pkg.tap && typeof pkg.tap === 'object') {
      return pkg.tap
    }
  } catch (_) {}
  return {}
}

export const load = (
  args: string[],
  env: { [key: string]: string | undefined } = process.env
) => {
  // check for a package.json with a 'tap' section
  // and fill in any missing envs that it sets.
  const pkg = loadPkg()
  for (const [key, val] of Object.entries(pkg)) {
    if (key !== key.toLowerCase() || key.includes('_')) {
      throw new Error(`invalid key in package.json, must be css-case: ${key}`)
    }
    const ek = 'TAP_' + key.replace(/-/g, '_').toUpperCase()
    if (env[ek] === undefined) {
      env[ek] = Array.isArray(val)
        ? val.join('\n\n')
        : typeof val === 'boolean'
        ? val
          ? '1'
          : '0'
        : String(val)
    }
  }
  return parse(args, env)
}
