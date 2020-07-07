module.exports = (updates, fs) => {
  for (const update of updates) {
    replaceNameInFile(update.path, update.placeholder, update.value, fs)
  }
}

function replaceNameInFile (fileName, oldName, newName, fs) {
  const oldNameRegex = new RegExp(oldName, 'g')
  if (fs.existsSync(fileName)) {
    const file = fs.readFileSync(fileName, 'utf8')
    fs.writeFileSync(fileName, file.replace(oldNameRegex, newName), 'utf8')
  }
}
