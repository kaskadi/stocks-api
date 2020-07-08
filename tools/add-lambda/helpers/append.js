module.exports = (data, fs) => {
  const YAML = require('yaml')
  var config = YAML.parse(fs.readFileSync('serverless.yml', 'utf8'))
  config[data.prop][snakeToCamel(data.key)] = `\${file(./${data.path}/serverless.yml)}`
  fs.writeFileSync('serverless.yml', YAML.stringify(config), 'utf8')
}

function snakeToCamel (word) {
  let res = word.charAt(0).toUpperCase()
  for (var i = 1; i < word.length; i++) {
    if (word.charAt(i) === '-') {
      i++
      res += word.charAt(i).toUpperCase()
    } else {
      res += word.charAt(i)
    }
  }
  return res
}
