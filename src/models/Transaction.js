// src/models/Transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  address: { type: String, required: true, index: true },
  hash: { type: String, required: true, unique: true },
  blockNumber: Number,
  timeStamp: Number,
  from: String,
  to: String,
  value: String,
  gas: Number,
  gasPrice: String,
  gasUsed: Number
});

module.exports = mongoose.model('Transaction', transactionSchema);

