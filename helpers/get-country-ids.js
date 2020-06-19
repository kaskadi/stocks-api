module.exports = (queryStringParameters) => {
  const marketplaces = require('../marketplaces.js')
  if (queryStringParameters) {
    const countryCode = queryStringParameters.code
    return countryCode && marketplaces[countryCode.toUpperCase()] ? [marketplaces[countryCode.toUpperCase()].id] : []
  }
  return Object.entries(marketplaces).map(entry => entry[1].id)
}