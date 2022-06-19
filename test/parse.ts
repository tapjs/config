import t from 'tap'
import { parse } from '../src/parse'

const { config, argv } = parse(['-M', 'some-map.js', 'foo'])

t.match(config, {
  coverageMap: 'some-map.js',
})
t.strictSame(argv, ['foo'])
t.equal(process.env.TAP_COVERAGE_MAP, 'some-map.js')
