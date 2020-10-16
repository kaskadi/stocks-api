const getCountryCodes = require('./helpers/get-country-codes.js')
const requestReports = require('./helpers/request-reports.js')
const { putEvents, getBaseResponse, processResponse, processError } = require('kaskadi-stocks-utils')

module.exports.handler = async (event) => {
  // care with throttling. For now there is none because our SellerID and tokens only work for EU which has a single endpoint. But this may be different in the future!
  const baseRes = getBaseResponse()
  const countryCodes = getCountryCodes(event.queryStringParameters)
  if (countryCodes.length === 0) {
    return getInvalidCodeResponse(baseRes)
  }
  return await requestReports(countryCodes)
    .then(putEvents('amz-report-request'))
    .then(processResponse(baseRes))
    .catch(processError(baseRes))
}

function getInvalidCodeResponse (baseRes) {
  return {
    ...baseRes,
    statusCode: 400,
    body: JSON.stringify({ message: 'Please provide a valid country code in your query string.' })
  }
}
