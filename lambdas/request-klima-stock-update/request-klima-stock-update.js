const getStocks = require('./helpers/get-stocks.js')

module.exports.handler = async (event) => {
  let statusCode = 200
  const headers = { 'Access-Control-Allow-Origin': '*' }
  var res = {
    statusCode,
    headers
  }
  return await getStocks()
    .then(stocks => {
      res.body = JSON.stringify(stocks)
      return res
    })
    .catch(err => {
      console.log(err)
      res.statusCode = 500
      res.body = JSON.stringify({ message: 'An error occured while fetching updated stocks...' })
    })
}
