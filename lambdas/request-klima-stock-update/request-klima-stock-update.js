const getStocks = require('./helpers/get-stocks.js')
const { putEvents } = require('kaskadi-stocks-utils')

module.exports.handler = async (event) => {
  var lambdaRes = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  return await getStocks()
    .then(stocks => putEvents(stocks, 'klima-stocks-update'))
    .then(data => {
      lambdaRes.body = JSON.stringify({ message: 'Stock update successfully requested!' })
      return lambdaRes
    })
    .catch(err => {
      console.log(err)
      lambdaRes.statusCode = 500
      lambdaRes.body = JSON.stringify({ message: 'An error occured while fetching Collmex stocks data...' })
      return lambdaRes
    })
}
