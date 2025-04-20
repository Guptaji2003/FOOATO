const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  user: {
    name: { type: String, required: true },
    email: { type: String, required: true }
  },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
      product: {
        name: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true }
      },
      quantity: { type: Number, required: true, default: 1 }
    },
  ],
  address: { type: String, required: true },
  total: { type: Number, required: true },
  status: { type: String, default: 'pending' }
});

module.exports = mongoose.model('Order', orderSchema);

