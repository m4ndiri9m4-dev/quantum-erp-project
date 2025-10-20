const { Sequelize } = require('sequelize');

let sequelize;

// If MySQL env vars are present, use MySQL; otherwise fallback to SQLite for local dev
if (process.env.DB_NAME && process.env.DB_USER) {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'mysql',
      port: process.env.DB_PORT || 3306
    }
  );
} else {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.SQLITE_FILE || 'database.sqlite',
    logging: false
  });
}

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
