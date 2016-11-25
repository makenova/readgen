'use strict'

const fs = require('fs')
const path = require('path')

const valid_keys = ['name', 'repo_name', 'author', 'description']

module.exports = (readmeObj) => {
  return new Promise((resolve, reject) => {
    if (!readmeObj.name) return reject(new Error('name is required'))
    if (!readmeObj.author) return reject(new Error('author is required'))

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
}
