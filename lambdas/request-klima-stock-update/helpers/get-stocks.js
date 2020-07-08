const collmex = require('collmex-client')({
  User : process.env.CMX_CLIENT_USER,
  Password : process.env.CMX_CLIENT_PWD,
  CMXKundennummer: process.env.CMX_CUST_ID,
  Firma_Nr: 1,
  Systemname: 'kaskadi-collmex-client'
})

module.exports = () => {
  return Promise.all([getEanProductNrMap(), getStocks()])
    .then(combineData)
}

function getEanProductNrMap () {
  return collmex.get({ Satzart: 'PRODUCT_GET' })
  .then(products => products.filter(product => product.Satzart === 'CMXPRD'))
  .then(products => products.filter(product => product.EAN.length > 0))
  .then(products => products.filter(product => product.Produktnummer.length > 0))
  .then(products => Object.fromEntries(products.map(product => [product.Produktnummer, product.EAN])))
}

function getStocks () {
  return collmex.get({ Satzart: 'STOCK_AVAILABLE_GET' })
    .then(products => products.filter(product => product.Satzart === 'STOCK_AVAILABLE'))
}

function combineData (data) {
  const eanProductNrMap = data[0]
  const stocks = data[1]
  const filteredStocks = stocks.filter(stock => eanProductNrMap[stock.Produktnummer])
  return filteredStocks.map(stock => {
    return {
      ean: eanProductNrMap[stock.Produktnummer],
      quantity: Number(stock['Verfügbarer_Bestand'])
    }
  })
}