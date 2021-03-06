const marketplaces = require('../marketplaces.js')

module.exports = (codes) => {
  return requestReports(codes)
}

async function requestReports (codes) {
  let endpoints = codes.map(code => marketplaces[code].endpoint)
  endpoints = [...new Set(endpoints)]
  const codesPerEndpoint = endpoints.map(endpoint => codes.filter(code => marketplaces[code].endpoint === endpoint))
  let data = []
  for (const endpointCodes of codesPerEndpoint) {
    data = [...data, await requestReportsForEndpoint(endpointCodes)]
  }
  return data
}

function requestReportsForEndpoint (codes) {
  const MWS = require('mws-client')({
    AWSAccessKeyId: process.env.MWS_KEY_ID,
    SellerId: process.env.AMZ_EU_SELLER_ID,
    MWSAuthToken: process.env.MWS_KEY_SECRET
  })
  const reqOpts = {
    _httpMethod: 'POST',
    _marketplace: codes[0],
    ReportType: '_GET_MERCHANT_LISTINGS_ALL_DATA_',
    ...Object.fromEntries(codes.map((code, i) => [`MarketplaceIdList.Id.${i + 1}`, marketplaces[code].id])) // mws-client doesn't support array as parameter as of 1.0.0
  }
  return MWS.reports.requestReport(reqOpts).then(processMwsResponse(codes))
}

function processMwsResponse (marketplaces) {
  return mwsData => {
    return {
      ReportRequestInfo: mwsData.body.RequestReportResponse.RequestReportResult.ReportRequestInfo,
      marketplaces
    }
  }
}
