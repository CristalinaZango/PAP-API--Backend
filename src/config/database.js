require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') }); 
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: true, 
  }
);

/*
const sequelize = new Sequelize(
  'pap_deuma', // DB_NAME
  'postgres',  // DB_USER
  '1234567890',  // DB_PASSWORD
  {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: console.log,
  }
);
*/

module.exports = sequelize;
