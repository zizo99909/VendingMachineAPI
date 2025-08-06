
import Product from '../models/Product.js';


export async function checkOwnership(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if the logged-in seller is the owner of the product
    if (product.sellerId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Access denied: You do not own this product' });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
