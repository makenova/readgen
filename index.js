'use strict'

var fs = require('fs')
var path = require('path')

module.exports = (readmeObj) => {
  let templatePath = path.join(__dirname, 'template.md') || readmeObj.templatePath

  let repo_name = readmeObj.repo_name || readmeObj.name.replace(' ', '_')

  readmeObj.repo_name = repo_name

  fs.readFile(templatePath, 'utf8', (err, data) => {
    Object.keys(readmeObj).forEach((key) => {
      data = data.replace(`{{ ${key} }}`, readmeObj[key])
    })
    console.log(data)
  })
}
