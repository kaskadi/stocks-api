const fs = require('fs')

module.exports = (version) => {
  fs.readdirSync('lambdas').forEach(lambda => {
    updateLambda(version, lambda)
  })
}

function updateLambda(version, lambda) {
  const path = `lambdas/${lambda}/package.json`
  let pjson = JSON.parse(fs.readFileSync(path, 'utf8'))
  pjson.version = version
  fs.writeFileSync(path, JSON.stringify(pjson, null, 2), 'utf8')
}
