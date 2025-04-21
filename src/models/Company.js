const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Company = sequelize.define('Company', {
  company_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  company_email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  company_phone_number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  img: {
    type: DataTypes.STRING,
    allowNull: true // Caminho da imagem
  },
  status: {
    type: DataTypes.ENUM('active', 'pending'),
    allowNull: false,
    defaultValue: 'active'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  type: {
    type: DataTypes.ENUM('private', 'public'),
    allowNull: false
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true
  },
  fb: {
    type: DataTypes.STRING,
    allowNull: true
  },
  insta: {
    type: DataTypes.STRING,
    allowNull: true
  },
  x: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'companies',
  timestamps: true
});

module.exports = Company;
