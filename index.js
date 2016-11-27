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

function buildCofigObject(configFileProps, readmeObj) {
  return new Promise((resolve, reject) => {
    let config = configFileProps ? configFileProps : readmeObj

    if (!config.name) return reject(new Error('name is required'))
    if (!config.author) return reject(new Error('author is required'))
    if (!config.description) config.description = ''

    let templatePath = path.join(__dirname, 'template.md') || config.templatePath

    let repo_name = config.repo_name || config.name.replace(' ', '_')

    config.repo_name = repo_name
    resolve(config)
  })
}

module.exports = (readmeObj) => {
  return new Promise((resolve, reject) => {
    readFile(path.join(os.homedir(), '.readgen'))
    .then(file => Object.assign({}, JSON.parse(file.trim()), readmeObj))
    .catch(err => (err.code === 'ENOENT') ? null : reject(err))
    .then((configFileProps) => {
      const templatePath = path.join(__dirname, 'template.md') || readmeObj.templatePath

      return Promise.all([
        buildCofigObject(configFileProps, readmeObj),
        readFile(templatePath)
      ])
    })
    .then(results => {
      let config = results[0]
      let template = results[1]

      Object.keys(config).forEach(key => {
        if(valid_keys.indexOf(key) >= 0)
          template = template.replace(`{{ ${key} }}`, config[key])
      })

      resolve(template)
    })
    .catch(err => reject(err))
  })
}
