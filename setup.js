require('dotenv').config();
const { sequelize } = require('../src/models');

async function setup() {
  try {
    await sequelize.sync({ force: true });
    console.log('Database schema created successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Database setup failed:', error.message);
    process.exit(1);
  }
}

setup();
