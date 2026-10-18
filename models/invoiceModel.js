const { string } = require('joi');
const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: Number, unique: true },
  name: String,
  address: String,
  phone: String,
  card: String,
  cvv: String,
  items: Array,
  total: Number,
  tax: Number,
  discount: Number,
  date: String,
  uniqueId: Number

});

module.exports = mongoose.model('Invoice', invoiceSchema);