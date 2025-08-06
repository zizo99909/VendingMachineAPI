import express from 'express';
import { register, login, getUser, updateUser, deleteUser } from '../controllers/userController.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/:id', auth, getUser);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);

export default router;
