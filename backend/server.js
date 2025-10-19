const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const { sequelize, connectDB } = require('./config/db.js');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Init Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Allow large JSON for selfie images

// --- SERVE FRONTEND (for Monorepo) ---
app.use(express.static(path.join(__dirname, '../public')));

// Define API Routes
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/users', require('./routes/users.js'));
app.use('/api/inventory', require('./routes/inventory.js'));
app.use('/api/orders', require('./routes/orders.js'));
app.use('/api/projects', require('./routes/projects.js'));
app.use('/api/time-clock-logs', require('./routes/timeClockLogs.js'));
app.use('/api/sales-reports', require('./routes/salesReports.js'));

// --- CATCH-ALL ROUTE (for Monorepo) ---
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 5000;

// Sync database and start the server
sequelize.sync().then(() => {
  console.log('Database tables created successfully.');
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}).catch(err => {
    console.error('Failed to sync database tables:', err);
    process.exit(1);
});

