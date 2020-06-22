const fs = require('fs')

module.exports = (version) => {
  let config = JSON.parse(fs.readFileSync('serverless.json', 'utf8'))
  config.custom.documentation.api.info.version = version
  fs.writeFileSync('serverless.json', JSON.stringify(config, null, 2), 'utf8')
}
