// src/utils/scheduler.js
const schedule = require('node-schedule');
const { fetchEthereumPrice } = require('../services/coingeckoService');

function startPriceScheduler() {
  schedule.scheduleJob('*/10 * * * *', async function() {
    try {
      await fetchEthereumPrice();
      console.log('Ethereum price updated');
    } catch (error) {
      console.error('Failed to update Ethereum price:', error);
    }
  });
}

module.exports = { startPriceScheduler };