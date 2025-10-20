const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

router.get('/', asyncHandler(async (req, res) => {
  const orders = await Order.findAll();
  res.json(orders);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const order = await Order.findByPk(req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
}));

router.post('/', asyncHandler(async (req, res) => {
  const { customer, items, total, date, status } = req.body;
  if (!customer || !items || typeof total === 'undefined') return res.status(400).json({ error: 'Missing required fields' });
  const created = await Order.create({ customer, items, total, date, status });
  res.status(201).json(created);
}));

router.put('/:id', asyncHandler(async (req, res) => {
  const order = await Order.findByPk(req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  await order.update(req.body);
  res.json(order);
}));

router.delete('/:id', asyncHandler(async (req, res) => {
  const order = await Order.findByPk(req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  await order.destroy();
  res.json({ success: true });
}));

module.exports = router;
