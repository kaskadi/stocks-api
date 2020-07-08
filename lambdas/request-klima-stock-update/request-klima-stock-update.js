const getStocks = require('./helpers/get-stocks.js')

module.exports.handler = async (event) => {
  var res = { 
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  return await getStocks()
    .then(stocks => {
      res.body = JSON.stringify(stocks)
      return res
    })
    .catch(err => {
      console.log(err)
      res.statusCode = 500
      res.body = JSON.stringify({ message: 'An error occured while fetching Collmex stocks data...' })
      return res
    })
}
