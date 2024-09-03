// src/routes/api.js
const express = require('express');
const router = express.Router();
const { fetchTransactions } = require('../services/etherscanService');
const Transaction = require('../models/Transaction');
const EthereumPrice = require('../models/EthereumPrice');

router.get('/transactions/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const transactions = await fetchTransactions(address);
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/expenses/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const transactions = await Transaction.find({ address });
    
    const totalExpenses = transactions.reduce((sum, tx) => {
      return sum + (BigInt(tx.gasUsed) * BigInt(tx.gasPrice)) / BigInt(1e18);
    }, BigInt(0));

    const latestPrice = await EthereumPrice.findOne().sort({ timestamp: -1 });

    res.json({
      totalExpenses: totalExpenses.toString(),
      currentEthPrice: latestPrice ? latestPrice.price : null
    });
  } catch (error) {
    console.error('Error calculating expenses:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;