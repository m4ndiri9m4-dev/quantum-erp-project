const express = require('express');
const router = express.Router();
const User = require('../models/User');

const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

router.get('/', asyncHandler(async (req, res) => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  res.json(users);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] } });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
}));

router.post('/', asyncHandler(async (req, res) => {
  const { name, email, password, role, status, ratePerDay } = req.body;
  if (!name || !email || !password || !role) return res.status(400).json({ error: 'Missing required fields' });
  const created = await User.create({ name, email, password, role, status, ratePerDay });
  const safe = created.toJSON(); delete safe.password;
  res.status(201).json(safe);
}));

router.put('/:id', asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  await user.update(req.body);
  const safe = user.toJSON(); delete safe.password;
  res.json(safe);
}));

router.delete('/:id', asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  await user.destroy();
  res.json({ success: true });
}));

module.exports = router;
