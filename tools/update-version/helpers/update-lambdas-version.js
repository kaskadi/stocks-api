module.exports = (version, fs) => {
  fs.readdirSync('lambdas').forEach(lambda => {
    updateLambda(version, lambda, fs)
  })
}

function updateLambda (version, lambda, fs) {
  const path = `lambdas/${lambda}/package.json`
  var pjson = JSON.parse(fs.readFileSync(path, 'utf8'))
  pjson.version = version
  fs.writeFileSync(path, `${JSON.stringify(pjson, null, 2)}\n`, 'utf8')
}
