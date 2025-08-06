import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productName: String,
  cost: { type: Number, required: true }, // in cents, divisible by 5
  amountAvailable: { type: Number, default: 0 },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model('Product', productSchema);
