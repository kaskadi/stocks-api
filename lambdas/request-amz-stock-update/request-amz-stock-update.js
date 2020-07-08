const getCountryCodes = require('./helpers/get-country-codes.js')
const requestReports = require('./helpers/request-reports.js')

module.exports.handler = async (event) => {
  // care with throttling. For now there is none because our SellerID and tokens only work for EU which has a single endpoint. But this may be different in the future!
  var res = { 
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  const countryCodes = getCountryCodes(event.queryStringParameters)
  if (countryCodes.length === 0) {
    res.statusCode = 400
    res.body = JSON.stringify({ message: `Please provide a valid country code in your query string.` })
    return res
  }
  return await requestReports(countryCodes)
    .then(data => {
      res.body = JSON.stringify(data)
      return res
    })
    .catch(err => {
      console.log(err)
      res.statusCode = 500
      res.body = JSON.stringify({ message: 'An error occured while requesting stock update from Amazon Marketplace Services...' })
      return res
    })
}
