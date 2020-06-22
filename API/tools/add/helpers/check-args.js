module.exports = (displayInfo, args) => {
  // const displayInfo = {
  //   argsName: ['name', 'method', 'path'],
  //   semIndex: ['first', 'second', 'third']
  // }
  for (i=0; i < displayInfo.argsName.length; i++) {
    if(!args[i]) {
      console.log(`A ${displayInfo.argsName[i]} is needed as ${displayInfo.semIndex[i]} argument to this function`)
      process.exit(9)
    }
  }
}
