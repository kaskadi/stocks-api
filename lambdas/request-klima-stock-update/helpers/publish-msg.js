const AWS = require('aws-sdk')
const SQS = new AWS.SQS({ apiVersion: '2012-11-05' })

module.exports = (stocks) => {
  const params = {
    QueueUrl: 'https://sqs.eu-central-1.amazonaws.com/374163881813/klima-stocks-update-queue',
    MessageBody: JSON.stringify(stocks)
  }
  return SQS.sendMessage(params).promise()
}
