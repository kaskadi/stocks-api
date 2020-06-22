const fs = require('fs')

module.exports = (folders) => {
  folders.forEach(folder => {
    fs.mkdirSync(folder)
  })
}
