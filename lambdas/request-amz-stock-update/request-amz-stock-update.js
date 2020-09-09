const getCountryCodes = require('./helpers/get-country-codes.js')
const requestReports = require('./helpers/request-reports.js')
const { publishMsg } = require('kaskadi-stocks-utils')

module.exports.handler = async (event) => {
  // care with throttling. For now there is none because our SellerID and tokens only work for EU which has a single endpoint. But this may be different in the future!
  var lambdaRes = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  const countryCodes = getCountryCodes(event.queryStringParameters)
  if (countryCodes.length === 0) {
    lambdaRes.statusCode = 400
    lambdaRes.body = JSON.stringify({ message: 'Please provide a valid country code in your query string.' })
    return lambdaRes
  }
  return await requestReports(countryCodes)
    .then(reportsData => publishMsg(reportsData, process.env.AMZ_QUEUE_URL))
    .then(data => {
      lambdaRes.body = JSON.stringify({ message: 'Stock update successfully requested!' })
      return lambdaRes
    })
    .catch(err => {
      console.log(err)
      lambdaRes.statusCode = 500
      lambdaRes.body = JSON.stringify({ message: 'An error occured while requesting stock update from Amazon Marketplace Services...' })
      return lambdaRes
    })
}
