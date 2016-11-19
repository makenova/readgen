'use strict'

var fs = require('fs')
var path = require('path')

module.exports = (readmeObj) => {
  return new Promise((resolve, reject) => {
    if (!readmeObj.name) return reject(new Error('name is required'))
    let templatePath = path.join(__dirname, 'template.md') || readmeObj.templatePath

    let repo_name = readmeObj.repo_name || readmeObj.name.replace(' ', '_')

    readmeObj.repo_name = repo_name

    fs.readFile(templatePath, 'utf8', (err, data) => {
      if (err) return reject(err)
      Object.keys(readmeObj).forEach((key) => {
        data = data.replace(`{{ ${key} }}`, readmeObj[key])
      })

      resolve(data)
    })
  })
}
