const express = require('express');
const router = express.Router();
const SalesReport = require('../models/SalesReport');

const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

router.get('/', asyncHandler(async (req, res) => {
  const reports = await SalesReport.findAll();
  res.json(reports);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const report = await SalesReport.findByPk(req.params.id);
  if (!report) return res.status(404).json({ error: 'SalesReport not found' });
  res.json(report);
}));

router.post('/', asyncHandler(async (req, res) => {
  const { userId, date, itemName, beginning, remaining, sold } = req.body;
  if (!userId || !date) return res.status(400).json({ error: 'userId and date are required' });
  const created = await SalesReport.create({ userId, date, itemName, beginning, remaining, sold });
  res.status(201).json(created);
}));

router.put('/:id', asyncHandler(async (req, res) => {
  const report = await SalesReport.findByPk(req.params.id);
  if (!report) return res.status(404).json({ error: 'SalesReport not found' });
  await report.update(req.body);
  res.json(report);
}));

router.delete('/:id', asyncHandler(async (req, res) => {
  const report = await SalesReport.findByPk(req.params.id);
  if (!report) return res.status(404).json({ error: 'SalesReport not found' });
  await report.destroy();
  res.json({ success: true });
}));

module.exports = router;
