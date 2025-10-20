const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

router.get('/', asyncHandler(async (req, res) => {
  const projects = await Project.findAll();
  res.json(projects);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const project = await Project.findByPk(req.params.id);
  if (!project) return res.status(404).json({ error: 'Project not found' });
  res.json(project);
}));

router.post('/', asyncHandler(async (req, res) => {
  const { name, description, startDate, endDate, status, tasks, assignedEmployees } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  const created = await Project.create({ name, description, startDate, endDate, status, tasks, assignedEmployees });
  res.status(201).json(created);
}));

router.put('/:id', asyncHandler(async (req, res) => {
  const project = await Project.findByPk(req.params.id);
  if (!project) return res.status(404).json({ error: 'Project not found' });
  await project.update(req.body);
  res.json(project);
}));

router.delete('/:id', asyncHandler(async (req, res) => {
  const project = await Project.findByPk(req.params.id);
  if (!project) return res.status(404).json({ error: 'Project not found' });
  await project.destroy();
  res.json({ success: true });
}));

module.exports = router;
