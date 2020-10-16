const getStocks = require('./helpers/get-stocks.js')
const { putEvents, getBaseResponse, processResponse, processError } = require('kaskadi-stocks-utils')

module.exports.handler = async (event) => {
  const baseRes = getBaseResponse()
  return await getStocks()
    .then(putEvents('klima-stocks-update'))
    .then(processResponse(baseRes))
    .catch(processError(baseRes))
}
