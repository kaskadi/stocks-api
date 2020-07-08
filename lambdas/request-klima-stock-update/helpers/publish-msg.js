const AWS = require('aws-sdk')
const SQS = new AWS.SQS({ apiVersion: '2012-11-05' })

module.exports = (stocks) => {
  const params = {
    QueueUrl: 'my-queue',
    MessageBody: JSON.stringify(stocks)
  }
  return SQS.sendMessage(params).promise()
}
