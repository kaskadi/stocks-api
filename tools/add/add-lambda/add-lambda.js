const checkArgs = require('../helpers/check-args.js')
const getArgs = require('../helpers/get-args.js')
const createFolders = require('../helpers/create-folders.js')
const copyFiles = require('../helpers/copy-files.js')
const updateFiles = require('../helpers/update-files.js')
const appendLambda = require('../helpers/append.js')

const args = process.argv.slice(2)
checkArgs({
  argsName: ['name', 'method', 'path'],
  semIndex: ['first', 'second', 'third']
}, args)
const data = getArgs(['name', 'method', 'path'], args)
const pathToTool = 'tools/add/add-lambda'
const pathToLambda = `lambdas/${data.name}`
createFolders([pathToLambda])
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
    src: `${pathToTool}/data/serverless.json`,
    dest: `${pathToLambda}/serverless.json`
  }
])
updateFiles([
  {
    path: `${pathToLambda}/package.json`,
    placeholder: '{{name}}',
    value: data.name
  },
  {
    path: `${pathToLambda}/serverless.json`,
    placeholder: '{{name}}',
    value: data.name
  },
  {
    path: `${pathToLambda}/serverless.json`,
    placeholder: '{{method}}',
    value: data.method
  },
  {
    path: `${pathToLambda}/serverless.json`,
    placeholder: '{{path}}',
    value: data.path
  }
])
appendLambda({
  prop: 'functions',
  key: data.name,
  path: pathToLambda
})
