const express = require('express');
const router = express.Router();
const TimeClockLog = require('../models/TimeClockLog');

const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

router.get('/', asyncHandler(async (req, res) => {
  const logs = await TimeClockLog.findAll();
  res.json(logs);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const log = await TimeClockLog.findByPk(req.params.id);
  if (!log) return res.status(404).json({ error: 'TimeClockLog not found' });
  res.json(log);
}));

router.post('/', asyncHandler(async (req, res) => {
  const { userId, userName, action, timestamp, photo, location, address } = req.body;
  if (!userId || !action) return res.status(400).json({ error: 'userId and action are required' });
  const created = await TimeClockLog.create({ userId, userName, action, timestamp, photo, location, address });
  res.status(201).json(created);
}));

router.put('/:id', asyncHandler(async (req, res) => {
  const log = await TimeClockLog.findByPk(req.params.id);
  if (!log) return res.status(404).json({ error: 'TimeClockLog not found' });
  await log.update(req.body);
  res.json(log);
}));

router.delete('/:id', asyncHandler(async (req, res) => {
  const log = await TimeClockLog.findByPk(req.params.id);
  if (!log) return res.status(404).json({ error: 'TimeClockLog not found' });
  await log.destroy();
  res.json({ success: true });
}));

module.exports = router;
