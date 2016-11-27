'use strict'

const fs = require('fs')
const os = require('os')
const path = require('path')

const valid_keys = ['name', 'repo_name', 'author', 'description']

function readFile(filepath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, 'utf8', (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

module.exports = (readmeObj) => {
  return new Promise((resolve, reject) => {
    const configFilePath = path.join(os.homedir(), '.readgen')
    readFile(configFilePath)
    .then(file => Object.assign({}, JSON.parse(file.trim()), readmeObj) )
    .catch(err => {
      if (err.code === 'ENOENT') return
      reject(err)
    })
    .then((configFileProps) => {
      if(configFileProps) readmeObj = configFileProps

      if (!readmeObj.name) return reject(new Error('name is required'))
      if (!readmeObj.author) return reject(new Error('author is required'))
      if (!readmeObj.description) readmeObj.description = ''

      let templatePath = path.join(__dirname, 'template.md') || readmeObj.templatePath

      let repo_name = readmeObj.repo_name || readmeObj.name.replace(' ', '_')

      readmeObj.repo_name = repo_name

      fs.readFile(templatePath, 'utf8', (err, data) => {
        if (err) return reject(err)
        Object.keys(readmeObj).forEach(key => {
          if(valid_keys.indexOf(key) >= 0)
            data = data.replace(`{{ ${key} }}`, readmeObj[key])
        })

        resolve(data)
      })
    })
    .catch(err => reject(err))
  })
}
