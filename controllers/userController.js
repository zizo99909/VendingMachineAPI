import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function register(req, res) {
  const { username, password, role } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hash, role });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getUser(req, res) {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.sendStatus(404);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateUser(req, res) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteUser(req, res) {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}