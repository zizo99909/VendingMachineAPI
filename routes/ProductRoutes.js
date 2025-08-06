import express from 'express';
import {
  createProduct, getProducts, updateProduct, deleteProduct
} from '../controllers/productController.js';
import { auth, authorizeRole } from '../middlewares/auth.js';
import { checkOwnership } from '../middlewares/ownership.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', auth, authorizeRole('seller'), createProduct);
router.put('/:id', auth, authorizeRole('seller'), checkOwnership, updateProduct);
router.delete('/:id', auth, authorizeRole('seller'), checkOwnership, deleteProduct);

export default router;
