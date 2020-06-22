module.exports = (queryStringParameters) => {
  const marketplaces = require('../marketplaces.js')
  if (queryStringParameters) {
    const countryCode = queryStringParameters.code
    return countryCode && marketplaces[countryCode.toUpperCase()] ? [countryCode.toUpperCase()] : []
  }
  return Object.keys(marketplaces)
}