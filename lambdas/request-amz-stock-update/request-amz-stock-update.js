const getCountryCodes = require('./helpers/get-country-codes.js')
const requestReports = require('./helpers/request-reports.js')
const { putEvents, getBaseResponse } = require('kaskadi-stocks-utils')

module.exports.handler = async (event) => {
  // care with throttling. For now there is none because our SellerID and tokens only work for EU which has a single endpoint. But this may be different in the future!
  const baseRes = getBaseResponse()
  const countryCodes = getCountryCodes(event.queryStringParameters)
  if (countryCodes.length === 0) {
    return {
      ...baseRes,
      statusCode: 400,
      body: JSON.stringify({ message: 'Please provide a valid country code in your query string.' })
    }
  }
  return await requestReports(countryCodes)
    .then(stocks => putEvents(stocks, 'amz-report-request'))
    .then(data => {
      console.log(data)
      return {
        ...baseRes,
        body: JSON.stringify({ message: 'Stock update successfully requested!' })
      }
    })
    .catch(err => {
      console.log(err)
      return {
        ...baseRes,
        statusCode: 500,
        body: JSON.stringify({ message: 'An error occured while requesting stock update from Amazon Marketplace Services...' })
      }
    })
}
