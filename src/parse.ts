import {
  cliEnvConfig,
  ConfigDef,
  KeyList,
  NegList,
} from '@isaacs/cli-env-config'

const switches: KeyList = [
  ['bail', 'b'],
  ['saveFixture', 'F'],
  'comments',
  ['color', 'c'],
  ['snapshot', 'S'],
  ['only', 'O'],
  ['invert', 'i'],
  ['noTimeout', 'T'],
  ['jobsAuto', 'J'],
  'noCoverageMap',
  'browser',
  'showProcessTree',
  ['help', 'h'],
  ['version', 'v'],
  'diag',
  'longstack',
  'debug',
]

const switchInverts: NegList = [
  ['noBail', 'bail', 'B'],
  ['noSaveFixture', 'saveFixture'],
  ['noComments', 'comments'],
  ['noColor', 'color', 'C'],
  ['noSnapshot', 'snapshot'],
  ['noInvert', 'invert', 'I'],
  ['noBrowser', 'browser'],
]

const options: KeyList = [
  ['reporter', 'R'],
  ['save', 's'],
  ['timeout', 't'],
  ['jobs', 'j'],
  'before',
  'after',
  ['coverageMap', 'M'],
  'coverageReport',
  'testRegex',
  'testIgnore',
  ['outputFile', 'o'],
  ['outputDir', 'd'],
  'childId',
  'rcfile',
]

const multivars: KeyList = [
  ['reporterArg', 'r'],
  ['grep', 'g'],
  'testArg',
  'nodeArg',
  'testEnv',
]

const configDef: ConfigDef = {
  prefix: 'TAP',
  allowUnknown: true,
  switches,
  switchInverts,
  options,
  multivars,
}

export const parse = (
  args: string[],
  env: { [key: string]: string | undefined } = process.env
) => cliEnvConfig({ ...configDef, env })(args)
