const collmex = require('collmex-client')({
  User: process.env.CMX_CLIENT_USER,
  Password: process.env.CMX_CLIENT_PWD,
  CMXKundennummer: process.env.CMX_CUST_ID,
  Firma_Nr: 1,
  Systemname: 'kaskadi-collmex-client'
})

module.exports = () => {
  return Promise.all([getEanProduktnummerMap(), getStocks()])
    .then(objectifyData)
    .then(parseData)
}

function getEanProduktnummerMap () {
  return collmexGet('PRODUCT_GET', 'CMXPRD')
    .then(products => products.filter(product => product.EAN.length > 0))
    .then(products => products.filter(product => product.Produktnummer.length > 0))
    .then(products => Object.fromEntries(products.map(product => [product.Produktnummer, product.EAN])))
}

function getStocks () {
  return collmexGet('STOCK_AVAILABLE_GET', 'STOCK_AVAILABLE')
}

function collmexGet (op, filter) {
  return collmex.get({ Satzart: op })
    .then(products => products.filter(product => product.Satzart === filter))
}

function objectifyData (data) {
  return {
    eanProduktnummerMap: data[0],
    stocks: data[1]
  }
}

function parseData (data) {
  const filteredStocks = data.stocks.filter(stock => data.eanProduktnummerMap[stock.Produktnummer])
  return [
    {
      stocks: filteredStocks.map(stock => {
        return {
          ean: data.eanProduktnummerMap[stock.Produktnummer],
          quantity: Number(stock['Verfügbarer_Bestand'])
        }
      })
    }
  ]
}
