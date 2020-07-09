const getStocks = require('./helpers/get-stocks.js')
const publishMsg = require('./helpers/publish-msg.js')

module.exports.handler = async (event) => {
  var res = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  return await getStocks()
    .then(publishMsg)
    .then(res => {
      res.body = JSON.stringify({ message: 'Stock updated successfully requested!' })
      return res
    })
    .catch(err => {
      console.log(err)
      res.statusCode = 500
      res.body = JSON.stringify({ message: 'An error occured while fetching Collmex stocks data...' })
      return res
    })
}
