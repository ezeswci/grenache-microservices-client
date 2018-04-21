'use strict'
const { PeerRPCClient } = require('grenache-nodejs-ws')
const Link = require('grenache-nodejs-link')
const book = require('./book')
const express = require('express')

const link = new Link({
  grape: 'http://127.0.0.1:30001',
  requestTimeout: 10000
})
link.start()
const peer = new PeerRPCClient(link, {})
peer.init()

function buy (res) {
  if (book.getActualPrice() == null) {
    return (JSON.stringify({'error': 'Not ready try again'}))
  } else {
    const payload = {'action': 'store', 'data': book.getActualPrice()}
    peer.request('crypto_worker', payload, { timeout: 100000 }, (err, result) => {
      if (err || result.hasOwnProperty('error')) (err) ? res.send(JSON.stringify({'error': err})) : res.send(JSON.stringify({'error': result.error}))
      else res.send(JSON.stringify({'buy': result.price, 'hash': result.hash}))
    })
  }
}
function check (hash, res) {
  const payload = {'action': 'check', 'data': hash}
  peer.request('crypto_worker', payload, { timeout: 100000 }, (err, result) => {
    if (err || result.hasOwnProperty('error')) (err) ? res.send(JSON.stringify({'error': err})) : res.send(JSON.stringify({'error': result.error}))
    else res.send(JSON.stringify({'actual': book.getActualPrice(), 'buy': result.price, 'gain': book.gain(result.price), 'hash': result.hash}))
  })
}

let app = express()
app.get('/', function (req, res) {
  buy(res)
}).get('/check/:hash', function (req, res) {
  check(req.params.hash, res)
})
app.listen(3000, function () {
  console.log('Listening on port 3000!')
})
