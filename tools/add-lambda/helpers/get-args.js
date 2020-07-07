module.exports = (argsNames, args) => {
  return Object.fromEntries(argsNames.map((argsName, index) => [argsName, args[index]]))
}
