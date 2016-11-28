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

function getTemplateAndConfig(readmeObj, configFileProps) {
  const templatePath = path.join(__dirname, 'template.md') || readmeObj.templatePath

  return Promise.all([
    buildCofigObject(configFileProps, readmeObj),
    readFile(templatePath)
  ])
}

function genReadme(results) {
  let config = results[0]
  let template = results[1]

  Object.keys(config).forEach(key => {
    if(valid_keys.indexOf(key) >= 0)
      template = template.replace(`{{ ${key} }}`, config[key])
  })

  return Promise.resolve(template)
}

module.exports = (readmeObj) => {
  return new Promise((resolve, reject) => {
    readFile(path.join(os.homedir(), '.readgen'))
      .then(file => Object.assign({}, JSON.parse(file.trim()), readmeObj))
      .catch(err => (err.code === 'ENOENT') ? null : reject(err))
      .then(getTemplateAndConfig.bind(null, readmeObj))
      .then(genReadme)
      .then(readme => resolve(readme))
      .catch(err => reject(err))
  })
}
