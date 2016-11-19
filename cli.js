#!/usr/bin/env node

'use strict'

let minimist = require('minimist')
let readgen = require('./')

let args = minimist(process.argv.slice(2))
let readmeObj = {
  name: args.name,
  description: args.description
}

readgen(readmeObj);
