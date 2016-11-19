import fs from 'fs'
import test from 'ava'
import readgen from '../'

const name = 'readgen'
const description = 'Generate a README.md stub'

function readFilePromise(filepath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, 'utf8', (err, data) => {
      if (err) return reject(err)
      return resolve(data)
    })
  })
}

test(t => {
  t.plan(1)

  const readmeObj = { name, description }

  return Promise.all([
    readFilePromise('./expecteds.md'),
    readgen(readmeObj)
  ])
  .then(values => t.is(values[0], values[1]))
  .catch(err => t.fail(err))
})
