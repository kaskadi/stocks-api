const fs = require('fs')

module.exports = (updates) => {
  updates.forEach(update => {
    replaceNameInFile(update.path, update.placeholder, update.value)
  })
}

function replaceNameInFile (fileName, oldName, newName) {
  const oldNameRegex = new RegExp(oldName, 'g')
  if (fs.existsSync(fileName)) {
    const file = fs.readFileSync(fileName, 'utf8')
    fs.writeFileSync(fileName, file.replace(oldNameRegex, newName), 'utf8')
  }
}
