module.exports = (displayInfo, args) => {
  for (let i = 0; i < displayInfo.argsName.length; i++) {
    if (!args[i]) {
      console.log(`A ${displayInfo.argsName[i]} is needed as ${displayInfo.semIndex[i]} argument to this function`)
      process.exit(9)
    }
  }
}
