const AWS = require('aws-sdk')
const EB = new AWS.EventBridge({ apiVersion: '2015-10-07' })

module.exports = (eventData) => {
  const params = {
    Entries: eventData.map(data => {
      return {
        Detail: data,
        EventBusName: process.env.STOCKS_BUS_ARN.split('/').pop()
      }
    })
  }
  return EB.putEvents(params).promise()
}
