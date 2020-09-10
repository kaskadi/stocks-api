const getStocks = require('./helpers/get-stocks.js')
const { putEvents, getBaseResponse } = require('kaskadi-stocks-utils')

module.exports.handler = async (event) => {
  const baseRes = getBaseResponse()
  return await getStocks()
    .then(stocks => putEvents(stocks, 'klima-stocks-update'))
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
        body: JSON.stringify({ message: 'An error occured while fetching Collmex stocks data...' })
      }
    })
}
