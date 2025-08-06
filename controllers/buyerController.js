import User from '../models/User.js';
import Product from '../models/Product.js';
import { getChange } from '../utils/GetChange.js';

const VALID_COINS = [5, 10, 20, 50, 100];

export async function deposit(req, res) {
  const { amount } = req.body;
  if (!VALID_COINS.includes(amount)) return res.status(400).json({ error: 'Invalid coin' });
  try {
    const user = await User.findById(req.user.id);
    user.deposit += amount;
    await user.save();
    res.json({ deposit: user.deposit });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function resetDeposit(req, res) {
  try {
    const user = await User.findById(req.user.id);
    const change = getChange(user.deposit);
    user.deposit = 0;
    await user.save();
    res.json({ change });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function buyProduct(req, res) {
  const { productId, quantity } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const product = await Product.findById(productId);

    if (!product || product.amountAvailable < quantity)
      return res.status(400).json({ error: 'Product unavailable' });

    const totalCost = quantity * product.cost;
    if (user.deposit < totalCost)
      return res.status(400).json({ error: 'Insufficient funds' });

    user.deposit -= totalCost;
    product.amountAvailable -= quantity;

    await user.save();
    await product.save();

    const change = getChange(user.deposit);
    user.deposit = 0;
    await user.save();

    res.json({
      totalSpent: totalCost,
      product: product.productName,
      quantity,
      change
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
