const fs = require('fs')
const getData = require('./helpers/get-data.js')
const createFolders = require('./helpers/create-folders.js')
const copyFiles = require('./helpers/copy-files.js')
const updateFiles = require('./helpers/update-files.js')
const appendLambda = require('./helpers/append.js')

function getCopyData (pathToTool, pathToLambda, name) {
  return [
    {
      src: `${pathToTool}/data/handler.js`,
      dest: `${pathToLambda}/${name}.js`
    },
    {
      src: `${pathToTool}/data/package.json`,
      dest: `${pathToLambda}/package.json`
    },
    {
      src: `${pathToTool}/data/serverless.yml`,
      dest: `${pathToLambda}/serverless.yml`
    }
  ]
}

function getUpdateData (pathToLambda, name, method, path) {
  return [
    {
      path: `${pathToLambda}/package.json`,
      placeholder: '{{name}}',
      value: name
    },
    {
      path: `${pathToLambda}/serverless.yml`,
      placeholder: '{{name}}',
      value: name
    },
    {
      path: `${pathToLambda}/serverless.yml`,
      placeholder: '{{method}}',
      value: method
    },
    {
      path: `${pathToLambda}/serverless.yml`,
      placeholder: '{{path}}',
      value: path
    }
  ]
}

async function main () {
  const { name, method, path } = await getData()
  const pathToTool = 'tools/add-lambda'
  const pathToLambda = `lambdas/${name}`
  createFolders([pathToLambda], fs)
  copyFiles(getCopyData(pathToTool, pathToLambda, name), fs)
  updateFiles(getUpdateData(pathToLambda, name, method, path), fs)
  appendLambda({
    prop: 'functions',
    key: name,
    path: pathToLambda
  }, fs)
}

main()
