module.exports = (version, fs) => {
  const YAML = require('yaml')
  let config = YAML.parse(fs.readFileSync('serverless.yml', 'utf8'))
  config.custom.documentation.api.info.version = version
  fs.writeFileSync('serverless.yml', YAML.stringify(config), 'utf8')
}
