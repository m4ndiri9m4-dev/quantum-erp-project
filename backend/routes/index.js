const express = require('express');
const router = express.Router();

// Mount modular route files
router.use('/inventory', require('./inventory'));
router.use('/orders', require('./orders'));
router.use('/projects', require('./projects'));
router.use('/sales-reports', require('./salesReports'));
router.use('/time-logs', require('./timeClockLogs'));
router.use('/users', require('./users'));

module.exports = router;
