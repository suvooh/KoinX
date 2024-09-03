// src/services/etherscanService.js
const fetch = require('node-fetch');
const Transaction = require('../models/Transaction');

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const ETHERSCAN_API_URL = 'https://api.etherscan.io/api';

async function fetchTransactions(address) {
  const url = `${ETHERSCAN_API_URL}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${ETHERSCAN_API_KEY}`;
  
  const response = await fetch(url);
  const data = await response.json();

  if (data.status === '1') {
    const transactions = data.result;
    await Transaction.insertMany(transactions, { ordered: false });
    return transactions;
  } else {
    throw new Error('Failed to fetch transactions');
  }
}

module.exports = { fetchTransactions };