module.exports.handler = async (event) => {
  const getCountryIds = require('./helpers/get-country-ids.js')
  const requestReports = require('./helpers/request-reports.js')
  const countryIds = getCountryIds(event.queryStringParameters)
  if (countryIds.length === 0) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ message: `Please provide a country code in your query string.` })
    }
  }
  return await requestReports(countryIds)
}
