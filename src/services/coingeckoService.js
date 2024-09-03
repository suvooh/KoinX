// src/services/coingeckoService.js
const fetch = require('node-fetch');
const EthereumPrice = require('../models/EthereumPrice');

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr';

async function fetchEthereumPrice() {
  const response = await fetch(COINGECKO_API_URL);
  const data = await response.json();

  const price = data.ethereum.inr;
  await EthereumPrice.create({ price });

  return price;
}

module.exports = { fetchEthereumPrice };