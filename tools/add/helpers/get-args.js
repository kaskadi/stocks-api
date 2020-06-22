module.exports = (argsNames, args) => {
  const entries = argsNames.map((argsName, index) => {
    return [argsName, args[index]]
  })
  return Object.fromEntries(entries)
}
