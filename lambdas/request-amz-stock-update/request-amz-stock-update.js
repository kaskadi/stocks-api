module.exports.handler = async (event) => {
  // care with throttling. For now there is none because our SellerID and tokens only work for EU which has a single endpoint. But this may be different in the future!
  const getCountryCodes = require('./helpers/get-country-codes.js')
  const requestReports = require('./helpers/request-reports.js')
  const countryCodes = getCountryCodes(event.queryStringParameters)
  if (countryCodes.length === 0) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ message: `Please provide a valid country code in your query string.` })
    }
  }
  return await requestReports(countryCodes)
}
