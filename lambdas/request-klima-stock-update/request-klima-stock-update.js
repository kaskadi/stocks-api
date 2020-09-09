const getStocks = require('./helpers/get-stocks.js')
const { publishMsg } = require('kaskadi-stocks-utils')

module.exports.handler = async (event) => {
  var lambdaRes = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  return await getStocks()
    .then(stocks => publishMsg(stocks, process.env.KLIMA_STOCKS_UPDATE_QUEUE_URL))
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
