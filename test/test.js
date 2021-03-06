import fs from 'fs'
import test from 'ava'
import readgen from '../'

const name = 'readgen'
const author = 'makenova'
const description = 'Generate a README.md stub'

function readFilePromise(filepath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, 'utf8', (err, data) => {
      if (err) return reject(err)
      return resolve(data)
    })
  })
}

test('generate this project readme stub', t => {
  t.plan(1)

  const readmeObj = { name, author, description }

  return Promise.all([
    readFilePromise('./test/expected.md'),
    readgen(readmeObj)
  ])
  .then(values => t.is(values[0], values[1]))
  .catch(err => t.fail(err))
})

test('should throw when name is missing', t => {
  const readmeObj = { description }

  t.throws(readgen(readmeObj))
})

test('should throw when author is missing', t => {
  const readmeObj = { name, description }

  t.throws(readgen(readmeObj))
})
