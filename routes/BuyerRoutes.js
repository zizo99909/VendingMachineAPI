import express from 'express';
import { deposit, resetDeposit, buyProduct } from '../controllers/buyerController.js';
import { auth, authorizeRole } from '../middlewares/auth.js';

const router = express.Router();

router.post('/deposit', auth, authorizeRole('buyer'), deposit);
router.post('/buy', auth, authorizeRole('buyer'), buyProduct);
router.post('/reset', auth, authorizeRole('buyer'), resetDeposit);

export default router;
