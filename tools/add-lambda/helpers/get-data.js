'use strict'

const inquirer = require('inquirer')

function filterInput (input) {
  return input.toLowerCase().trim()
}

function validateMethod (input) {
  const validMethods = ['get', 'head', 'post', 'put', 'delete', 'connect', 'options', 'trace', 'patch']
  return validMethods.includes(filterInput(input)) || 'This is not a valid http method.'
}

function validate (msg, regexp) {
  return (input) => {
    return regexp.test(filterInput(input)) || msg
  }
}

const questions = [
  {
    type: 'input',
    name: 'name',
    message: "What's the name?",
    validate: validate('Please provide a valid name - should only contain "-" as special character', /^[a-z-]*$/g),
    filter: filterInput
  },
  {
    type: 'input',
    name: 'method',
    message: "What's the method?",
    validate: validateMethod,
    filter: filterInput
  },
  {
    type: 'input',
    name: 'path',
    message: "What's the path?",
    validate: validate('Please provide a valid path - should only contain "-" and "/" as special character', /^[a-z\-/]*$/g),
    filter: filterInput
  }
]

module.exports = () => {
  return inquirer.prompt(questions)
}
