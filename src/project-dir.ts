import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

// walk up from cwd, but no higher than $HOME
const projectRootFiles = ['.git', '.hg', 'package.json', 'node_modules']

const projectDir = (
  top: string = process.env.HOME || process.cwd(),
  dir: string = process.cwd(),
  start?: string
): string | null => {
  if (dir === top && !start) {
    return dir
  }

  const dn = dirname(dir)

  // if we hit the end, then just use whatever cwd we started with
  if (dn === dir || dir === top) {
    return null
  }

  // evidence of a project root of some kind
  if (projectRootFiles.find(f => existsSync(resolve(dir, f)))) {
    return dir
  }

  /* istanbul ignore next */
  return projectDir(top, dn, start || dir) || start || dir
}

/* istanbul ignore next */
export default () => projectDir() || process.cwd() || ''
