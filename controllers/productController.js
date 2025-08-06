import Product from '../models/Product.js';

export async function createProduct(req, res) {
  try {
    const { productName, cost, amountAvailable } = req.body;
    if (cost % 5 !== 0) return res.status(400).json({ error: 'Cost must be divisible by 5' });
    const product = await Product.create({ productName, cost, amountAvailable, sellerId: req.user.id });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getProducts(req, res) {
  const products = await Product.find();
  res.json(products);
}

export async function updateProduct(req, res) {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, sellerId: req.user.id },
      req.body,
      { new: true }
    );
    if (!product) return res.sendStatus(404);
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteProduct(req, res) {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id, sellerId: req.user.id });
    if (!product) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}