const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Service = sequelize.define('Service', {
  service_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  service_img: {
    type: DataTypes.STRING,
  },
  company_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'pending'),
    defaultValue: 'active',
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.STRING,
  },
  tempo_processamento: {
    type: DataTypes.STRING,
  },
  pdf: {
    type: DataTypes.STRING,
  },
  open_closed: {
    type: DataTypes.STRING,
  },
  search_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  timestamps: true,
  tableName: 'services',
});

module.exports = Service;
