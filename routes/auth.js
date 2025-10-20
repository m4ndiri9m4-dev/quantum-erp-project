const express = require('express');
const router = express.Router();

// Placeholder auth routes - implement real auth (JWT/password hashing) later
router.post('/login', (req, res) => {
  res.status(501).json({ error: 'Auth not implemented' });
});

router.post('/register', (req, res) => {
  res.status(501).json({ error: 'Auth not implemented' });
});

module.exports = router;
