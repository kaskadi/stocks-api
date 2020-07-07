const fs = require('fs')
const checkArgs = require('./helpers/check-args.js')
const getArgs = require('./helpers/get-args.js')
const createFolders = require('./helpers/create-folders.js')
const copyFiles = require('./helpers/copy-files.js')
const updateFiles = require('./helpers/update-files.js')
const appendLambda = require('./helpers/append.js')

const args = process.argv.slice(2)
const argsName = ['name', 'method', 'path']
checkArgs({
  argsName,
  semIndex: ['first', 'second', 'third']
}, args)
const data = getArgs(argsName, args)
const pathToTool = 'tools/add-lambda'
const pathToLambda = `lambdas/${data.name}`
createFolders([pathToLambda], fs)
copyFiles([
  {
    src: `${pathToTool}/data/handler.js`,
    dest: `${pathToLambda}/${data.name}.js`
  },
  {
    src: `${pathToTool}/data/package.json`,
    dest: `${pathToLambda}/package.json`
  },
  {
    src: `${pathToTool}/data/serverless.yml`,
    dest: `${pathToLambda}/serverless.yml`
  }
], fs)
updateFiles([
  {
    path: `${pathToLambda}/package.json`,
    placeholder: '{{name}}',
    value: data.name
  },
  {
    path: `${pathToLambda}/serverless.yml`,
    placeholder: '{{name}}',
    value: data.name
  },
  {
    path: `${pathToLambda}/serverless.yml`,
    placeholder: '{{method}}',
    value: data.method
  },
  {
    path: `${pathToLambda}/serverless.yml`,
    placeholder: '{{path}}',
    value: data.path
  }
], fs)
appendLambda({
  prop: 'functions',
  key: data.name,
  path: pathToLambda
}, fs)
