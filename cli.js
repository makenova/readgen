#!/usr/bin/env node

'use strict'

let fs = require('fs')
let path = require('path')
let minimist = require('minimist')
let readgen = require('./')

let args = minimist(process.argv.slice(2))
let readmeObj = {
  name: args.name,
  description: args.description
}

// doing this so the config file can override the value if author is undefined
if (args.author)
  readmeObj.author= args.author

function reportError(err, message) {
  console.error(message || err.message)
  if (process.env.NODE_ENV === 'development') console.error(err || null)
}

function writeFile(file) {
  return new Promise((resolve, reject) => {
    fs.writeFile('./README.md', file, (err) => {
      if (err) return reject(err)
      resolve(null)
    })
  })
}

if (fs.existsSync('./README.md')) {
  return reportError(new Error('The README.md file already exists.'))
} else {
  return readgen(readmeObj)
  .then(writeFile)
  .catch(err => reportError(err))
}
