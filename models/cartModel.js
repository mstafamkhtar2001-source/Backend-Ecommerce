const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      id: { type: String, required: true }, // بدل productId
      name: { type: String, required: true }, // بدل title
      price: { type: Number, required: true },
      Qty: { type: Number, required: true, default: 1 }, // بدل quantity
      image: { type: String }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);