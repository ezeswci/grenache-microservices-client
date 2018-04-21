const ws = require('ws')
const w = new ws('wss://api.bitfinex.com/ws/2')

let BookConstructor = function () {
  this.price = null
  w.on('message', (msg) => this.setPrice(msg))
  let msg = JSON.stringify({
    event: 'subscribe',
    channel: 'book',
    symbol: 'tBTCUSD'
  })
  w.on('open', () => w.send(msg))
  this.getActualPrice = function () {
    return this.price
  }
  this.gain = function (priceBought) {
    return (priceBought / this.price * 100 - 100).toFixed(2)
  }
  this.setPrice = function (msg) {
    let obj = JSON.parse(msg)
    if (typeof obj[1] === 'object') if (typeof obj[1][0] === 'number') this.price = obj[1][0]
  }
}

module.exports = new BookConstructor ()
