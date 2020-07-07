const fs = require('fs')
const { spawnSync } = require('child_process')

const args = process.argv.slice(2)
const op = args[0] || 'patch'
spawnSync('npm', ['--no-git-tag-version', 'version', op], { stdio: 'inherit' })
const version = JSON.parse(fs.readFileSync('package.json', 'utf8')).version
require('./helpers/update-api-version.js')(version, fs)
require('./helpers/update-lambdas-version.js')(version, fs)
console.log(`Upgraded API & Lambdas version to ${version}`)
