module.exports = async (ids) => {
  return await requestReports(ids).then(getApiResponse)
}

async function requestReports(ids) {
  const MWS = require('mws-client')({
    AWSAccessKeyId: process.env.ACCESS_KEY,
    SellerId: process.env.SELLER_ID,
    MWSAuthToken: process.env.MWS_AUTH_TOKEN
  })
  const reqOpts = {
    ReportType: '_GET_MERCHANT_LISTINGS_ALL_DATA_',
    ...Object.fromEntries(ids.map((id, i) => [`MarketplaceIdList.Id.${i + 1}`, id])) // mws-client doesn't support array as parameter as of 1.0.0
  }
  return await MWS.reports.requestReport(reqOpts).then(processMwsResponse)
}

function processMwsResponse(mwsData) {
  return mwsData.body.RequestReportResponse.RequestReportResult.ReportRequestInfo
}

function getApiResponse(data) {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(data)
  }
}