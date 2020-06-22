const fs = require('fs')
const childProc = require('child_process')
const updateApiVersion = require('./helpers/update-api-version.js')
const updateLambdasVersion = require('./helpers/update-lambdas-version.js')

const args = process.argv.slice(2)
const op = args[0] || 'patch'
childProc.execSync(`npm version -no-git-tag-version ${op}`)
const version = JSON.parse(fs.readFileSync('package.json', 'utf8')).version
updateApiVersion(version)
updateLambdasVersion(version)
console.log(`Upgraded API & Lambdas version to ${version}`)
