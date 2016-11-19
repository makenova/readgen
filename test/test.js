import fs from 'fs'
import test from 'ava'
import readgen from '../'

const expectedOut = `# readgen

Generate a README.md stub

## Install

## Use

## API

## Bugs

Please report any bugs to: https://github.com/makenova/readgen/issues

## License

Licensed under the MIT License: https://opensource.org/licenses/MIT
`

const name = 'readgen'
const description = 'Generate a README.md stub'

test(t => {
  t.plan(1)

  const readmeObj = { name, description }

  return readgen(readmeObj).then( readme => {
    t.is(readme, expectedOut)
  })
})
