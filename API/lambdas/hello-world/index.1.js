const t2 = require('aws-sdk')

module.exports.handler = async (event) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Set-Cookie': ['a=b', 'c=d']
    },
    body: JSON.stringify({
      message: event.headers.cookie
    })
  }
}
