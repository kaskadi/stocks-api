const fs = require('fs')

module.exports = (files) => {
  files.forEach(file => {
    fs.copyFileSync(file.src, file.dest)
  })
}
