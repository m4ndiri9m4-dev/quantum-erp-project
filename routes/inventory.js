const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');

const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

router.get('/', asyncHandler(async (req, res) => {
  const items = await Inventory.findAll();
  res.json(items);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const item = await Inventory.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'Inventory item not found' });
  res.json(item);
}));

router.post('/', asyncHandler(async (req, res) => {
  const { name, category, stock, price, supplier } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  const created = await Inventory.create({ name, category, stock, price, supplier });
  res.status(201).json(created);
}));

router.put('/:id', asyncHandler(async (req, res) => {
  const item = await Inventory.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'Inventory item not found' });
  await item.update(req.body);
  res.json(item);
}));

router.delete('/:id', asyncHandler(async (req, res) => {
  const item = await Inventory.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'Inventory item not found' });
  await item.destroy();
  res.json({ success: true });
}));

module.exports = router;
